import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { AccountLayout } from '../../components/account/AccountLayout'
import { DigitalTicket } from '../../components/tickets/DigitalTicket'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'

import useOrders from '../../hooks/useOrders'
import { whenLabel } from '../../utils/datetime'

export default function TicketViewPage({ theme, toggle }) {
  const { ref } = useParams()
  const { orders } = useOrders()
  const order = orders.find((o) => o.ref === ref) ?? null

  useEffect(() => {
    document.title = order ? `${order.eventTitle} — My Tickets` : 'Ticket not found — BillEvents'
  }, [order])

  if (!order) {
    return (
      <AccountLayout theme={theme} toggle={toggle} title="Ticket not found">
        <div className="rounded-3xl bg-white p-10 text-center dark:bg-navy-2">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-mortar dark:bg-navy dark:text-white/60">
            <Icon n="alert" className="h-7 w-7" />
          </span>
          <p className="mx-auto mt-5 max-w-sm text-mortar dark:text-white/70">
            We can’t find an order with that reference in this browser.
          </p>
          <Btn as={Link} to="/account/tickets" variant="dark" className="mt-6">
            Back to My Tickets
          </Btn>
        </div>
      </AccountLayout>
    )
  }

  const when = whenLabel(order)

  return (
    <AccountLayout theme={theme} toggle={toggle} title={order.eventTitle}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/account/tickets"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:underline dark:text-aqua"
        >
          <Icon n="arrowleft" className="h-4 w-4" />
          All tickets
        </Link>
        {when && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold dark:bg-navy-2">
            <Icon n="clock" className="h-3.5 w-3.5" />
            {when}
          </span>
        )}
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-2xl bg-white p-4 text-sm text-mortar dark:bg-navy-2 dark:text-white/65">
        <Icon n="scan" className="mt-0.5 h-4 w-4 shrink-0 text-teal dark:text-aqua" />
        Each ticket admits one person and works once. Turn your screen brightness up before you reach
        the gate.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {order.tickets.map((t) => (
          <DigitalTicket key={t.code} order={order} ticket={t} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 text-sm dark:bg-navy-2">
        <p className="text-mortar dark:text-white/60">
          Order <span className="font-bold">{order.ref}</span>
        </p>
        <Link
          to={`/checkout/success/${order.ref}`}
          className="font-bold text-teal hover:underline dark:text-aqua"
        >
          View receipt
        </Link>
      </div>
    </AccountLayout>
  )
}