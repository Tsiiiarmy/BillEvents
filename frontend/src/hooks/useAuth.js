import { useSyncExternalStore } from 'react'

const KEY = 'billevents-user'
const listeners = new Set()

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}

// One shared object so every component sees the same user instantly
let state = read() ?? null

const emit = () => listeners.forEach((l) => l())
const subscribe = (cb) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
const getSnapshot = () => state

function persist() {
  try {
    if (state) localStorage.setItem(KEY, JSON.stringify(state))
    else localStorage.removeItem(KEY)
  } catch {
    /* storage unavailable */
  }
  emit()
}

/**
 * Front-end only. There is no password check and no server.
 * Replace the body of these three functions with real API calls later —
 * nothing else in the app needs to change.
 */

export function signIn(person = {}) {
  state = {
    id: person.id ?? `u_${Date.now().toString(36)}`,
    name: '',
    email: '',
    phone: '',
    joinedAt: new Date().toISOString(),
    ...person,
  }
  persist()
  return state
}

export function signOut() {
  state = null
  persist()
}

export function updateUser(patch = {}) {
  if (!state) return null
  state = { ...state, ...patch }
  persist()
  return state
}

/** Returns { user, isSignedIn, signIn, signOut, updateUser }. */
export default function useAuth() {
  const user = useSyncExternalStore(subscribe, getSnapshot)
  return { user, isSignedIn: Boolean(user), signIn, signOut, updateUser }
}