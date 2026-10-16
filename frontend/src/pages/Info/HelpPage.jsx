import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { InfoLayout } from '../../components/info/InfoLayout'
import { Field } from '../../components/common/FormField'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { HELP_TOPICS } from '../../data/support'

export default function HelpPage({ theme, toggle }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const topics = useMemo(() => {
    if (!q) return HELP_TOPICS
    return HELP_TOPICS.map((t) => ({
      ...t,
      items: t.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(q)),
    })).filter((t) => t.items.length > 0)
  }, [q])

  const count = topics.reduce((n, t) => n + t.items.length, 0)

  return (
    <InfoLayout
      theme={theme}
      toggle={toggle}
      eyebrow="Help Center"
      title="How can we help?"
      lead="Answers to the questions people ask most about tickets, payments and your account."
    >
      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        {/* Topic jump links — desktop only, the search does this job on mobile */}
        <nav aria-label="Help topics" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <ul className="grid gap-1">
            {HELP_TOPICS.map((t) => (
              <li key={t.id}>
                <a
                  href={`#help-${t.id}`}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold text-mortar transition hover:bg-white hover:text-navy dark:text-white/65 dark:hover:bg-navy-2 dark:hover:text-white"
                >
                  <Icon n={t.icon} className="h-4 w-4" />
                  {t.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <div className="max-w-xl">
            <Field
              id="help-search"
              label="Search help"
              icon="search"
              type="search"
              placeholder="Try “refund” or “QR code”"
              value={query}
              onChange={setQuery}
            />
          </div>

          <p aria-live="polite" className="mt-3 text-sm text-mortar empty:hidden dark:text-white/60">
            {q ? `${count} ${count === 1 ? 'answer' : 'answers'} found` : ''}
          </p>

          {topics.length === 0 ? (
            <div className="mt-8 rounded-3xl bg-white p-10 text-center dark:bg-navy-2">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-teal dark:bg-white/10 dark:text-aqua">
                <Icon n="search" className="h-7 w-7" />
              </span>
              <h2 className="mt-5 font-heading text-xl font-bold">No answers match “{query.trim()}”</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-mortar dark:text-white/65">
                Try a shorter word, or send us a message and we’ll help directly.
              </p>
              <Btn as={Link} to="/contact" variant="primary" className="mt-6">
                Contact us
              </Btn>
            </div>
          ) : (
            <div className="mt-8 grid gap-10">
              {topics.map((t) => (
                <section key={t.id} id={`help-${t.id}`} aria-labelledby={`help-${t.id}-title`}>
                  <h2
                    id={`help-${t.id}-title`}
                    className="flex items-center gap-2.5 font-heading text-2xl font-bold"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-aqua dark:bg-aqua dark:text-navy">
                      <Icon n={t.icon} className="h-5 w-5" />
                    </span>
                    {t.title}
                  </h2>

                  <div className="mt-4 grid gap-3">
                    {t.items.map((item) => (
                      <details
                        // Remounts when a search starts, so matches open automatically
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
                              Policy pending
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

          {/* Still stuck */}
          <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-navy p-8 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold">Still need help?</h2>
              <p className="mt-1 text-white/70">Send us a message with your order reference.</p>
            </div>
            <Btn as={Link} to="/contact" variant="primary">
              Contact us
            </Btn>
          </div>
        </div>
      </div>
    </InfoLayout>
  )
}