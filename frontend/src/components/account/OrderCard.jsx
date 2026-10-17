import { Link } from 'react-router-dom'

import { Icon } from '../common/Icon'
import useLanguage from '../../hooks/useLanguage'
import { etb } from '../../utils/money'
import { whenLabel, isHappeningNow } from '../../utils/datetime'

export function OrderCard({ order, past = false }) {
  const { t } = useLanguage()
  const [day, time] = (order.eventDate || '').split(' · ')
  const when = whenLabel(order)
  const live = isHappeningNow(order)
  const used = order.tickets.filter((tk) => tk.status === 'used').length

  const count = t(order.quantity === 1 ? 'sel.count.one' : 'sel.count.other', { count: order.quantity })
  const [orderBefore, orderAfter = ''] = t('tk.order').split('{ref}')

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-navy/5 transition hover:-translate-y-0.5 dark:bg-navy-2 dark:shadow-none">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-5 sm:p-5">
        {/* Thumbnail */}
        <div
          className={`relative grid h-28 shrink-0 place-items-center overflow-hidden rounded-2xl bg-linear-to-br sm:h-24 sm:w-32 ${
            order.eventGrad || 'from-navy to-aqua'
          } ${past ? 'opacity-60 grayscale' : ''}`}
        >
          {order.eventImage ? (
            <img src={order.eventImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <Icon n="ticket" className="h-8 w-8 text-white" />
          )}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {when && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                  live
                    ? 'bg-aqua text-navy'
                    : past
                      ? 'bg-navy/10 text-mortar dark:bg-white/10 dark:text-white/60'
                      : 'bg-aqua/15 text-teal dark:text-aqua'
                }`}
              >
                <Icon n={live ? 'scan' : 'clock'} className="h-3.5 w-3.5" />
                {when}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/10 px-2.5 py-1 text-xs font-bold text-mortar dark:bg-white/10 dark:text-white/65">
              <Icon n="ticket" className="h-3.5 w-3.5" />
              {count}
              {used > 0 && t('oc.checkedIn', { n: used })}
            </span>
          </div>

          <h3 className="mt-2 font-heading text-lg font-bold leading-snug">{order.eventTitle}</h3>

          <div className="mt-2 grid gap-1 text-sm text-mortar dark:text-white/60">
            <p className="flex items-center gap-1.5">
              <Icon n="calendar" className="h-4 w-4 shrink-0" />
              {day}
              {time && ` · ${time}`}
            </p>
            <p className="flex items-start gap-1.5">
              <Icon n="pin" className="mt-0.5 h-4 w-4 shrink-0" />
              {order.eventVenue}, {order.eventCity}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-navy/10 px-4 py-3.5 sm:px-5 dark:border-white/10">
        <p className="text-xs text-mortar dark:text-white/55">
          {orderBefore}
          <span className="font-bold">{order.ref}</span>
          {orderAfter} · {etb(order.total)}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to={`/checkout/success/${order.ref}`}
            className="text-sm font-bold text-mortar hover:underline dark:text-white/65"
          >
            {t('oc.receipt')}
          </Link>
          <Link
            to={`/account/tickets/${order.ref}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-aqua px-4 py-2 text-sm font-bold text-navy transition hover:-translate-y-0.5"
          >
            <Icon n="qr" className="h-4 w-4" />
            {past ? t('oc.view') : t('oc.show')}
          </Link>
        </div>
      </div>
    </article>
  )
}