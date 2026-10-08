import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { SkipLink } from '../../components/common/SkipLink'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { Reveal } from '../../components/common/Reveal'
import { EventCard } from '../../components/landing/EventCard'
import { TicketSelector } from '../../components/event/TicketSelector'
import { allEvents } from '../../data'

export default function EventDetailPage({ theme, toggle }) {
  const { id } = useParams()
  const event = allEvents.find((e) => String(e.id) === id)
  const [fav, setFav] = useState(false)
  useEffect(() => { document.title = event ? `${event.title} — BillEvents` : 'Event not found — BillEvents' }, [event])

  if (!event) {
    return (
      <>
        <SkipLink /><Navbar theme={theme} toggle={toggle} />
        <main id="main" className="wrap grid min-h-[50vh] place-items-center py-20 text-center">
          <div>
            <h1 className="font-heading text-3xl font-bold">Event not found</h1>
            <p className="mt-2 text-mortar dark:text-white/70">That event doesn’t exist or is no longer available.</p>
            <Btn as={Link} to="/events" variant="dark" className="mt-6">Browse all events</Btn>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const [day, time] = event.date.split(' · ')
  const others = allEvents.filter((e) => e.id !== event.id)
  const related = [...others.filter((e) => e.category === event.category), ...others.filter((e) => e.category !== event.category)].slice(0, 4)
  const info = [['calendar', 'Date', day], ['clock', 'Time', time], ['pin', 'Venue', `${event.venue}, ${event.city}`]]

  return (
    <>
      <SkipLink />
      <Navbar theme={theme} toggle={toggle} />
      <main id="main">
        <section className={`relative isolate overflow-hidden bg-linear-to-br ${event.grad} text-white`}>
          <Icon n={event.icon} className="absolute -bottom-10 -right-6 -z-10 h-72 w-72 text-white/15 sm:h-96 sm:w-96" />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy/80 via-navy/20 to-transparent" />
          <div className="wrap flex min-h-[18rem] flex-col justify-between py-6 sm:min-h-[22rem]">
            <div className="flex items-center justify-between">
              <Link to="/events" className="inline-flex items-center gap-1.5 text-sm font-bold hover:text-aqua"><Icon n="arrow" className="h-4 w-4 rotate-180" />All events</Link>
              <button onClick={() => setFav(!fav)} aria-pressed={fav} aria-label={`Save ${event.title}`} className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy transition hover:scale-110 active:scale-90">
                <Icon n="heart" className={`h-5 w-5 transition ${fav ? 'scale-110 fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
            <div className="animate-up pb-4">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-navy">{event.cat}</span>
              <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl">{event.title}</h1>
            </div>
          </div>
        </section>

        <div className="wrap grid gap-10 py-10 lg:grid-cols-[1fr_24rem] lg:items-start">
          <div className="grid gap-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {info.map(([ic, label, value]) => (
                <div key={label} className="flex items-start gap-3 rounded-2xl bg-mist p-4 dark:bg-navy-2">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-teal dark:bg-navy dark:text-aqua"><Icon n={ic} /></span>
                  <div className="min-w-0"><p className="text-xs text-mortar dark:text-white/60">{label}</p><p className="font-heading font-bold leading-snug">{value}</p></div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold">About this event</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-mortar dark:text-white/75">{event.description}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold">Good to know</h2>
              <ul className="mt-4 grid gap-3 text-mortar dark:text-white/75">
                {['Your digital ticket appears in My Tickets right after payment.', 'Payments are processed securely through BillPay.', 'Show your ticket on your phone at the entrance.'].map((t) => (
                  <li key={t} className="flex items-start gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-aqua text-navy"><Icon n="check" className="h-3.5 w-3.5" /></span>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24" aria-label="Tickets">
            <TicketSelector event={event} />
          </aside>
        </div>

        <section className="bg-mist py-16 dark:bg-navy-3" aria-label="More events">
          <div className="wrap">
            <Reveal><h2 className="mb-8 font-heading text-3xl font-bold">You might also like</h2></Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((e, i) => <EventCard key={e.id} e={e} i={i} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}