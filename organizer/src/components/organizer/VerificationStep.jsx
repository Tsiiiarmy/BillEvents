import { Icon } from '../common/Icon'
import { DocumentUpload } from './DocumentUpload'
import { docsFor } from '../../data/organizer'

export function validateVerification(data, { docs }) {
  const x = {}
  docsFor(data.mode).forEach((doc) => {
    const f = docs[doc.id]
    if (doc.required && !f) x[doc.id] = `Please upload your ${doc.title.toLowerCase()}.`
    else if (f?.status === 'uploading') x[doc.id] = 'Please wait for this upload to finish.'
  })
  return x
}

export function VerificationStep({ data, errors, uploads, clearError }) {
  const list = docsFor(data.mode)
  return (
    <div className="grid gap-8">
      <div className="flex gap-3 rounded-2xl bg-mist p-4 text-sm text-mortar dark:bg-navy dark:text-white/70">
        <Icon n="shield" className="mt-0.5 h-5 w-5 shrink-0 text-teal dark:text-aqua" />
        <p>These documents help our team verify your application. Clear photos or scans work best. For now, files you add stay in this browser and aren’t sent anywhere yet.</p>
      </div>
      {list.map((doc) => (
        <DocumentUpload key={doc.id} doc={doc} file={uploads.docs[doc.id]} error={errors[doc.id] || uploads.errors[doc.id]}
          onSelect={(f) => { clearError(doc.id); uploads.add(doc.id, f) }} onRemove={() => uploads.remove(doc.id)} />
      ))}
    </div>
  )
}