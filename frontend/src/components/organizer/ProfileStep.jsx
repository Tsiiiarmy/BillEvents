import { Field } from '../common/FormField'
import { ORGANIZER_CONFIG } from '../../data/organizer'
import { EMAIL_RE, PHONE_RE } from '../../data/patterns'

export function validateProfile(d) {
  const x = {}
  if (d.fullName.trim().length < 2) x.fullName = 'Please enter your full name.'
  if (!EMAIL_RE.test(d.email.trim())) x.email = 'Enter a valid email address.'
  if (!PHONE_RE.test(d.phone.replace(/\s/g, ''))) x.phone = 'Enter a valid mobile number, e.g. 911 234 567.'
  if (ORGANIZER_CONFIG.collectIdNumber && ORGANIZER_CONFIG.idNumberRequired && !d.idNumber.trim()) x.idNumber = 'Please enter your ID or passport number.'
  return x
}

export function ProfileStep({ data, set, errors }) {
  return (
    <div className="grid gap-5">
      <Field id="fullName" label="Full name" icon="user" autoComplete="name" placeholder="Abebe Kebede"
        hint="Use the name that appears on your official documents." value={data.fullName} onChange={set('fullName')} error={errors.fullName} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" icon="mail" type="email" autoComplete="email" placeholder="you@example.com" value={data.email} onChange={set('email')} error={errors.email} />
        <Field id="phone" label="Phone number" icon="phone" prefix="+251" inputMode="tel" autoComplete="tel-national" placeholder="911 234 567" value={data.phone} onChange={set('phone')} error={errors.phone} />
      </div>
      {ORGANIZER_CONFIG.collectIdNumber && (
        <Field id="idNumber" label="ID or passport number" icon="file" optional={!ORGANIZER_CONFIG.idNumberRequired}
          hint="Only used for verification." value={data.idNumber} onChange={set('idNumber')} error={errors.idNumber} />
      )}
    </div>
  )
}