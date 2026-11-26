import { useEffect, useState } from 'react'

const KEY = 'billevents-application-draft'
const LAST_STEP = 5

export const EMPTY = {
  // 01 Profile
  fullName: '', email: '', phone: '', idNumber: '',
  // 02 Organization
  mode: '', orgName: '', orgType: '', regNumber: '', address: '', city: '',
  // 04 Experience
  eventTypes: [], otherType: '', frequency: '', experience: '',
  // 05 Agreement
  agreeTerms: false, agreeAccurate: false, agreeReview: false,
}

export function loadDraft() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY))
    if (d) return { step: Math.min(Math.max(d.step ?? 0, 0), LAST_STEP), data: { ...EMPTY, ...d.data } }
  } catch { /* ignore broken storage */ }
  return { step: 0, data: EMPTY }
}

export default function useApplicationDraft() {
  const [state, setState] = useState(loadDraft)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  }, [state])

  const setStep = (step) => setState((s) => ({ ...s, step: Math.min(Math.max(step, 0), LAST_STEP) }))
  const update = (patch) => setState((s) => ({ ...s, data: { ...s.data, ...patch } }))
  const reset = () => { try { localStorage.removeItem(KEY) } catch { /* ignore */ } setState({ step: 0, data: EMPTY }) }

  return { data: state.data, step: state.step, setStep, update, reset }
}

/** Pre-fills the form (used when an organizer updates a reviewed application). */
export function saveDraft(step, data) {
  try { localStorage.setItem(KEY, JSON.stringify({ step, data: { ...EMPTY, ...data } })) } catch { /* storage unavailable */ }
}