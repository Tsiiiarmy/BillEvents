import useOrganizer from '../../hooks/useOrganizer'
import { STATUS_META } from '../../data/organizer'

// Sample application used only by this dev tool when you haven't submitted a real one
const file = (name, size, type) => ({ name, size, type, previewUrl: null, status: 'done', progress: 100 })
const SAMPLE = {
  data: { fullName: 'Abebe Kebede', email: 'abebe@example.com', phone: '911234567', idNumber: '', mode: 'organization', orgName: 'Addis Events PLC', orgType: 'Event agency', regNumber: 'AA/1/0012345/2020', address: 'Bole, Addis Ababa', city: 'Addis Ababa', eventTypes: ['Music', 'Festivals'], otherType: '', frequency: 'several', experience: 'We have organized concerts and festivals in Addis Ababa for three years.', agreeTerms: true, agreeAccurate: true, agreeReview: true },
  docs: { identity: file('national-id.jpg', 412000, 'image/jpeg'), license: file('business-license.pdf', 880000, 'application/pdf') },
}
const REVIEWS = {
  changes_required: { reviewedAt: new Date().toISOString(), changes: [
    { step: 2, title: 'Verification', note: 'The business license image is blurry. Please upload a clearer scan or photo.' },
    { step: 1, title: 'Organization', note: 'Please double-check your business license number. It doesn’t match the document.' },
  ] },
  rejected: { reviewedAt: new Date().toISOString(), canResubmit: true, reason: 'We couldn’t verify the business license you provided. You’re welcome to apply again with a valid license.' },
  approved: { reviewedAt: new Date().toISOString() },
}

export function DevStatusSwitcher() {
  const { status, application, setOrganizer } = useOrganizer()
  if (!import.meta.env.DEV) return null

  const change = (value) => {
    if (value === 'none') { setOrganizer({ status: 'none', application: undefined }); return }
    const base = application ?? { id: 'BE-204817', submittedAt: new Date().toISOString(), ...SAMPLE }
    const { review, ...rest } = base // drop any old review message
    setOrganizer({ status: value, application: { ...rest, ...(REVIEWS[value] ? { review: REVIEWS[value] } : {}) } })
  }

  return (
    <label className="fixed bottom-4 left-4 z-[70] grid gap-1 rounded-xl bg-navy p-2.5 text-[11px] font-bold text-white shadow-xl ring-1 ring-white/20">
      <span className="text-aqua">DEV · Organizer status</span>
      <select value={status} onChange={(e) => change(e.target.value)} className="rounded-lg bg-white/10 px-2 py-1.5 text-xs font-medium text-white [&>option]:text-navy">
        {Object.entries(STATUS_META).map(([k, m]) => <option key={k} value={k}>{m.label}</option>)}
      </select>
    </label>
  )
}