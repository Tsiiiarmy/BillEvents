import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { SkipLink } from '../../components/common/SkipLink'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { Reveal } from '../../components/common/Reveal'
import { SaveButton } from '../../components/common/SaveButton'
import { EventCard } from '../../components/landing/EventCard'
import { TicketSelector } from '../../components/event/TicketSelector'
import { allEvents } from '../../data'
import useLanguage, { translate } from '../../hooks/useLanguage'

const GOOD_TO_KNOW = ['event.good1', 'event.good2', 'event.good3']

export default function EventDetailPage({ theme, toggle }) {
  const { id } = useParams()
  const { lang, t, tCategory } = useLanguage()
  const event = allEvents.find((e) => String(e.id) === id)

  useEffect(() => {
    document.title = event
      ? `${event.title} — BillEvents`
      : `${translate(lang, 'event.notFound')} — BillEvents`
  }, [event, lang])

  if (!event) {
    return (
      <>
        <SkipLink />
        <Navbar theme={theme} toggle={toggle} />
        <main id="main" className="wrap grid min-h-[50vh] place-items-center py-20 text-center">
          <div>
            <h1 className="font-heading text-3xl font-bold">{t('event.notFound')}</h1>
            <p className="mt-2 text-mortar dark:text-white/70">{t('event.notFoundText')}</p>
            <Btn as={Link} to="/events" variant="dark" className="mt-6">
              {t('event.browseAll')}
            </Btn>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const [day, time] = event.date.split(' · ')
  const others = allEvents.filter((e) => e.id !== event.id)
  const related = [
    ...others.filter((e) => e.category === event.category),
    ...others.filter((e) => e.category !== event.category),
  ].slice(0, 4)

  const info = [
    ['calendar', 'event.date', day],
    ['clock', 'event.time', time],
    ['pin', 'event.venue', `${event.venue}, ${event.city}`],
  ]

  return (
    <>
      <SkipLink />
      <Navbar theme={theme} toggle={toggle} />
      <main id="main">
        <section className={`relative isolate overflow-hidden bg-linear-to-br ${event.grad} text-white`}>
          {event.image && (
            <img src={event.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy/90 via-navy/45 to-navy/20" />
          {!event.image && (
            <Icon
              n={event.icon}
              className="absolute -bottom-10 -right-6 -z-10 h-72 w-72 text-white/15 sm:h-96 sm:w-96"
            />
          )}
          <div className="wrap flex min-h-[18rem] flex-col justify-between py-6 sm:min-h-[22rem]">
            <div className="flex items-center justify-between">
              <Link to="/events" className="inline-flex items-center gap-1.5 text-sm font-bold hover:text-aqua">
                <Icon n="arrow" className="h-4 w-4 rotate-180" />
                {t('event.back')}
              </Link>
              <SaveButton event={event} />
            </div>
            <div className="animate-up pb-4">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-navy">
                {tCategory(event.cat)}
              </span>
              <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl">
                {event.title}
              </h1>
            </div>
          </div>
        </section>

        <div className="wrap grid gap-10 py-10 lg:grid-cols-[1fr_24rem] lg:items-start">
          <div className="grid gap-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {info.map(([ic, key, value]) => (
                <div key={key} className="flex items-start gap-3 rounded-2xl bg-mist p-4 dark:bg-navy-2">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-teal dark:bg-navy dark:text-aqua">
                    <Icon n={ic} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-mortar dark:text-white/60">{t(key)}</p>
                    <p className="font-heading font-bold leading-snug">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold">{t('event.about')}</h2>
              {/* The organizer's description — not translated */}
              <p className="mt-3 max-w-2xl leading-relaxed text-mortar dark:text-white/75">{event.description}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold">{t('event.goodToKnow')}</h2>
              <ul className="mt-4 grid gap-3 text-mortar dark:text-white/75">
                {GOOD_TO_KNOW.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-aqua text-navy">
                      <Icon n="check" className="h-3.5 w-3.5" />
                    </span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24" aria-label={t('event.tickets')}>
            <TicketSelector event={event} />
          </aside>
        </div>

        <section className="bg-mist py-16 dark:bg-navy-3" aria-label={t('event.more')}>
          <div className="wrap">
            <Reveal>
              <h2 className="mb-8 font-heading text-3xl font-bold">{t('event.related')}</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((e, i) => (
                <EventCard key={e.id} e={e} i={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}