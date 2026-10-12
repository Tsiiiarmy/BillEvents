import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/common/Brand'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { ThemeToggle } from '../../components/common/ThemeToggle'
import { SkipLink } from '../../components/common/SkipLink'
import { StatusBadge } from '../../components/common/StatusBadge'
import { ApplicationSummary } from '../../components/organizer/ApplicationSummary'
import useOrganizer from '../../hooks/useOrganizer'
import { saveDraft, EMPTY } from '../../hooks/useApplicationDraft'
import { STATUS_META } from '../../data/organizer'
import { buildApplicationSummary } from '../../utils/applicationSummary'

const VIEW = {
  pending: { icon: 'clock', title: 'Your organizer application is under review', text: 'The BillEvents team is reviewing the information and documents you submitted. We’ll let you know when there’s an update. You can’t create or publish events yet.' },
  changes_required: { icon: 'file', title: 'Changes required', text: 'We need some additional information before we can approve your organizer account.' },
  rejected: { icon: 'x', title: 'Application not approved', text: 'Your organizer application was not approved.' },
  approved: { icon: 'check', title: 'You’re a verified organizer', text: 'Congratulations! Your organizer account has been approved. You can now create and manage events.' },
}
const TONE = {
  amber: 'bg-amber-100 text-amber-900 dark:bg-amber-400/20 dark:text-amber-200',
  orange: 'bg-orange-100 text-orange-900 dark:bg-orange-400/20 dark:text-orange-200',
  red: 'bg-red-100 text-red-900 dark:bg-red-400/20 dark:text-red-200',
  green: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-400/20 dark:text-emerald-200',
}
const DONE = { pending: 1, changes_required: 2, rejected: 2, approved: 3 } // how many tracker steps are finished
const ghost = 'inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 px-5 py-2.5 text-sm font-bold transition hover:bg-navy/5 dark:border-white/25 dark:hover:bg-white/10'
const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—')

