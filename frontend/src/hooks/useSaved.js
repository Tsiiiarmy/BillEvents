import { useSyncExternalStore } from 'react'

const KEY = 'billevents-saved'
const listeners = new Set()

function read() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY))
    // Ids only. Event details come from the catalogue, so a saved event
    // always shows its current price and date rather than a stale copy.
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

let state = read()

const emit = () => listeners.forEach((l) => l())
const subscribe = (cb) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
const getSnapshot = () => state

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable */
  }
  emit()
}

export function isSaved(id) {
  return state.includes(String(id))
}

/** Adds or removes. Returns true if the event is saved afterwards. */
export function toggleSaved(id) {
  const key = String(id)
  state = state.includes(key) ? state.filter((s) => s !== key) : [key, ...state]
  persist()
  return state.includes(key)
}

export function clearSaved() {
  state = []
  persist()
}

/** Returns { saved, isSaved, toggleSaved, clearSaved }. */
export default function useSaved() {
  const saved = useSyncExternalStore(subscribe, getSnapshot)
  return { saved, isSaved, toggleSaved, clearSaved }
}