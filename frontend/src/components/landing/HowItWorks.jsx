import { useRef } from 'react'
import { Icon } from '../common/Icon'
import { Heading } from '../common/Heading'
import { steps } from '../../data'
import useLanguage from '../../hooks/useLanguage'
import useScrollProgress from '../../hooks/useScrollProgress'

const clamp01 = (n) => Math.min(1, Math.max(0, n))

/* ───────────── HOW IT WORKS ───────────── */

export function HowItWorks() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const p = useScrollProgress(ref)
  const last = steps.length - 1

  return (
    <section id="how" className="py-20">
      <div className="wrap">
        <Heading eyebrow={t('how.eyebrow')} title={t('how.title')} />

        <ol ref={ref} className="grid gap-10 lg:grid-cols-4">
          {steps.map((s, i) => {
            const on = p > 0.02 && p >= i / last - 0.02
            // How much of the segment from this step to the next is filled.
            const fill = clamp01((p - i / last) * last)

            return (
              <li
                key={s.n}
                className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:text-center"
              >
                {i < last && (
                  <span
                    aria-hidden="true"
                    style={{ '--f': fill }}
                    className="absolute left-10 top-10 h-[calc(100%+2.5rem)] w-0.5 lg:left-1/2 lg:h-0.5 lg:w-[calc(100%+2.5rem)]"
                  >
                    <span className="absolute inset-0 border-l-2 border-dashed border-navy/20 lg:border-l-0 lg:border-t-2 dark:border-white/20" />
                    <span className="how-fill absolute inset-0 bg-navy dark:bg-white" />
                    {fill > 0 && fill < 1 && (
                      <span className="how-dot absolute h-3 w-3 rounded-full bg-navy ring-4 ring-navy/15 dark:bg-white dark:ring-white/20" />
                    )}
                  </span>
                )}

                <div
                  className={`relative z-10 grid h-20 w-20 shrink-0 place-items-center rounded-full shadow-xl transition-all duration-500 ${
                    on
                      ? 'bg-navy text-white shadow-navy/30 ring-4 ring-navy/10 dark:bg-white dark:text-navy dark:ring-white/15'
                      : 'bg-white text-mortar/60 shadow-navy/10 ring-1 ring-navy/10 dark:bg-navy-2 dark:text-white/40 dark:ring-white/10'
                  }`}
                >
                  <Icon n={s.icon} className={`h-8 w-8 ${on ? 'animate-pop' : ''}`} />
                  <span
                    className={`absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold transition-colors duration-500 ${
                      on
                        ? 'bg-white text-navy ring-2 ring-navy dark:bg-navy dark:text-white dark:ring-white'
                        : 'bg-mist text-navy/60 ring-1 ring-navy/10 dark:bg-white/10 dark:text-white/60 dark:ring-white/10'
                    }`}
                  >
                    {s.n}
                  </span>
                </div>

                <div className={`pt-4 transition-opacity duration-500 lg:pt-0 ${on ? 'opacity-100' : 'opacity-60'}`}>
                  {/* Falls back to the English text in data/ until a translation exists */}
                  <h3 className="font-heading text-lg font-bold lg:mt-5">
                    {t(`how.step${i + 1}.title`, null, s.title)}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-mortar lg:mx-auto lg:max-w-[16rem] dark:text-white/70">
                    {t(`how.step${i + 1}.text`, null, s.text)}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}