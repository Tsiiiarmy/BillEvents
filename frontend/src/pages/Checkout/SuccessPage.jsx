import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { BillPay } from '../../components/common/Brand'
import { CheckoutHeader } from '../../components/checkout/CheckoutHeader'
import { OrderSummary } from '../../components/checkout/OrderSummary'
import { DigitalTicket } from '../../components/tickets/DigitalTicket'

import useOrders from '../../hooks/useOrders'
import { calcTotals, etb } from '../../utils/money'

const NEXT_STEPS = [
  ['ticket', 'Your tickets are ready', 'Every ticket below has its own code. One person, one code.'],
  ['phone', 'Bring your phone', 'Screenshot or save the codes so you are not relying on signal at the gate.'],
  ['scan', 'Scan at the entrance', 'Staff scan the QR and the ticket is marked as used. It only works once.'],
]

export default function SuccessPage({ theme, toggle }) {
  const { ref } = useParams()
  const { orders } = useOrders()
  const order = orders.find((o) => o.ref === ref) ?? null
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.title = order ? `Order ${order.ref} — BillEvents` : 'Order not found — BillEvents'
  }, [order])

  if (!order) {
    return (
      <div className="min-h-screen">
        <CheckoutHeader theme={theme} toggle={toggle} current="done" backTo="/events" backLabel="All events" />
        <main id="main" className="wrap grid min-h-[50vh] place-items-center py-20 text-center">
          <div className="max-w-sm">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-mortar dark:bg-navy-2 dark:text-white/60">
              <Icon n="alert" className="h-7 w-7" />
            </span>
            <h1 className="mt-5 font-heading text-3xl font-bold">We can’t find that order</h1>
            <p className="mt-3 text-mortar dark:text-white/70">
              Orders in this preview are stored in your browser only, so they disappear if you clear
              your site data or open a different browser.
            </p>
            <Btn as={Link} to="/events" variant="dark" className="mt-6">
              Browse events
            </Btn>
          </div>
        </main>
      </div>
    )
  }

  const totals = calcTotals(order.items)
  const paidOn = new Date(order.paidAt).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(order.ref)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the reference is on screen anyway */
    }
  }

  return (
    <div className="min-h-screen bg-mist dark:bg-navy-3">
      <CheckoutHeader theme={theme} toggle={toggle} current="done" backTo="/events" backLabel="All events" />

      <main id="main" className="wrap py-10 sm:py-14">
        {/* Confirmation */}
        <div className="text-center">
          <span className="animate-up mx-auto grid h-16 w-16 place-items-center rounded-full bg-aqua text-navy">
            <Icon n="check" className="h-8 w-8" />
          </span>
          <h1 className="animate-up mt-5 font-heading text-3xl font-bold sm:text-4xl">You’re going!</h1>
          <p className="mt-3 text-mortar dark:text-white/70">
            {order.quantity} {order.quantity === 1 ? 'ticket' : 'tickets'} for{' '}
            <span className="font-bold text-navy dark:text-white">{order.eventTitle}</span>.
          </p>

          <div className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl bg-white px-5 py-3 dark:bg-navy-2">
            <span className="text-sm text-mortar dark:text-white/60">Order reference</span>
            <span className="font-heading text-xl font-bold tracking-wide">{order.ref}</span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:underline dark:text-aqua"
            >
              <Icon n={copied ? 'check' : 'copy'} className="h-4 w-4" />
              <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {order.contact?.email && (
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-mortar dark:text-white/60">
              <Icon n="mail" className="h-4 w-4 shrink-0" />
              Once we have a backend, a copy goes to {order.contact.email}.
            </p>
          )}
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
          {/* Left: the tickets */}
          <div className="grid gap-6">
            <h2 className="font-heading text-2xl font-bold">
              Your {order.quantity === 1 ? 'ticket' : `${order.quantity} tickets`}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {order.tickets.map((t) => (
                <DigitalTicket key={t.code} order={order} ticket={t} />
              ))}
            </div>

            <section className="rounded-3xl bg-white p-5 sm:p-6 dark:bg-navy-2" aria-labelledby="next-h">
              <h2 id="next-h" className="font-heading text-lg font-bold">
                What happens next
              </h2>
              <ul className="mt-4 grid gap-4">
                {NEXT_STEPS.map(([ic, title, text]) => (
                  <li key={title} className="flex items-start gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-teal dark:bg-navy dark:text-aqua">
                      <Icon n={ic} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-heading font-bold">{title}</p>
                      <p className="mt-0.5 text-sm text-mortar dark:text-white/65">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <p className="flex items-start gap-2 text-xs text-mortar dark:text-white/55">
              <Icon n="info" className="h-4 w-4 shrink-0" />
              This is a preview build. No money was taken and these codes are not recognised by any
              real gate system.
            </p>
          </div>

          {/* Right: the receipt */}
          <div className="lg:sticky lg:top-36">
            <OrderSummary draft={order} totals={totals}>
              <dl className="mt-5 grid gap-2.5 border-t border-navy/10 pt-4 text-sm dark:border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-mortar dark:text-white/60">Paid with</dt>
                  <dd className="font-medium">{order.method?.name || '—'}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-mortar dark:text-white/60">Paid on</dt>
                  <dd className="font-medium">{paidOn}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-mortar dark:text-white/60">Amount</dt>
                  <dd className="font-medium">{etb(order.total)}</dd>
                </div>
              </dl>

              <Btn as={Link} to="/events" variant="dark" className="mt-5 w-full py-3.5 text-base">
                Browse more events <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
              </Btn>

              <p className="mt-3 text-center text-xs text-mortar dark:text-white/55">
                My Tickets, where every ticket you buy is kept, is the next stage.
              </p>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-mortar dark:text-white/60">
                Paid securely with <BillPay theme={theme} className="h-4" />
              </p>
            </OrderSummary>
          </div>
        </div>
      </main>
    </div>
  )
}