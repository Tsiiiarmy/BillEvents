import { Link } from 'react-router-dom'
import { Icon } from '../common/Icon'
import { Reveal } from '../common/Reveal'
import { Btn } from '../common/Btn'
import { benefits } from '../../data'
import useLanguage from '../../hooks/useLanguage'

/* ───────────── ORGANIZERS ───────────── */
export function Organizers() {
  const { t } = useLanguage()

  const stats = [
    ['org.sold', '7,420'],
    ['org.revenue', '5.08M ETB'],
    ['org.upcoming', '6'],
  ]
  const tiers = [
    ['tier.early', 0.82],
    ['tier.regular', 0.56],
    ['tier.vip', 0.28],
  ]

  return (
    <section id="organizers" className="pb-20">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-navy to-[#2C4A86] p-6 text-white sm:p-10 lg:p-14 dark:ring-1 dark:ring-aqua/20">
          <div className="animate-drift absolute -right-20 -top-20 h-80 w-80 rounded-full bg-aqua/25 blur-3xl" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.2em] text-aqua">{t('org.eyebrow')}</p>
              <h2 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">{t('org.title')}</h2>
              <p className="mt-4 max-w-md text-white/80">{t('org.text')}</p>

              <ul className="mt-8 grid gap-5">
                {benefits.map((b, i) => (
                  <li key={b.title} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-aqua">
                      <Icon n={b.icon} />
                    </span>
                    <div>
                      {/* Falls back to the English text in data/ until a translation exists */}
                      <h3 className="font-heading font-bold">{t(`org.benefit${i + 1}.title`, null, b.title)}</h3>
                      <p className="text-sm text-white/70">{t(`org.benefit${i + 1}.text`, null, b.text)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Btn as={Link} to="/organizer" className="bg-aqua text-navy">
                  {t('org.cta')} <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </Btn>
                <Btn as={Link} to="/help#help-organizers" variant="ghost">
                  {t('org.learn')}
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div
                className="animate-float rounded-2xl bg-white p-4 text-navy shadow-2xl sm:p-5"
                role="img"
                aria-label={t('org.demoLabel')}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-heading text-sm font-bold">{t('org.demoTitle')}</p>
                  <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold text-teal">
                    {t('org.sample')}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {stats.map(([key, v]) => (
                    <div key={key} className="rounded-xl bg-mist p-3">
                      <p className="text-[10px] text-mortar">{t(key)}</p>
                      <p className="font-heading text-base font-bold sm:text-lg">{v}</p>
                    </div>
                  ))}
                </div>
                <svg viewBox="0 0 300 100" className="mt-4 h-28 w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#6BD6DA" stopOpacity=".55" />
                      <stop offset="1" stopColor="#6BD6DA" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 80C40 70 60 40 100 50S160 85 200 45 270 15 300 20V100H0Z" fill="url(#area)" />
                  <path
                    className="line"
                    pathLength="1"
                    d="M0 80C40 70 60 40 100 50S160 85 200 45 270 15 300 20"
                    fill="none"
                    stroke="#3364AA"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="mt-3 grid gap-2.5">
                  {tiers.map(([key, w]) => (
                    <div key={key} className="flex items-center gap-3 text-xs">
                      <span className="w-20 truncate text-mortar">{t(key)}</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-mist">
                        <span className="bar block h-full rounded-full bg-aqua" style={{ '--w': w }} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}