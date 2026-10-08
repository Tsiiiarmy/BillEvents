import { useState } from 'react'
import { Icon } from '../common/Icon'
import { Btn } from '../common/Btn'

const MAX = 6

export function TicketSelector({ event }) {
  const [qty, setQty] = useState({})
  const [soon, setSoon] = useState(false)
  const change = (id, d) => {
    setSoon(false)
    setQty((q) => ({ ...q, [id]: Math.min(MAX, Math.max(0, (q[id] || 0) + d)) }))
  }
  const count = Object.values(qty).reduce((a, b) => a + b, 0)
  const total = event.tickets.reduce((s, t) => s + (qty[t.id] || 0) * t.price, 0)
  const stepper = 'grid h-9 w-9 place-items-center rounded-full border border-navy/20 transition hover:bg-navy/10 disabled:opacity-30 disabled:hover:bg-transparent dark:border-white/25 dark:hover:bg-white/10'

  return (
    <div className="rounded-3xl border border-navy/10 bg-white p-5 shadow-xl shadow-navy/10 sm:p-6 dark:border-white/10 dark:bg-navy-2 dark:shadow-none">
      <h2 className="font-heading text-xl font-bold">Choose your tickets</h2>
      <p className="mt-1 text-sm text-mortar dark:text-white/60">Up to {MAX} per ticket type.</p>

      <ul className="mt-5 grid gap-3">
        {event.tickets.map((t) => {
          const n = qty[t.id] || 0
          return (
            <li key={t.id} className={`flex items-center justify-between gap-3 rounded-2xl border p-4 transition ${n ? 'border-aqua bg-aqua/10' : 'border-navy/10 dark:border-white/15'}`}>
              <div className="min-w-0">
                <p className="font-heading font-bold">{t.name}</p>
                <p className="text-xs text-mortar dark:text-white/60">{t.note}</p>
                <p className="mt-1 text-sm font-bold">{t.price.toLocaleString()} ETB</p>
              </div>
              <div className="flex items-center gap-2.5" role="group" aria-label={`${t.name} quantity`}>
                <button type="button" onClick={() => change(t.id, -1)} disabled={n === 0} aria-label={`Remove one ${t.name} ticket`} className={stepper}><Icon n="minus" className="h-4 w-4" /></button>
                <span className="w-5 text-center font-bold" aria-live="polite">{n}</span>
                <button type="button" onClick={() => change(t.id, 1)} disabled={n === MAX} aria-label={`Add one ${t.name} ticket`} className={stepper}><Icon n="plus" className="h-4 w-4" /></button>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-5 border-t border-navy/10 pt-5 dark:border-white/10">
        <p className="text-sm text-mortar dark:text-white/60">{count} {count === 1 ? 'ticket' : 'tickets'}</p>
        <p className="font-heading text-2xl font-bold">{total.toLocaleString()} ETB</p>
      </div>

      <Btn type="button" disabled={!count} onClick={() => setSoon(true)} className="mt-4 w-full bg-aqua py-3.5 text-base text-navy disabled:pointer-events-none disabled:opacity-40">
        Continue to Checkout <Icon n="arrow" className="h-4 w-4" />
      </Btn>
      {soon && <p role="status" className="mt-3 rounded-xl bg-mist p-3 text-sm text-mortar dark:bg-navy dark:text-white/70">The checkout page isn’t built yet. It’s the next step in the journey.</p>}
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-mortar dark:text-white/60"><Icon n="shield" className="h-4 w-4" />Secure payment with BillPay</p>
    </div>
  )
}