/**
 * What actually goes inside the QR square.
 *
 * ⚠ This payload is plain text, so anyone can generate a matching code.
 * It is fine for a preview. A real system must put a SIGNED token here
 * (HMAC or JWT issued by the backend) so a ticket cannot be forged, and
 * the gate must verify it against the server. This file is the one place
 * that changes when that happens.
 */
export const QR_VERSION = 'BE1'

/** → "BE1|BE-7KQ2MX|4JTN-9QKD-2MR7" */
export function ticketPayload(order, ticket) {
  return [QR_VERSION, order.ref, ticket.code].join('|')
}

/** Used by the event-entry scanner. Returns null if the code isn't ours. */
export function parseTicketPayload(text = '') {
  const [version, ref, code] = String(text).trim().split('|')
  if (version !== QR_VERSION || !ref || !code) return null
  return { ref, code }
}