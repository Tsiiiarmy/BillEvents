import { parseTicketPayload } from './qr'
import { findTicket, checkInTicket } from '../hooks/useOrders'

const BARE_CODE = /^[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/

/** Accepts a scanned payload or a hand-typed ticket code. */
function readCode(raw = '') {
  const text = String(raw).trim()
  const parsed = parseTicketPayload(text)
  if (parsed) return { code: parsed.code, ref: parsed.ref, scanned: true }

  const typed = text.toUpperCase().replace(/\s/g, '')
  if (BARE_CODE.test(typed)) return { code: typed, ref: null, scanned: false }

  return null
}

/**
 * Checks a code and, when it passes, marks the ticket as used.
 *
 * ⚠ This decides everything locally from browser storage. A real gate must
 * verify a signed token against the server, because this build will happily
 * accept any QR someone generated themselves. See utils/qr.js.
 *
 * Returns { kind, code, order, ticket } — kind is a key of OUTCOMES.
 */
export function verifyAndCheckIn(raw, gateEventId = null) {
  const read = readCode(raw)
  if (!read) return { kind: 'invalid', code: String(raw).slice(0, 40) }

  const hit = findTicket(read.code)
  if (!hit) return { kind: 'unknown', code: read.code }

  const { order, ticket } = hit

  // The order reference is printed in the QR too, so a tampered code fails here.
  if (read.ref && read.ref !== order.ref) return { kind: 'invalid', code: read.code }

  if (gateEventId !== null && String(order.eventId) !== String(gateEventId)) {
    return { kind: 'wrong_event', code: read.code, order, ticket }
  }

  if (ticket.status === 'used') return { kind: 'used', code: read.code, order, ticket }
  if (ticket.status !== 'valid') return { kind: 'void', code: read.code, order, ticket }

  checkInTicket(read.code)
  const after = findTicket(read.code)
  return { kind: 'ok', code: read.code, order: after?.order ?? order, ticket: after?.ticket ?? ticket }
}