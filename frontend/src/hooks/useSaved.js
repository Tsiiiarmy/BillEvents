import { useEffect, useSyncExternalStore } from 'react'
import useAuth from './useAuth'

/**
 * Saved event ids, kept PER PERSON:
 *   { "<userId>": ["12", "4"], "_guest": ["7"] }
 * Hearts made while signed out go to "_guest" and move into the person's
 * list when they sign in.
 */
const KEY = 'billevents-saved'
const GUEST = '_guest'
const EMPTY = []
const listeners = new Set()

function read() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY))
    // Old format (one shared list) → treat as signed-out hearts.
    if (Array.isArray(parsed)) return { [GUEST]: parsed.map(String) }
    if (parsed && typeof parsed === 'object') {
      return Object.fromEntries(
        Object.entries(parsed).map(([k, v]) => [k, Array.isArray(v) ? v.map(String) : []]),
      )
    }
    return {}
  } catch {
    return {}
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

/** Adds or removes. Returns true if the event is saved afterwards. */
export function toggleSaved(id, owner = GUEST) {
  const key = String(id)
  const list = state[owner] ?? EMPTY
  const next = list.includes(key) ? list.filter((s) => s !== key) : [key, ...list]
  state = { ...state, [owner]: next }
  persist()
  return next.includes(key)
}

export function clearSaved(owner = GUEST) {
  const next = { ...state }
  delete next[owner]
  state = next
  persist()
}

/** Wipes everyone's saved events on this device (dev tools). */
export function clearAllSaved() {
  state = {}
  persist()
}

/** Moves signed-out hearts into a person's list, without duplicates. */
function adoptGuest(owner) {
  const guest = state[GUEST] ?? EMPTY
  if (!guest.length) return
  const mine = state[owner] ?? EMPTY
  const next = { ...state, [owner]: [...guest.filter((id) => !mine.includes(id)), ...mine] }
  delete next[GUEST]
  state = next
  persist()
}

/** Returns { saved, isSaved, toggleSaved, clearSaved, clearAllSaved } for whoever is signed in. */
export default function useSaved() {
  const all = useSyncExternalStore(subscribe, getSnapshot)
  const { user } = useAuth()
  const owner = user?.id ? String(user.id) : GUEST

  useEffect(() => {
    if (owner !== GUEST && all[GUEST]?.length) adoptGuest(owner)
  }, [owner, all])

  const saved = all[owner] ?? EMPTY

  return {
    saved,
    isSaved: (id) => saved.includes(String(id)),
    toggleSaved: (id) => toggleSaved(id, owner),
    clearSaved: () => clearSaved(owner),
    clearAllSaved,
  }
}