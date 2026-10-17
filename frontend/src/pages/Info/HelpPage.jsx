import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { InfoLayout } from '../../components/info/InfoLayout'
import { Field } from '../../components/common/FormField'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { HELP_TOPICS } from '../../data/support'
import useLanguage from '../../hooks/useLanguage'

export default function HelpPage({ theme, toggle }) {
  const { lang, t } = useLanguage()
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  // Translate first, then search — so people search in the language they read.
  const localized = useMemo(
    () =>
      HELP_TOPICS.map((tp) => ({
        ...tp,
        title: t(`help.t.${tp.id}`, null, tp.title),
        items: tp.items.map((it, i) => ({
          ...it,
          q: t(`help.${tp.id}.${i}.q`, null, it.q),
          a: t(`help.${tp.id}.${i}.a`, null, it.a),
          link: it.link && { ...it.link, label: t(`help.${tp.id}.${i}.link`, null, it.link.label) },
        })),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  )

  const topics = useMemo(() => {
    if (!q) return localized
    return localized
      .map((tp) => ({ ...tp, items: tp.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(q)) }))
      .filter((tp) => tp.items.length > 0)
  }, [q, localized])

  const count = topics.reduce((n, tp) => n + tp.items.length, 0)

  return (
    <InfoLayout theme={theme} toggle={toggle} eyebrow={t('footer.help')} title={t('help.title')} lead={t('help.lead')}>
      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        <nav aria-label={t('help.topics')} className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <ul className="grid gap-1">
            {localized.map((tp) => (
              <li key={tp.id}>
                <a
                  href={`#help-${tp.id}`}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold text-mortar transition hover:bg-white hover:text-navy dark:text-white/65 dark:hover:bg-navy-2 dark:hover:text-white"
                >
                  <Icon n={tp.icon} className="h-4 w-4" />
                  {tp.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <div className="max-w-xl">
            <Field
              id="help-search"
              label={t('help.search')}
              icon="search"
              type="search"
              placeholder={t('help.searchPlaceholder')}
              value={query}
              onChange={setQuery}
            />
          </div>

          <p aria-live="polite" className="mt-3 text-sm text-mortar empty:hidden dark:text-white/60">
            {q ? t(count === 1 ? 'help.found.one' : 'help.found.other', { count }) : ''}
          </p>

          {topics.length === 0 ? (
            <div className="mt-8 rounded-3xl bg-white p-10 text-center dark:bg-navy-2">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-teal dark:bg-white/10 dark:text-aqua">
                <Icon n="search" className="h-7 w-7" />
              </span>
              <h2 className="mt-5 font-heading text-xl font-bold">{t('help.noMatch', { q: query.trim() })}</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-mortar dark:text-white/65">{t('help.noMatchText')}</p>
              <Btn as={Link} to="/contact" variant="primary" className="mt-6">
                {t('footer.contact')}
              </Btn>
            </div>
          ) : (
            <div className="mt-8 grid gap-10">
              {topics.map((tp) => (
                <section key={tp.id} id={`help-${tp.id}`} aria-labelledby={`help-${tp.id}-title`}>
                  <h2 id={`help-${tp.id}-title`} className="flex items-center gap-2.5 font-heading text-2xl font-bold">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-aqua dark:bg-aqua dark:text-navy">
                      <Icon n={tp.icon} className="h-5 w-5" />
                    </span>
                    {tp.title}
                  </h2>

                  <div className="mt-4 grid gap-3">
                    {tp.items.map((item) => (
                      <details
                        key={`${q ? 'open' : 'closed'}-${item.q}`}
                        open={!!q}
                        className="group rounded-2xl bg-white p-5 transition open:ring-1 open:ring-teal/40 dark:bg-navy-2 dark:open:ring-aqua/40"
                      >
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-heading text-lg font-bold leading-snug [&::-webkit-details-marker]:hidden">
                          <span>{item.q}</span>
                          <Icon
                            n="plus"
                            className="mt-0.5 h-5 w-5 shrink-0 text-teal transition group-open:rotate-45 motion-reduce:transition-none dark:text-aqua"
                          />
                        </summary>
                        <div className="mt-3 text-mortar dark:text-white/70">
                          {item.draft && (
                            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 text-xs font-bold text-navy dark:bg-white/10 dark:text-white">
                              <Icon n="info" className="h-3.5 w-3.5" />
                              {t('help.pending')}
                            </span>
                          )}
                          <p className="leading-7">{item.a}</p>
                          {item.link && (
                            <Link
                              to={item.link.to}
                              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:underline dark:text-aqua"
                            >
                              {item.link.label}
                              <Icon n="arrow" className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-navy p-8 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold">{t('help.stuck')}</h2>
              <p className="mt-1 text-white/70">{t('help.stuckText')}</p>
            </div>
            <Btn as={Link} to="/contact" variant="primary">
              {t('footer.contact')}
            </Btn>
          </div>
        </div>
      </div>
    </InfoLayout>
  )
}