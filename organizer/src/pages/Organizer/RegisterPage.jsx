import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/common/Brand'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { ThemeToggle } from '../../components/common/ThemeToggle'
import { SkipLink } from '../../components/common/SkipLink'
import { ProgressStepper } from '../../components/organizer/ProgressStepper'
import { ProfileStep, validateProfile } from '../../components/organizer/ProfileStep'
import { OrganizationStep, validateOrganization } from '../../components/organizer/OrganizationStep'
import { VerificationStep, validateVerification } from '../../components/organizer/VerificationStep'
import { ExperienceStep, validateExperience } from '../../components/organizer/ExperienceStep'
import { AgreementStep, validateAgreement } from '../../components/organizer/AgreementStep'
import { ReviewStep } from '../../components/organizer/ReviewStep'
import useApplicationDraft from '../../hooks/useApplicationDraft'
import useDocumentUploads from '../../hooks/useDocumentUploads'
import useOrganizer from '../../hooks/useOrganizer'
import { APPLICATION_STEPS } from '../../data/organizer'
import { buildApplicationSummary, docsMeta } from '../../utils/applicationSummary'

const INTRO = [
  ['Tell us about you', 'We’ll use these details to contact you about your application.'],
  ['How will you organize events?', 'Choose the option that fits you best.'],
  ['Verify your information', 'To keep BillEvents safe for organizers and attendees, we need to verify some information about you.'],
  ['Your experience', 'Help our team understand the events you organize.'],
  ['Almost there', 'Please review and accept the BillEvents organizer terms before submitting your application.'],
  ['Review your application', 'Check everything below. You can edit any section before you submit.'],
]
const BODY = [
  { Component: ProfileStep, validate: validateProfile },
  { Component: OrganizationStep, validate: validateOrganization },
  { Component: VerificationStep, validate: validateVerification },
  { Component: ExperienceStep, validate: validateExperience },
  { Component: AgreementStep, validate: validateAgreement },
  { Component: ReviewStep }, // validated as a whole when you press Submit
]
const STEPS = APPLICATION_STEPS.map((s, i) => ({ ...s, intro: INTRO[i], ...BODY[i] }))

