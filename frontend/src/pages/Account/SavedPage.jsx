import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AccountLayout } from '../../components/account/AccountLayout'
import { EventCard } from '../../components/landing/EventCard'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'

import useSaved from '../../hooks/useSaved'
import useLanguage, { translate } from '../../hooks/useLanguage'
import { allEvents } from '../../data'
import { isPastDate } from '../../utils/datetime'

export default function SavedPage({ theme, toggle }) {
  const { saved, clearSaved } = useSaved()
  const { lang, t } = useLanguage()

  useEffect(() => {
    document.title = `${translate(lang, 'account.saved')} — BillEvents`
  }, [lang])

  // Saved order is newest-first; within that, upcoming events come first.
  // An id with no matching event is dropped — it was removed from the catalogue.
  const events = saved.map((id) => allEvents.find((e) => String(e.id) === id)).filter(Boolean)

  const upcoming = events.filter((e) => !isPastDate(e.start))
  const past = events.filter((e) => isPastDate(e.start))

  const layout = { theme, toggle, title: t('account.saved'), lead: t('saved.lead') }

  if (events.length === 0) {
    return (
      <AccountLayout {...layout}>
        <div className="rounded-3xl bg-white p-10 text-center dark:bg-navy-2">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-mortar dark:bg-navy dark:text-white/60">
            <Icon n="heart" className="h-7 w-7" />
          </span>
          <h2 className="mt-5 font-heading text-xl font-bold">{t('saved.emptyTitle')}</h2>
          <p className="mx-auto mt-2 max-w-sm text-mortar dark:text-white/65">{t('saved.emptyText')}</p>
          <Btn as={Link} to="/events" variant="dark" className="mt-6">
            {t('mt.find')} <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
          </Btn>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout {...layout}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold" aria-live="polite">
          {t(events.length === 1 ? 'saved.count.one' : 'saved.count.other', { count: events.length })}
        </p>
        <button
          type="button"
          onClick={clearSaved}
          className="text-sm font-bold text-mortar transition hover:text-red-600 hover:underline dark:text-white/60 dark:hover:text-red-400"
        >
          {t('saved.removeAll')}
        </button>
      </div>

      {upcoming.length > 0 && (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {upcoming.map((e, i) => (
            <EventCard key={e.id} e={e} i={i} />
          ))}
        </div>
      )}

      {past.length > 0 && (
        <section className="mt-10" aria-labelledby="past-saved-h">
          <h2 id="past-saved-h" className="font-heading text-lg font-bold">
            {t('saved.pastTitle')}
          </h2>
          <p className="mt-1 text-sm text-mortar dark:text-white/60">{t('saved.pastText')}</p>
          <div className="mt-5 grid gap-6 opacity-70 sm:grid-cols-2 xl:grid-cols-3">
            {past.map((e, i) => (
              <EventCard key={e.id} e={e} i={i} />
            ))}
          </div>
        </section>
      )}

      <p className="mt-8 flex items-start gap-2 text-xs text-mortar dark:text-white/55">
        <Icon n="info" className="h-4 w-4 shrink-0" />
        {t('saved.preview')}
      </p>
    </AccountLayout>
  )
}