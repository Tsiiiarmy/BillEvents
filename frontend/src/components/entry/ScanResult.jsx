import { Icon } from '../common/Icon'
import { OUTCOMES, TONES, RESULT_MS } from '../../data/entry'

/** Full-bleed verdict over the camera. Big enough to read at arm's length. */
export function ScanResult({ result, onDismiss }) {
  const out = OUTCOMES[result.kind] || OUTCOMES.invalid
  const tone = TONES[out.tone]
  const { order, ticket } = result

  return (
    <div
      role="alert"
      className={`animate-pop absolute inset-0 z-20 flex flex-col justify-between rounded-3xl p-6 text-center ${tone.panel}`}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-black/15">
          <Icon n={out.icon} className="h-11 w-11" />
        </span>

        <h2 className="mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl">
          {out.headline}
        </h2>
        <p className="mt-2 max-w-xs text-sm font-medium opacity-80">{out.sub}</p>

        {ticket && (
          <div className="mt-6 w-full max-w-xs rounded-2xl bg-black/10 p-4">
            <p className="font-heading text-lg font-bold leading-snug">
              {order.contact?.name || 'Ticket holder'}
            </p>
            <p className="mt-1 text-sm font-bold opacity-80">
              {ticket.tierName} · Ticket {ticket.seat}
            </p>
            <p className="mt-2 border-t border-current/20 pt-2 font-mono text-sm tracking-wider opacity-80">
              {ticket.code}
            </p>
            {result.kind === 'used' && ticket.checkedInAt && (
              <p className="mt-2 text-xs font-bold opacity-80">
                Scanned at{' '}
                {new Date(ticket.checkedInAt).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
            {result.kind === 'wrong_event' && (
              <p className="mt-2 text-xs font-bold opacity-80">Bought for {order.eventTitle}</p>
            )}
          </div>
        )}

        {!ticket && result.code && (
          <p className="mt-6 max-w-xs truncate rounded-xl bg-black/10 px-4 py-2 font-mono text-sm">
            {result.code}
          </p>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={onDismiss}
          className="w-full rounded-full bg-black/15 py-3.5 font-heading font-bold transition hover:bg-black/25"
        >
          Scan next
        </button>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-black/10">
          <div
            className={`countdown h-full rounded-full ${tone.bar}`}
            style={{ '--dur': `${RESULT_MS}ms` }}
          />
        </div>
      </div>
    </div>
  )
}