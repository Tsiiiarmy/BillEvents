import { SERVICE_FEE, FREE_IS_FREE } from '../data/checkout'

/** 1500 → "1,500 ETB" */
export function etb(amount) {
  return `${Math.round(amount || 0).toLocaleString('en-US')} ETB`
}

/** 1500 → "1,500" (when the unit is shown separately) */
export function amount(value) {
  return Math.round(value || 0).toLocaleString('en-US')
}

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))

/** Service fee for ONE ticket at a given price. */
export function feeForTicket(price) {
  if (FREE_IS_FREE && price <= 0) return 0
  if (SERVICE_FEE.mode === 'flat') return Math.round(SERVICE_FEE.flat)
  return Math.round(clamp(price * SERVICE_FEE.rate, SERVICE_FEE.min, SERVICE_FEE.max))
}

/**
 * Totals for a list of line items.
 * items: [{ id, name, price, qty }]
 * → { qty, subtotal, serviceFee, total, lines }
 */

export function calcTotals(items = []) {
  const lines = items
    .filter((i) => i.qty > 0)
    .map((i) => {
      const lineSubtotal = i.price * i.qty
      const lineFee = feeForTicket(i.price) * i.qty
      return { ...i, lineSubtotal, lineFee, lineTotal: lineSubtotal + lineFee }
    })

  const qty = lines.reduce((s, l) => s + l.qty, 0)
  const subtotal = lines.reduce((s, l) => s + l.lineSubtotal, 0)
  const serviceFee = lines.reduce((s, l) => s + l.lineFee, 0)

  return { qty, subtotal, serviceFee, total: subtotal + serviceFee, lines }
}

/** Turn TicketSelector's { early: 2, vip: 1 } into line items for an event. */
export function itemsFromQty(event, qtyMap = {}) {
  return (event?.tickets || [])
    .map((t) => ({ id: t.id, name: t.name, price: t.price, qty: qtyMap[t.id] || 0 }))
    .filter((i) => i.qty > 0)
}