export default function StatusPage({ theme, toggle }) {
  const { status, application: app } = useOrganizer()
  const navigate = useNavigate()
  const [showApp, setShowApp] = useState(false)
  useEffect(() => { document.title = 'Application status — BillEvents' }, [])

  if (status === 'none' || !app) return <Navigate to="/organizer" replace />

  const v = VIEW[status]
  const tone = STATUS_META[status].tone
  const review = app.review ?? {}
  const changes = review.changes ?? []
  const sections = app.data ? buildApplicationSummary(app.data, app.docs ?? {}) : app.summary ?? []
  const done = DONE[status]

  // Re-open the form with the saved answers, starting at the section that needs work
  const update = (step = 0) => { saveDraft(step, app.data ?? EMPTY); navigate('/organizer/register') }
  const showChanges = () => {
    const el = document.getElementById('required-changes')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el?.focus({ preventScroll: true })
  }

  return (
    <div className="min-h-screen bg-mist dark:bg-navy-3">
      <SkipLink />
      <header className="wrap flex h-16 items-center justify-between">
        <Link to="/" aria-label="BillEvents home"><Logo className="h-8" /></Link>
        <ThemeToggle theme={theme} toggle={toggle} />
      </header>

      <main id="main" className="mx-auto w-full max-w-2xl px-5 pb-16 pt-6 sm:px-8">
        <div key={status} className="animate-up rounded-3xl border border-navy/10 bg-white p-6 text-center shadow-xl shadow-navy/5 sm:p-10 dark:border-white/10 dark:bg-navy-2 dark:shadow-none">
          <span className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${TONE[tone]}`}><Icon n={v.icon} className="h-10 w-10" /></span>
          <div className="mt-5"><StatusBadge status={status} /></div>
          <h1 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">{v.title}</h1>
          <p className="mx-auto mt-3 max-w-md text-mortar dark:text-white/70">{v.text}</p>

          {status === 'rejected' && (
            <div className="mt-6 rounded-2xl bg-red-50 p-4 text-left text-sm dark:bg-red-500/10">
              <p className="font-bold text-red-900 dark:text-red-200">Reason</p>
              <p className="mt-1 text-mortar dark:text-white/80">{review.reason ?? 'No reason was provided.'}</p>
            </div>
          )}

          {/* Progress tracker */}
          <ol aria-label="Application progress" className="mx-auto mt-8 flex max-w-md items-start">
            {['Submitted', 'Under review', 'Decision'].map((label, i) => {
              const isDone = i < done
              const current = i === done
              const decision = i === 2 && status !== 'pending'
              return (
                <li key={label} className="relative flex-1 text-center">
                  {i > 0 && <span aria-hidden="true" className={`absolute -left-1/2 top-4 h-0.5 w-full ${i <= done ? 'bg-aqua' : 'bg-navy/15 dark:bg-white/15'}`} />}
                  <span className={`relative z-10 mx-auto grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${
                    isDone ? 'bg-aqua text-navy'
                    : current ? (decision ? TONE[tone] : 'bg-navy text-white ring-4 ring-aqua/40 dark:bg-aqua dark:text-navy')
                    : 'bg-mist text-mortar dark:bg-navy dark:text-white/50'}`}>
                    {isDone ? <Icon n="check" className="h-4 w-4" /> : current ? <Icon n={decision ? v.icon : 'clock'} className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className="mt-1.5 block text-xs font-bold">{label}</span>
                </li>
              )
            })}
          </ol>

          <dl className="mt-8 grid gap-4 rounded-2xl bg-mist p-4 text-left sm:grid-cols-3 dark:bg-navy">
            <div><dt className="text-xs text-mortar dark:text-white/60">Application ID</dt><dd className="font-heading font-bold">{app.id}</dd></div>
            <div><dt className="text-xs text-mortar dark:text-white/60">{app.resubmitted ? 'Resubmitted' : 'Submitted'}</dt><dd className="font-heading font-bold">{fmt(app.submittedAt)}</dd></div>
            <div><dt className="text-xs text-mortar dark:text-white/60">{review.reviewedAt ? 'Reviewed' : 'Status'}</dt><dd className="font-heading font-bold">{review.reviewedAt ? fmt(review.reviewedAt) : STATUS_META[status].label}</dd></div>
          </dl>

          {status === 'changes_required' && (
            <section id="required-changes" tabIndex={-1} className="mt-8 text-left outline-none">
              <h2 className="font-heading font-bold">Required changes</h2>
              <ul className="mt-3 grid gap-3">
                {changes.map((c) => (
                  <li key={c.title + c.note} className="flex items-start justify-between gap-3 rounded-2xl border border-orange-300/70 bg-orange-50 p-4 dark:border-orange-300/30 dark:bg-orange-400/10">
                    <div><p className="text-sm font-bold">{c.title}</p><p className="mt-0.5 text-sm text-mortar dark:text-white/75">{c.note}</p></div>
                    <button type="button" onClick={() => update(c.step)} className="shrink-0 rounded-full border border-navy/25 px-3.5 py-1.5 text-xs font-bold transition hover:bg-white/60 dark:border-white/30 dark:hover:bg-white/10">Fix</button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {status === 'changes_required' && (<>
              <button type="button" onClick={showChanges} className={ghost}>View Required Changes</button>
              <Btn type="button" onClick={() => update(changes[0]?.step ?? 0)} className="bg-aqua text-navy">Update Application <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
            </>)}
            {status === 'rejected' && review.canResubmit && (
              <Btn type="button" onClick={() => update(0)} className="bg-aqua text-navy">Update and Resubmit <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
            )}
            {status === 'approved' && (
              <Btn as={Link} to="/organizer/dashboard" className="bg-aqua px-6 py-3 text-navy">Create Your First Event <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
            )}
            {status === 'pending' && <Link to="/" className={ghost}>Back to home</Link>}
          </div>

          {sections.length > 0 && (
            <div className="mt-6">
              <button type="button" onClick={() => setShowApp(!showApp)} aria-expanded={showApp} aria-controls="submitted-application"
                className="text-sm font-bold text-teal hover:underline dark:text-aqua">{showApp ? 'Hide application' : 'View application'}</button>
              {showApp && <div id="submitted-application" className="animate-up mt-5"><ApplicationSummary sections={sections} /></div>}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}