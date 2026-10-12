import { Icon } from '../common/Icon'

export function validateAgreement(d) {
  const x = {}
  if (!d.agreeTerms) x.agreeTerms = 'Please accept the organizer terms to continue.'
  if (!d.agreeAccurate) x.agreeAccurate = 'Please confirm that your information is accurate.'
  if (!d.agreeReview) x.agreeReview = 'Please confirm that you understand your application may be reviewed.'
  return x
}

function CheckRow({ id, checked, onChange, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
        checked ? 'border-aqua bg-aqua/10' : error ? 'border-red-500' : 'border-navy/15 hover:border-aqua/60 dark:border-white/20'}`}>
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-err` : undefined} className="peer sr-only" />
        <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition peer-focus-visible:ring-4 peer-focus-visible:ring-aqua/40 ${
          checked ? 'border-aqua bg-aqua text-navy' : 'border-navy/30 dark:border-white/40'}`}>
          {checked && <Icon n="check" className="h-4 w-4" />}
        </span>
        <span className="text-sm leading-relaxed">{children}</span>
      </label>
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}

export function AgreementStep({ data, set, errors }) {
  return (
    <div className="grid gap-4">
      <CheckRow id="agreeTerms" checked={data.agreeTerms} onChange={set('agreeTerms')} error={errors.agreeTerms}>
        I agree to the{' '}
        <a href="#" onClick={(e) => e.preventDefault()} className="font-bold text-teal underline dark:text-aqua">BillEvents Organizer Terms</a>.
      </CheckRow>
      <CheckRow id="agreeAccurate" checked={data.agreeAccurate} onChange={set('agreeAccurate')} error={errors.agreeAccurate}>
        I confirm that the information I provided is accurate.
      </CheckRow>
      <CheckRow id="agreeReview" checked={data.agreeReview} onChange={set('agreeReview')} error={errors.agreeReview}>
        I understand that my application may be reviewed before approval.
      </CheckRow>
    </div>
  )
}