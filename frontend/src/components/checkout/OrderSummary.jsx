import { Icon } from '../common/Icon'
import { etb } from '../../utils/money'
import { SERVICE_FEE } from '../../data/checkout'

/**
 * Shared by the details step and (later) the payment step.
 * The service fee is always its own line — never folded into the ticket price.
 */

export function OrderSummary({ draft, totals, children }) {
  return (
    <aside
      aria-label="Order summary"
      className="rounded-3xl border border-navy/10 bg-white p-5 shadow-xl shadow-navy/10 sm:p-6 dark:border-white/10 dark:bg-navy-2 dark:shadow-none"
    >
      <h2 className="font-heading text-lg font-bold">Order summary</h2>

      {/* Event */}
      <div className="mt-4 flex gap-3.5">
        <div
          className={`grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-linear-to-br ${
            draft.eventGrad || 'from-navy to-aqua'
          }`}
        >
          {draft.eventImage ? (
            <img src={draft.eventImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <Icon n="ticket" className="h-6 w-6 text-white" />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-heading font-bold leading-snug">{draft.eventTitle}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-mortar dark:text-white/60">
            <Icon n="calendar" className="h-3.5 w-3.5 shrink-0" />
            {draft.eventDate}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-mortar dark:text-white/60">
            <Icon n="pin" className="h-3.5 w-3.5 shrink-0" />
            {draft.eventVenue}, {draft.eventCity}
          </p>
        </div>
      </div>

      {/* Lines */}
      <ul className="mt-5 grid gap-2.5 border-t border-navy/10 pt-5 text-sm dark:border-white/10">
        {totals.lines.map((l) => (
          <li key={l.id} className="flex items-start justify-between gap-3">
            <span>
              <span className="font-medium">{l.name}</span>
              <span className="text-mortar dark:text-white/55"> × {l.qty}</span>
            </span>
            <span className="shrink-0 font-medium">{etb(l.lineSubtotal)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-4 grid gap-2.5 border-t border-navy/10 pt-4 text-sm dark:border-white/10">
        <div className="flex items-center justify-between">
          <dt className="text-mortar dark:text-white/60">Subtotal</dt>
          <dd className="font-medium">{etb(totals.subtotal)}</dd>
        </div>
        <div className="flex items-start justify-between gap-3">
          <dt className="text-mortar dark:text-white/60">
            {SERVICE_FEE.label}
            <span className="mt-0.5 block text-xs text-mortar/80 dark:text-white/40">{SERVICE_FEE.note}</span>
          </dt>
          <dd className="shrink-0 font-medium">{etb(totals.serviceFee)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-end justify-between border-t border-navy/10 pt-4 dark:border-white/10">
        <span className="font-bold">Total</span>
        <span className="font-heading text-2xl font-bold">{etb(totals.total)}</span>
      </div>

      {children}
    </aside>
  )
}