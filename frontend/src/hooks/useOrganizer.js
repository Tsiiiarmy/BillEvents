import { useSyncExternalStore } from 'react'

const KEY = 'billevents-organizer'
const listeners = new Set()

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null }
}

// One shared object so every component sees the same status instantly
let state = read() ?? { status: 'none' }

const emit = () => listeners.forEach((l) => l())
const subscribe = (cb) => { listeners.add(cb); return () => listeners.delete(cb) }
const getSnapshot = () => state

export function setOrganizer(next) {
  state = { ...state, ...next }
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  emit()
}

export function resetOrganizer() {
  state = { status: 'none' }
  try { localStorage.removeItem(KEY) } catch { /* storage unavailable */ }
  emit()
}

/** Returns { status, application, ... } plus helpers. Replace internals with an API call later. */
export default function useOrganizer() {
  const data = useSyncExternalStore(subscribe, getSnapshot)
  return { ...data, setOrganizer, resetOrganizer }
}