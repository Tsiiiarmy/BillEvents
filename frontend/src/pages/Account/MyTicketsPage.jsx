import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { AccountLayout } from '../../components/account/AccountLayout'
import { OrderCard } from '../../components/account/OrderCard'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'

import useOrders from '../../hooks/useOrders'
import { isPastEvent, byStart } from '../../utils/datetime'

export default function MyTicketsPage({ theme, toggle }) {
  const { orders } = useOrders()
  const [tab, setTab] = useState('upcoming')

  useEffect(() => {
    document.title = 'My Tickets — BillEvents'
  }, [])

  const upcoming = orders.filter((o) => !isPastEvent(o)).sort(byStart(1))
  const past = orders.filter(isPastEvent).sort(byStart(-1))
  const shown = tab === 'upcoming' ? upcoming : past

  const tabs = [
    ['upcoming', 'Upcoming', upcoming.length],
    ['past', 'Past', past.length],
  ]

  return (
    <AccountLayout
      theme={theme}
      toggle={toggle}
      title="My Tickets"
      lead="Every ticket you've bought, with its QR code ready for the gate."
    >
      <div
        role="tablist"
        aria-label="Ticket filter"
        className="inline-flex rounded-full bg-white p-1 dark:bg-navy-2"
      >
        {tabs.map(([id, label, count]) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            aria-controls="tickets-panel"
            onClick={() => setTab(id)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              tab === id
                ? 'bg-navy text-white dark:bg-aqua dark:text-navy'
                : 'text-mortar hover:text-navy dark:text-white/60 dark:hover:text-white'
            }`}
          >
            {label} <span className="font-normal opacity-70">({count})</span>
          </button>
        ))}
      </div>

      <div id="tickets-panel" role="tabpanel" className="mt-6">
        {shown.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center dark:bg-navy-2">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-mortar dark:bg-navy dark:text-white/60">
              <Icon n="ticket" className="h-7 w-7" />
            </span>
            <h2 className="mt-5 font-heading text-xl font-bold">
              {tab === 'upcoming' ? 'No upcoming tickets' : 'Nothing here yet'}
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-mortar dark:text-white/65">
              {tab === 'upcoming'
                ? 'When you buy a ticket it lands here, ready to scan at the entrance.'
                : 'Events you have already been to will show up here afterwards.'}
            </p>
            {tab === 'upcoming' && (
              <Btn as={Link} to="/events" variant="dark" className="mt-6">
                Find an event <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
              </Btn>
            )}
          </div>
        ) : (
          <div className="grid gap-5">
            {shown.map((o) => (
              <OrderCard key={o.ref} order={o} past={tab === 'past'} />
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <p className="mt-6 flex items-start gap-2 text-xs text-mortar dark:text-white/55">
            <Icon n="info" className="h-4 w-4 shrink-0" />
            Preview build: your orders live in this browser only. They will move to your real account
            once the backend exists.
          </p>
        )}
      </div>
    </AccountLayout>
  )
}