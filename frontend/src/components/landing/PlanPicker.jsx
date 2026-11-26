import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../common/Icon'
import { Btn } from '../common/Btn'
import { EventCard } from './EventCard'
import { allEvents } from '../../data'
import { PLANS } from '../../data/plans'
import { pickForPlan } from '../../utils/plans'
import useLanguage from '../../hooks/useLanguage'
import { prefersReducedMotion } from '../../utils/motion'

/* ───────────── WHAT'S THE PLAN? ─────────────*/
export function PlanPicker() {
  const { t, lang } = useLanguage()
  const [active, setActive] = useState(PLANS[0].id)
  const [spins, setSpins] = useState(0)
  const trackRef = useRef(null)
  const pillRef = useRef(null)
  const touched = useRef(false)

  const plan = PLANS.find((p) => p.id === active) ?? PLANS[0]
  const picks = useMemo(() => pickForPlan(plan, allEvents), [plan])
  const txt = (part) => t(`plan.${plan.id}.${part}`, null, plan[part])

  // Slide the pill under the active chip. Writes CSS variables straight
  // onto the pill, so no extra re-render is needed.
  useLayoutEffect(() => {
    const place = () => {
      const btn = trackRef.current?.querySelector('[aria-pressed="true"]')
      const pill = pillRef.current
      if (!btn || !pill) return
      pill.style.setProperty('--x', `${btn.offsetLeft}px`)
      pill.style.setProperty('--w', `${btn.offsetWidth}px`)
      pill.style.opacity = '1'
    }

    place()
    // Only after a click, never on page load (that would jump the page).
    if (touched.current) {
      trackRef.current
        ?.querySelector('[aria-pressed="true"]')
        ?.scrollIntoView({
          block: 'nearest',
          inline: 'center',
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        })
    }
    // Chip widths change once the web fonts finish loading.
    document.fonts?.ready.then(place)
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active, lang])

  const choose = (id) => {
    touched.current = true
    setActive(id)
  }

  const surprise = () => {
    const others = PLANS.filter((p) => p.id !== active)
    choose(others[Math.floor(Math.random() * others.length)].id)
    setSpins((n) => n + 1)
  }

  return (
    <section
      id="plan"
      aria-labelledby="plan-title"
      className="relative overflow-hidden bg-mist py-20 dark:bg-navy-3"
    >
      {/* Ambient light + the big faint mood icon */}
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-navy/10 blur-3xl dark:bg-aqua/10"
      />
      <div
        key={`icon-${plan.id}`}
        aria-hidden="true"
        className="plan-icon pointer-events-none absolute right-8 top-12 hidden text-navy/[0.06] lg:block dark:text-white/[0.06]"
      >
        <Icon n={plan.icon} className="h-72 w-72" />
      </div>

      <div className="wrap relative">
        <p className="text-xs font-bold tracking-[0.2em] text-teal dark:text-aqua">
          {t('plan.eyebrow', null, 'WHAT’S THE PLAN?')}
        </p>

        <h2 id="plan-title" className="mt-2 max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
          {t('plan.title', null, 'I’m in the mood for')}{' '}
          <span className="relative inline-block whitespace-nowrap">
            <span key={plan.id} className="plan-word inline-block text-teal dark:text-aqua">
              {txt('phrase')}
            </span>
            <span
              key={`u-${plan.id}`}
              aria-hidden="true"
              className="plan-underline absolute -bottom-1 left-0 h-1 w-full rounded-full bg-navy/80 dark:bg-white/70"
            />
          </span>
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div
            ref={trackRef}
            role="group"
            aria-label={t('plan.moods', null, 'Pick a mood')}
            className="no-scrollbar relative flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-lg shadow-navy/10 ring-1 ring-navy/5 dark:bg-navy-2 dark:shadow-none dark:ring-white/10"
          >
            <span
              ref={pillRef}
              aria-hidden="true"
              className="plan-pill absolute inset-y-1.5 left-0 rounded-full bg-navy shadow-md shadow-navy/30 dark:bg-white"
            />
            {PLANS.map((p) => {
              const on = p.id === plan.id
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(p.id)}
                  className={`relative z-10 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition-colors duration-300 ${
                    on
                      ? 'text-white dark:text-navy'
                      : 'text-navy/70 hover:text-navy dark:text-white/70 dark:hover:text-white'
                  }`}
                >
                  <Icon n={p.icon} className={`h-4 w-4 transition-transform duration-300 ${on ? 'scale-110' : ''}`} />
                  {t(`plan.${p.id}.chip`, null, p.chip)}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={surprise}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-navy ring-1 ring-navy/20 transition hover:bg-navy hover:text-white dark:text-white dark:ring-white/25 dark:hover:bg-white dark:hover:text-navy"
          >
            <Icon key={spins} n="refresh" className={`h-4 w-4 ${spins ? 'spin-once' : ''}`} />
            {t('plan.surprise', null, 'Surprise me')}
          </button>
        </div>

        <p key={`hint-${plan.id}`} className="plan-fade mt-5 flex items-center gap-2 text-mortar dark:text-white/70">
          <Icon n={plan.icon} className="h-4 w-4 shrink-0 text-teal dark:text-aqua" />
          {txt('hint')}
        </p>

        {/* Screen readers hear what changed */}
        <p className="sr-only" aria-live="polite">
          {txt('phrase')}: {picks.length}
        </p>

        {picks.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((e, i) => (
              <EventCard key={`${plan.id}-${e.id}`} e={e} i={i} />
            ))}
          </div>
        ) : (
          <div className="plan-fade mt-10 rounded-2xl border border-dashed border-navy/20 bg-white/60 p-10 text-center dark:border-white/15 dark:bg-white/5">
            <Icon n="calendar" className="mx-auto h-8 w-8 text-mortar dark:text-white/50" />
            <p className="mt-3 font-heading font-bold">
              {t('plan.empty', null, 'Nothing for this mood right now.')}
            </p>
            <p className="mt-1 text-sm text-mortar dark:text-white/60">
              {t('plan.emptyText', null, 'New events are added all the time. Check back soon.')}
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Btn as={Link} to="/events" className="bg-navy text-white dark:bg-white dark:text-navy">
            {t('plan.browse', null, 'Browse all events')} <Icon n="arrow" className="h-4 w-4" />
          </Btn>
        </div>
      </div>
    </section>
  )
}