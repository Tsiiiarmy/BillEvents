import { useEffect } from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { SkipLink } from '../../components/common/SkipLink'
import { FilterBar } from '../../components/discover/FilterBar'
import { EventGrid } from '../../components/discover/EventGrid'
import useEventFilters from '../../hooks/useEventFilters'
import useLanguage, { translate } from '../../hooks/useLanguage'

export default function DiscoverPage({ theme, toggle }) {
  const { filters, setFilter, clear, hasFilters, results } = useEventFilters()
  const { lang, t, tCategory } = useLanguage()

  useEffect(() => {
    document.title = `${translate(lang, 'discover.docTitle')} — BillEvents`
  }, [lang])

  // The accent word sits in a different place in each language.
  const [before, after = ''] = t('discover.title').split('{accent}')
  const count = t(results.length === 1 ? 'discover.count.one' : 'discover.count.other', {
    count: results.length,
  })

  return (
    <>
      <SkipLink />
      <Navbar theme={theme} toggle={toggle} />
      <main id="main">
        <section className="relative isolate overflow-hidden bg-navy pb-24 pt-14 text-white sm:pt-20 dark:bg-navy-3">
          <div className="animate-drift absolute -left-24 -top-10 -z-10 h-80 w-80 rounded-full bg-aqua/25 blur-3xl" />
          <div className="wrap">
            <p className="animate-up text-xs font-bold tracking-[0.25em] text-aqua">{t('discover.eyebrow')}</p>
            <h1
              className="animate-up mt-4 max-w-2xl font-heading text-4xl font-bold leading-tight sm:text-6xl"
              style={{ animationDelay: '.1s' }}
            >
              {before}
              <span className="text-aqua">{t('discover.titleAccent')}</span>
              {after}
            </h1>
            <p className="animate-up mt-4 max-w-xl text-lg text-white/80" style={{ animationDelay: '.2s' }}>
              {t('discover.lead')}
            </p>
          </div>
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-14 w-full sm:h-20"
            aria-hidden="true"
          >
            <path className="animate-wave fill-aqua/45" d="M0 50C240 110 480 0 720 45S1200 100 1440 30V120H0Z" />
            <path className="fill-white dark:fill-navy" d="M0 85C260 125 520 45 760 80S1220 115 1440 75V120H0Z" />
          </svg>
        </section>

        <div className="wrap">
          <FilterBar filters={filters} setFilter={setFilter} />
        </div>

        <section className="wrap py-10" aria-label={t('discover.results')}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p aria-live="polite" className="font-heading text-xl font-bold">
              {count}
              {filters.category !== 'All' && (
                <span className="font-normal text-mortar dark:text-white/60">
                  {' '}
                  {t('discover.in', { category: tCategory(filters.category) })}
                </span>
              )}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clear}
                className="text-sm font-bold text-teal hover:underline dark:text-aqua"
              >
                {t('discover.clearAll')}
              </button>
            )}
          </div>
          <EventGrid events={results} onClear={clear} />
        </section>
      </main>
      <Footer />
    </>
  )
}