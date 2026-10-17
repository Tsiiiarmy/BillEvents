import { Link } from 'react-router-dom'

import { InfoLayout } from '../../components/info/InfoLayout'
import { Icon } from '../../components/common/Icon'
import { LEGAL } from '../../data/support'
import useLanguage from '../../hooks/useLanguage'

/** Renders Terms or Privacy from data/support.js. `doc` is 'terms' | 'privacy'. */
export default function LegalPage({ theme, toggle, doc }) {
  const { t } = useLanguage()
  const page = LEGAL[doc]
  const title = t(doc === 'terms' ? 'footer.terms' : 'footer.privacy')
  const other =
    doc === 'terms'
      ? { to: '/privacy', label: t('footer.privacy') }
      : { to: '/terms', label: t('footer.terms') }

  const linkCls = 'font-bold text-teal hover:underline dark:text-aqua'
  const parts = t('legal.questions').split(/(\{contact\}|\{other\})/)

  return (
    <InfoLayout
      theme={theme}
      toggle={toggle}
      eyebrow={t('legal.eyebrow')}
      title={title}
      lead={t(`legal.${doc}.lead`, null, page.lead)}
    >
      <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
        <nav aria-label={t('legal.onPage')} className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-wider text-mortar dark:text-white/50">{t('legal.onPage')}</p>
          <ol className="mt-3 grid gap-1.5 text-sm">
            {page.sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${doc}-${s.id}`}
                  className="text-mortar transition hover:text-teal dark:text-white/70 dark:hover:text-aqua"
                >
                  {i + 1}. {t(`legal.${doc}.${s.id}`, null, s.heading)}
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
              <p className="font-bold">{t('legal.draftTitle')}</p>
              <p className="mt-1 text-sm text-mortar dark:text-white/70">{t('legal.draftText')}</p>
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
                  <span className="text-teal dark:text-aqua">{i + 1}.</span> {t(`legal.${doc}.${s.id}`, null, s.heading)}
                </h2>
                {/* Placeholder text — stays English until the legal team writes the real wording */}
                <p className="mt-2 text-mortar dark:text-white/70">
                  <span className="font-bold">{t('legal.willCover')}</span> <span lang="en">{s.covers}</span>
                </p>
              </section>
            ))}
          </div>

          <p className="mt-8 text-sm text-mortar dark:text-white/70">
            {parts.map((part, i) =>
              part === '{contact}' ? (
                <Link key={i} to="/contact" className={linkCls}>
                  {t('footer.contact')}
                </Link>
              ) : part === '{other}' ? (
                <Link key={i} to={other.to} className={linkCls}>
                  {other.label}
                </Link>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </p>
        </article>
      </div>
    </InfoLayout>
  )
}