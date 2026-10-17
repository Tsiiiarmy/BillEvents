import { Icon } from '../common/Icon'
import useQrCode from '../../hooks/useQrCode'
import useLanguage from '../../hooks/useLanguage'
import { ticketPayload } from '../../utils/qr'
import { TICKET_STATUS } from '../../data/checkout'

/** Status colours. Never colour alone — every badge carries an icon and a word. */
const TONE = {
  valid: 'bg-aqua/15 text-teal dark:bg-aqua/15 dark:text-aqua',
  used: 'bg-navy/10 text-mortar dark:bg-white/10 dark:text-white/65',
  expired: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  void: 'bg-red-500/15 text-red-700 dark:text-red-300',
}

/**
 * One stub per seat. The `notch` classes must match the background the
 * ticket sits on, otherwise the perforation bites look like grey dots.
 */
export function DigitalTicket({ order, ticket, notch = 'bg-mist dark:bg-navy-3' }) {
  const { t } = useLanguage()
  const payload = ticketPayload(order, ticket)
  const { src, error } = useQrCode(payload, 320)

  const statusKey = TICKET_STATUS[ticket.status] ? ticket.status : 'valid'
  const status = TICKET_STATUS[statusKey]
  const [day, time] = (order.eventDate || '').split(' · ')

  // Saved tickets store "1 of 2" in English — rebuild it in the current language.
  const m = /^(\d+) of (\d+)$/.exec(ticket.seat || '')
  const seat = m ? t('tk.seatOf', { n: m[1], total: m[2] }) : ticket.seat

  const [orderBefore, orderAfter = ''] = t('tk.order').split('{ref}')

  return (
    <article className="overflow-hidden rounded-3xl shadow-xl shadow-navy/10 dark:shadow-none">
      {/* Top: the event */}
      <div className={`relative isolate bg-linear-to-br ${order.eventGrad || 'from-navy to-aqua'} p-5 text-white sm:p-6`}>
        {order.eventImage && (
          <>
            <img src={order.eventImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy/90 via-navy/65 to-navy/45" />
          </>
        )}

        <div className="flex items-start justify-between gap-3">
          {/* Tier name is the organizer's text — not translated */}
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy">{ticket.tierName}</span>
          <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-bold backdrop-blur">{seat}</span>
        </div>

        <h3 className="mt-4 font-heading text-xl font-bold leading-snug sm:text-2xl">{order.eventTitle}</h3>

        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <dt className="sr-only">{t('event.date')}</dt>
            <Icon n="calendar" className="h-4 w-4 shrink-0 text-aqua" />
            <dd>{day}</dd>
          </div>
          {time && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">{t('event.time')}</dt>
              <Icon n="clock" className="h-4 w-4 shrink-0 text-aqua" />
              <dd>{time}</dd>
            </div>
          )}
          <div className="flex items-start gap-2">
            <dt className="sr-only">{t('event.venue')}</dt>
            <Icon n="pin" className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
            <dd>
              {order.eventVenue}, {order.eventCity}
            </dd>
          </div>
        </dl>
      </div>

      {/* Bottom: the scannable half */}
      <div className="relative bg-white px-5 pb-6 pt-8 sm:px-6 dark:bg-navy-2">
        {/* Perforation */}
        <span aria-hidden="true" className={`absolute -left-3 -top-3 h-6 w-6 rounded-full ${notch}`} />
        <span aria-hidden="true" className={`absolute -right-3 -top-3 h-6 w-6 rounded-full ${notch}`} />
        <span
          aria-hidden="true"
          className="absolute left-6 right-6 top-0 border-t-2 border-dashed border-navy/20 dark:border-white/25"
        />

        <div className="grid place-items-center text-center">
          <div className="rounded-2xl bg-white p-3 ring-1 ring-navy/10 dark:ring-white/20">
            {src ? (
              <img
                src={src}
                alt={t('tk.qrAlt', { code: ticket.code })}
                width={176}
                height={176}
                className="h-44 w-44"
              />
            ) : (
              <div className="grid h-44 w-44 place-items-center rounded-xl bg-navy/5 text-mortar">
                {error ? (
                  <span className="px-4 text-xs">{t('tk.qrError')}</span>
                ) : (
                  <Icon n="qr" className="h-10 w-10 animate-pulse motion-reduce:animate-none" />
                )}
              </div>
            )}
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-mortar dark:text-white/60">
            <Icon n="scan" className="h-4 w-4" />
            {t('tk.scanHere')}
          </p>

          <p className="mt-4 text-xs text-mortar dark:text-white/55">{t('tk.number')}</p>
          <p className="font-mono text-lg font-bold tracking-widest">{ticket.code}</p>

          <span
            className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${TONE[statusKey]}`}
          >
            <Icon n={status.icon} className="h-3.5 w-3.5" />
            {t(`tstatus.${statusKey}`, null, status.label)}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-navy/10 pt-4 text-xs dark:border-white/10">
          <p className="text-mortar dark:text-white/55">
            {orderBefore}
            <span className="font-bold">{order.ref}</span>
            {orderAfter}
          </p>
          {src && (
            <a
              href={src}
              download={`billevents-${ticket.code}.png`}
              className="inline-flex items-center gap-1.5 font-bold text-teal hover:underline dark:text-aqua"
            >
              <Icon n="download" className="h-4 w-4" />
              {t('tk.save')}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}