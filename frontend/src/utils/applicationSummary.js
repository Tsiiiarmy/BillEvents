import { docsFor, ORGANIZER_CONFIG, FREQUENCIES } from '../data/organizer'

const phone = (p) => `+251 ${p.replace(/\s/g, '').replace(/^(\+251|251|0)/, '')}`

// rows are [label, value, ok]. ok: true = ✓, false = problem, undefined = plain
export function buildApplicationSummary(d, docs) {
  const org = d.mode === 'organization'
  const types = d.eventTypes.map((t) => (t === 'Other' && d.otherType.trim() ? `Other (${d.otherType.trim()})` : t))
  const freq = FREQUENCIES.find((f) => f.id === d.frequency)?.label
  return [
    { step: 0, title: 'Profile', rows: [
      ['Name', d.fullName.trim()], ['Email', d.email.trim()], ['Phone', phone(d.phone)],
      ...(ORGANIZER_CONFIG.collectIdNumber && d.idNumber.trim() ? [['ID / passport', d.idNumber.trim()]] : []),
    ] },
    { step: 1, title: 'Organization', rows: [
      ['Organizing as', org ? 'Organization / Company' : 'Individual'],
      ...(org ? [['Organization', d.orgName.trim()], ['Type', d.orgType], ...(d.regNumber.trim() ? [['Business license number', d.regNumber.trim()]] : []), ['Address', d.address.trim()]] : []),
      ['City', d.city],
    ] },
    { step: 2, title: 'Verification', rows: docsFor(d.mode).map((doc) => {
      const f = docs[doc.id]
      if (f) return [doc.title, f.name, true]
      return [doc.title, doc.required ? 'Not uploaded' : 'Not provided', doc.required ? false : undefined]
    }) },
    { step: 3, title: 'Experience', rows: [
      ['Event types', types.join(', ') || '—'], ['How often', freq || '—'],
      ...(d.experience.trim() ? [['About your experience', d.experience.trim()]] : []),
    ] },
    { step: 4, title: 'Agreement', rows: [
      ['Organizer Terms', d.agreeTerms ? 'Accepted' : 'Not accepted', d.agreeTerms],
      ['Information is accurate', d.agreeAccurate ? 'Confirmed' : 'Not confirmed', d.agreeAccurate],
    ] },
  ]
}

// Keeps just the file details (not the file) so an application can be shown and edited later
export const docsMeta = (docs) =>
  Object.fromEntries(Object.entries(docs).map(([k, f]) => [k, { name: f.name, size: f.size, type: f.type, previewUrl: null, status: 'done', progress: 100 }]))