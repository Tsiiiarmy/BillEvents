import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon } from '../common/Icon'
import { Btn } from '../common/Btn'
import useCheckout from '../../hooks/useCheckout'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { MAX_PER_TIER, SERVICE_FEE } from '../../data/checkout'
import { calcTotals, itemsFromQty, etb } from '../../utils/money'

export function TicketSelector({ event }) {
  const [qty, setQty] = useState({})
  const navigate = useNavigate()
  const { startCheckout } = useCheckout()
  const { isSignedIn } = useAuth()
  const { t } = useLanguage()

  const change = (id, d) =>
    setQty((q) => ({ ...q, [id]: Math.min(MAX_PER_TIER, Math.max(0, (q[id] || 0) + d)) }))

  const items = itemsFromQty(event, qty)
  const { qty: count, subtotal, serviceFee, total } = calcTotals(items)

  const go = () => {
    startCheckout(event, items)
    // Not signed in? Sign in first, then land straight back on checkout.
    navigate(isSignedIn ? '/checkout' : '/signin?next=/checkout')
  }

  const stepper =
    'grid h-9 w-9 place-items-center rounded-full border border-navy/20 transition hover:bg-navy/10 disabled:opacity-30 disabled:hover:bg-transparent dark:border-white/25 dark:hover:bg-white/10'

  return (
    <div className="rounded-3xl border border-navy/10 bg-white p-5 shadow-xl shadow-navy/10 sm:p-6 dark:border-white/10 dark:bg-navy-2 dark:shadow-none">
      <h2 className="font-heading text-xl font-bold">{t('sel.title')}</h2>
      <p className="mt-1 text-sm text-mortar dark:text-white/60">{t('sel.limit', { max: MAX_PER_TIER })}</p>

      <ul className="mt-5 grid gap-3">
        {event.tickets.map((tier) => {
          const n = qty[tier.id] || 0
          return (
            <li
              key={tier.id}
              className={`flex items-center justify-between gap-3 rounded-2xl border p-4 transition ${
                n ? 'border-aqua bg-aqua/10' : 'border-navy/10 dark:border-white/15'
              }`}
            >
              {/* Tier name and note are the organizer's text — not translated */}
              <div className="min-w-0">
                <p className="font-heading font-bold">{tier.name}</p>
                <p className="text-xs text-mortar dark:text-white/60">{tier.note}</p>
                <p className="mt-1 text-sm font-bold">{tier.price ? etb(tier.price) : t('card.free')}</p>
              </div>
              <div
                className="flex items-center gap-2.5"
                role="group"
                aria-label={t('sel.qtyGroup', { name: tier.name })}
              >
                <button
                  type="button"
                  onClick={() => change(tier.id, -1)}
                  disabled={n === 0}
                  aria-label={t('sel.remove', { name: tier.name })}
                  className={stepper}
                >
                  <Icon n="minus" className="h-4 w-4" />
                </button>
                <span className="w-5 text-center font-bold" aria-live="polite">
                  {n}
                </span>
                <button
                  type="button"
                  onClick={() => change(tier.id, 1)}
                  disabled={n === MAX_PER_TIER}
                  aria-label={t('sel.add', { name: tier.name })}
                  className={stepper}
                >
                  <Icon n="plus" className="h-4 w-4" />
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-5 grid gap-2 border-t border-navy/10 pt-5 text-sm dark:border-white/10">
        <div className="flex items-center justify-between gap-3">
          <span className="text-mortar dark:text-white/60">
            {t(count === 1 ? 'sel.count.one' : 'sel.count.other', { count })}
          </span>
          <span className="font-medium">{etb(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-mortar dark:text-white/60">{t('fee.label', null, SERVICE_FEE.label)}</span>
          <span className="font-medium">{etb(serviceFee)}</span>
        </div>
        <div className="mt-1 flex items-end justify-between gap-3 border-t border-navy/10 pt-3 dark:border-white/10">
          <span className="font-bold">{t('sel.total')}</span>
          <span className="font-heading text-2xl font-bold">{etb(total)}</span>
        </div>
      </div>

      <Btn
        type="button"
        disabled={!count}
        onClick={go}
        className="mt-4 w-full bg-aqua py-3.5 text-base text-navy disabled:pointer-events-none disabled:opacity-40"
      >
        {t('sel.continue')} <Icon n="arrow" className="h-4 w-4" />
      </Btn>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-mortar dark:text-white/60">
        <Icon n="shield" className="h-4 w-4" />
        {t('sel.secure')}
      </p>
    </div>
  )
}