export default function RegisterPage({ theme, toggle }) {
  const { status, application, setOrganizer } = useOrganizer()
  // Updating a reviewed application (changes required, or rejected where resubmission is allowed)
  const resubmitting = status === 'changes_required' || (status === 'rejected' && !!application?.review?.canResubmit)
  const { data, step, setStep, update, reset } = useApplicationDraft()
  const uploads = useDocumentUploads(resubmitting ? application?.docs ?? {} : {}) // lives here so files survive moving between steps
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [issues, setIssues] = useState([])
  const [sending, setSending] = useState(false)
  const submitted = useRef(false)
  const heading = useRef(null)
  const cur = STEPS[step]
  const notes = resubmitting ? (application?.review?.changes ?? []).filter((c) => c.step === step) : []

  useEffect(() => { document.title = 'Organizer application — BillEvents' }, [])

  // On every step change: back to the top, and move keyboard/screen-reader focus to the step title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    heading.current?.focus({ preventScroll: true })
  }, [step])

  // Already applied/approved? The application isn't for them (unless they're updating one, or just submitted).
  if (status !== 'none' && !resubmitting && !submitted.current) return <Navigate to="/organizer" replace />

  const set = (key) => (value) => {
    update({ [key]: value })
    setErrors((e) => ({ ...e, [key]: undefined }))
  }
  const clearError = (key) => setErrors((e) => ({ ...e, [key]: undefined }))

  const next = () => {
    const found = cur.validate?.(data, { docs: uploads.docs }) ?? {}
    setErrors(found)
    if (Object.keys(found).length) {
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    setStep(step + 1)
  }
  const go = (i) => { setErrors({}); setIssues([]); setStep(i) }

  const submit = () => {
    const bad = STEPS.slice(0, 5)
      .map((s, i) => ({ step: i, title: s.title, found: s.validate(data, { docs: uploads.docs }) }))
      .filter((s) => Object.keys(s.found).length)
    setIssues(bad.map(({ step: i, title }) => ({ step: i, title })))
    if (bad.length) {
      requestAnimationFrame(() => document.getElementById('review-issues')?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
      return
    }
    setSending(true)
    // Simulated network delay. When the backend exists, send the application here.
    setTimeout(() => {
      submitted.current = true
      const prev = { ...(application ?? {}) }
      delete prev.review // a new submission starts a fresh review
      setOrganizer({
        status: 'pending',
        application: {
          ...(resubmitting ? prev : {}),
          id: resubmitting ? application.id : `BE-${Math.floor(100000 + Math.random() * 900000)}`,
          submittedAt: new Date().toISOString(),
          resubmitted: resubmitting,
          data,
          docs: docsMeta(uploads.docs),
          summary: buildApplicationSummary(data, uploads.docs),
        },
      })
      reset()
      navigate('/organizer/submitted', { replace: true })
    }, 900)
  }

  const Body = cur.Component
  const last = step === STEPS.length - 1

  return (
    <div className="min-h-screen bg-mist dark:bg-navy-3">
      <SkipLink />
      <header className="wrap flex h-16 items-center justify-between">
        <Link to="/" aria-label="BillEvents home"><Logo className="h-8" /></Link>
        <div className="flex items-center gap-2">
          <Link to={resubmitting ? '/organizer/status' : '/'} className="rounded-full px-4 py-2 text-sm font-bold text-mortar transition hover:bg-navy/10 dark:text-white/70 dark:hover:bg-white/10">{resubmitting ? 'Cancel' : 'Save & exit'}</Link>
          <ThemeToggle theme={theme} toggle={toggle} />
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-3xl px-5 pb-16 pt-6 sm:px-8">
        {resubmitting && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-orange-300/70 bg-orange-50 p-4 text-sm dark:border-orange-300/30 dark:bg-orange-400/10">
            <Icon n="file" className="mt-0.5 h-5 w-5 shrink-0 text-orange-700 dark:text-orange-300" />
            <p><b>You’re updating application {application.id}.</b> Your earlier answers and documents are saved. Steps with requested changes show a note from the BillEvents team.</p>
          </div>
        )}

        <ProgressStepper steps={STEPS} current={step} onGo={go} />

        <div className="mt-8 rounded-3xl border border-navy/10 bg-white p-6 shadow-xl shadow-navy/5 sm:p-10 dark:border-white/10 dark:bg-navy-2 dark:shadow-none">
          <div key={step} className="animate-up">
            <p className="text-xs font-bold tracking-[0.2em] text-teal dark:text-aqua">STEP {cur.n}</p>
            <h1 ref={heading} tabIndex={-1} className="mt-2 font-heading text-2xl font-bold outline-none sm:text-3xl">{cur.intro[0]}</h1>
            <p className="mt-2 max-w-xl text-mortar dark:text-white/70">{cur.intro[1]}</p>
            {notes.map((n) => (
              <div key={n.note} role="note" className="mt-5 rounded-xl border-l-4 border-orange-500 bg-orange-50 p-4 text-sm dark:bg-orange-400/10">
                <p className="font-bold">Requested by BillEvents</p>
                <p className="mt-0.5 text-mortar dark:text-white/80">{n.note}</p>
              </div>
            ))}
            <div className="mt-8">
              <Body data={data} set={set} errors={errors} uploads={uploads} clearError={clearError} onEdit={go} issues={issues} />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-3 border-t border-navy/10 pt-6 dark:border-white/10">
            {step > 0 ? (
              <button type="button" onClick={() => go(step - 1)} disabled={sending} className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-2.5 text-sm font-bold transition hover:bg-navy/5 disabled:pointer-events-none disabled:opacity-40 dark:border-white/25 dark:hover:bg-white/10">
                <Icon n="arrow" className="h-4 w-4 rotate-180" />Back
              </button>
            ) : <span />}
            {last ? (
              <Btn type="button" onClick={submit} disabled={sending} className="bg-aqua px-6 py-3 text-navy disabled:pointer-events-none disabled:opacity-70">
                {sending ? 'Submitting…' : resubmitting ? 'Resubmit Application' : 'Submit Application'} {!sending && <Icon n="check" className="h-4 w-4" />}
              </Btn>
            ) : (
              <Btn type="button" onClick={next} className="bg-aqua px-6 py-3 text-navy">
                {step === 4 ? 'Continue to review' : 'Continue'} <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
              </Btn>
            )}
          </div>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-mortar dark:text-white/55">
          <Icon n="check" className="h-3.5 w-3.5" /> Your answers are saved automatically on this device.
        </p>
      </main>
    </div>
  )
}