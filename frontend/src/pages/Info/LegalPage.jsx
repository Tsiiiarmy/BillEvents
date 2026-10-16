import { Link } from 'react-router-dom'

import { InfoLayout } from '../../components/info/InfoLayout'
import { Icon } from '../../components/common/Icon'
import { LEGAL } from '../../data/support'

/** Renders Terms or Privacy from data/support.js. `doc` is 'terms' | 'privacy'. */
export default function LegalPage({ theme, toggle, doc }) {
  const page = LEGAL[doc]
  const other =
    doc === 'terms'
      ? { to: '/privacy', label: 'Privacy Policy' }
      : { to: '/terms', label: 'Terms & Conditions' }

  return (
    <InfoLayout theme={theme} toggle={toggle} eyebrow="Legal" title={page.title} lead={page.lead}>
      <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-wider text-mortar dark:text-white/50">
            On this page
          </p>
          <ol className="mt-3 grid gap-1.5 text-sm">
            {page.sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${doc}-${s.id}`}
                  className="text-mortar transition hover:text-teal dark:text-white/70 dark:hover:text-aqua"
                >
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0">
          <div
            role="note"
            className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-teal/40 dark:bg-navy-2 dark:ring-aqua/40"
          >
            <Icon n="info" className="mt-0.5 h-5 w-5 shrink-0 text-teal dark:text-aqua" />
            <div>
              <p className="font-bold">Draft outline, not the final text</p>
              <p className="mt-1 text-sm text-mortar dark:text-white/70">
                This page hasn’t been written yet. It shows the sections it will cover so the layout
                is ready. The final wording will come from BillPay’s legal team, and nothing here is
                binding.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {page.sections.map((s, i) => (
              <section
                key={s.id}
                id={`${doc}-${s.id}`}
                aria-labelledby={`${doc}-${s.id}-title`}
                className="rounded-2xl bg-white p-6 dark:bg-navy-2"
              >
                <h2 id={`${doc}-${s.id}-title`} className="font-heading text-xl font-bold">
                  <span className="text-teal dark:text-aqua">{i + 1}.</span> {s.heading}
                </h2>
                <p className="mt-2 text-mortar dark:text-white/70">
                  <span className="font-bold">Will cover:</span> {s.covers}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-8 text-sm text-mortar dark:text-white/70">
            Questions?{' '}
            <Link to="/contact" className="font-bold text-teal hover:underline dark:text-aqua">
              Contact us
            </Link>
            . See also our{' '}
            <Link to={other.to} className="font-bold text-teal hover:underline dark:text-aqua">
              {other.label}
            </Link>
            .
          </p>
        </article>
      </div>
    </InfoLayout>
  )
}