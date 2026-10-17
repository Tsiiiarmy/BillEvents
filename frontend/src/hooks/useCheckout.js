import { useSyncExternalStore } from 'react'
import { CHECKOUT_TTL_MINUTES } from '../data/checkout'

const KEY = 'billevents-checkout'
const TTL_MS = CHECKOUT_TTL_MINUTES * 60_000
const listeners = new Set()

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}

const ageOf = (d) => Date.now() - new Date(d.startedAt).getTime()
const isStale = (d) => !d?.startedAt || Number.isNaN(ageOf(d)) || ageOf(d) > TTL_MS

let state = read()
// Set when a draft runs out WHILE the app is open, so the page can say why.
let expiredEventId = null
let timer = null

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

function expireIfStale() {
  if (state && isStale(state)) {
    expiredEventId = state.eventId
    state = null
    clearTimeout(timer)
    persist()
  }
}

/** Fires exactly when the draft runs out (plus a small margin). */
function schedule() {
  clearTimeout(timer)
  if (state?.startedAt) timer = setTimeout(expireIfStale, Math.max(0, TTL_MS - ageOf(state)) + 500)
}

// On load: a draft that's already old is dropped quietly (no message the next day).
if (state && isStale(state)) {
  state = null
  persist()
}
schedule()

// Timers pause while a laptop sleeps or a tab is in the background,
// so check again whenever someone comes back to the page.
if (typeof window !== 'undefined') {
  window.addEventListener('focus', expireIfStale)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) expireIfStale()
  })
}

/**
 * Called from the event page when "Continue to Checkout" is pressed.
 * We copy the event fields we need so the checkout page never has to
 * look the event up again — that matters once events come from an API.
 */
export function startCheckout(event, items) {
  expiredEventId = null
  state = {
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    eventStart: event.start,
    eventVenue: event.venue,
    eventCity: event.city,
    eventImage: event.image ?? null,
    eventGrad: event.grad ?? null,
    items, // [{ id, name, price, qty }]
    contact: null,
    startedAt: new Date().toISOString(),
  }
  persist()
  schedule()
  return state
}

export function setContact(contact) {
  if (!state) return null
  state = { ...state, contact }
  persist()
  return state
}

export function setItems(items) {
  if (!state) return null
  state = { ...state, items }
  persist()
  return state
}

export function clearCheckout() {
  clearTimeout(timer)
  state = null
  persist()
}

/**
 * Returns { draft, hasDraft, expiredEventId, startCheckout, setContact, setItems, clearCheckout }.
 * expiredEventId is set when a checkout ran out of time in this session.
 */
export default function useCheckout() {
  const draft = useSyncExternalStore(subscribe, getSnapshot)
  return {
    draft,
    hasDraft: Boolean(draft?.items?.length),
    expiredEventId,
    startCheckout,
    setContact,
    setItems,
    clearCheckout,
  }
}