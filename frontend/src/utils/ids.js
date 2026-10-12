// Crockford-style alphabet: no 0/O or 1/I, so codes are easy to read aloud
// and hard to mistype at an event gate.
const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

function randomChars(length) {
  const out = []
  const buf = new Uint32Array(length)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(buf)
    for (let i = 0; i < length; i += 1) out.push(ALPHABET[buf[i] % ALPHABET.length])
  } else {
    for (let i = 0; i < length; i += 1) {
      out.push(ALPHABET[Math.floor(Math.random() * ALPHABET.length)])
    }
  }
  return out.join('')
}

/** Order reference shown on the receipt, e.g. "BE-7KQ2MX". */
export const makeOrderRef = () => `BE-${randomChars(6)}`

/** Per-ticket code, e.g. "4JTN-9QKD-2MR7". One per seat, never reused. */
export const makeTicketCode = () =>
  `${randomChars(4)}-${randomChars(4)}-${randomChars(4)}`

export { randomChars }