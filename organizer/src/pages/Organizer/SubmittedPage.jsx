import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Logo } from '../../components/common/Brand'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { ThemeToggle } from '../../components/common/ThemeToggle'
import { SkipLink } from '../../components/common/SkipLink'
import { StatusBadge } from '../../components/common/StatusBadge'
import useOrganizer from '../../hooks/useOrganizer'

const NEXT = [
  'Our team reviews your information and documents.',
  'We’ll let you know when there’s an update on your application.',
  'Once you’re approved, you can create your first event. Each event is also reviewed before it goes live.',
]

export default function SubmittedPage({ theme, toggle }) {
  const { status, application } = useOrganizer()
  const [copied, setCopied] = useState(false)
  useEffect(() => { document.title = 'Application submitted — BillEvents' }, [])

  if (status !== 'pending' || !application) return <Navigate to="/organizer" replace />

  const date = new Date(application.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const copy = async () => {
    try { await navigator.clipboard.writeText(application.id); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* clipboard blocked */ }
  }

  return (
    <div className="min-h-screen bg-mist dark:bg-navy-3">
      <SkipLink />
      <header className="wrap flex h-16 items-center justify-between">
        <Link to="/" aria-label="BillEvents home"><Logo className="h-8" /></Link>
        <ThemeToggle theme={theme} toggle={toggle} />
      </header>

      <main id="main" className="mx-auto w-full max-w-xl px-5 pb-16 pt-8 sm:px-8">
        <div className="animate-up rounded-3xl border border-navy/10 bg-white p-7 text-center shadow-xl shadow-navy/5 sm:p-10 dark:border-white/10 dark:bg-navy-2 dark:shadow-none">
          <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-aqua text-navy">
            <span className="absolute inset-0 -z-10 scale-125 rounded-full bg-aqua/30" aria-hidden="true" />
            <Icon n="check" className="h-10 w-10" />
          </span>
          <h1 className="mt-6 font-heading text-3xl font-bold">Application submitted</h1>
          <p className="mx-auto mt-3 max-w-sm text-mortar dark:text-white/70">Thanks for applying to become a BillEvents organizer. Our team will review your application and notify you when there is an update.</p>

          <div className="mx-auto mt-7 flex max-w-xs items-center justify-between gap-3 rounded-2xl bg-mist p-4 text-left dark:bg-navy">
            <div>
              <p className="text-xs text-mortar dark:text-white/60">Application ID</p>
              <p className="font-heading text-xl font-bold tracking-wide">{application.id}</p>
              <p className="text-xs text-mortar dark:text-white/60">Submitted {date}</p>
            </div>
            <button type="button" onClick={copy} className="rounded-full border border-navy/20 px-4 py-1.5 text-xs font-bold transition hover:bg-navy/5 dark:border-white/25 dark:hover:bg-white/10">{copied ? 'Copied' : 'Copy'}</button>
          </div>
          <span className="sr-only" role="status">{copied ? 'Application ID copied' : ''}</span>

          <div className="mt-5 flex justify-center"><StatusBadge status="pending" /></div>

          <div className="mt-8 border-t border-navy/10 pt-6 text-left dark:border-white/10">
            <h2 className="font-heading font-bold">What happens next</h2>
            <ol className="mt-4 grid gap-3">
              {NEXT.map((t, i) => (
                <li key={t} className="flex items-start gap-3 text-sm text-mortar dark:text-white/75">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-white dark:bg-aqua dark:text-navy">{i + 1}</span>{t}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn as={Link} to="/organizer/status" className="bg-aqua text-navy">View application status <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
            <Link to="/" className="rounded-full border border-navy/20 px-5 py-2.5 text-sm font-bold transition hover:bg-navy/5 dark:border-white/25 dark:hover:bg-white/10">Back to home</Link>
          </div>
        </div>
      </main>
    </div>
  )
}