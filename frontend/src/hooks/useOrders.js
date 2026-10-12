import { useSyncExternalStore } from 'react'
import { makeOrderRef, makeTicketCode } from '../utils/ids'
import { calcTotals } from '../utils/money'

const KEY = 'billevents-orders'
const listeners = new Set()

function read() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(parsed) ? parsed : []
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

/** One ticket object per seat, so each has its own code and its own status. */
function expandTickets(items, event) {
  const tickets = []
  items.forEach((item) => {
    for (let i = 0; i < item.qty; i += 1) {
      tickets.push({
        code: makeTicketCode(),
        tierId: item.id,
        tierName: item.name,
        price: item.price,
        seat: `${i + 1} of ${item.qty}`,
        status: 'valid',
        checkedInAt: null,
        eventId: event.eventId,
      })
    }
  })
  return tickets
}

/**
 * Turns a paid checkout draft into a stored order with real tickets.
 * A real backend would do this and hand back the reference.
 */
export function createOrder({ draft, method, user }) {
  const totals = calcTotals(draft.items)
  const order = {
    ref: makeOrderRef(),
    status: 'paid',
    paidAt: new Date().toISOString(),
    method,
    userId: user?.id ?? null,
    contact: draft.contact ?? null,

    eventId: draft.eventId,
    eventTitle: draft.eventTitle,
    eventDate: draft.eventDate,
    eventStart: draft.eventStart,
    eventVenue: draft.eventVenue,
    eventCity: draft.eventCity,
    eventImage: draft.eventImage ?? null,
    eventGrad: draft.eventGrad ?? null,

    items: draft.items,
    subtotal: totals.subtotal,
    serviceFee: totals.serviceFee,
    total: totals.total,
    quantity: totals.qty,

    tickets: expandTickets(draft.items, draft),
  }

  state = [order, ...state]
  persist()
  return order
}

export function findOrder(ref) {
  return state.find((o) => o.ref === ref) ?? null
}

export function findTicket(code) {
  for (const order of state) {
    const ticket = order.tickets.find((t) => t.code === code)
    if (ticket) return { order, ticket }
  }
  return null
}

export function checkInTicket(code) {
  let changed = false
  state = state.map((order) => ({
    ...order,
    tickets: order.tickets.map((t) => {
      if (t.code !== code || t.status !== 'valid') return t
      changed = true
      return { ...t, status: 'used', checkedInAt: new Date().toISOString() }
    }),
  }))
  if (changed) persist()
  return changed
}

export function clearOrders() {
  state = []
  persist()
}

/** Returns { orders, createOrder, findOrder, findTicket, checkInTicket, clearOrders }. */
export default function useOrders() {
  const orders = useSyncExternalStore(subscribe, getSnapshot)
  return { orders, createOrder, findOrder, findTicket, checkInTicket, clearOrders }
}