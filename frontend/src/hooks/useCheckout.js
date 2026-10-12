import { useSyncExternalStore } from 'react'
import { CHECKOUT_TTL_MINUTES } from '../data/checkout'

const KEY = 'billevents-checkout'
const listeners = new Set()

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}

function fresh(draft) {
  if (!draft?.startedAt) return null
  const age = Date.now() - new Date(draft.startedAt).getTime()
  return age > CHECKOUT_TTL_MINUTES * 60_000 ? null : draft
}

let state = fresh(read())

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
 * Called from the event page when "Continue to Checkout" is pressed.
 * We copy the event fields we need so the checkout page never has to
 * look the event up again — that matters once events come from an API.
 */

export function startCheckout(event, items) {
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
  state = null
  persist()
}

/** Returns { draft, hasDraft, startCheckout, setContact, setItems, clearCheckout }. */
export default function useCheckout() {
  const draft = useSyncExternalStore(subscribe, getSnapshot)
  return {
    draft,
    hasDraft: Boolean(draft?.items?.length),
    startCheckout,
    setContact,
    setItems,
    clearCheckout,
  }
}