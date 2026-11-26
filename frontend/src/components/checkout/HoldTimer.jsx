import { useEffect, useState } from 'react'
import { Icon } from '../common/Icon'
import { CHECKOUT_TTL_MINUTES } from '../../data/checkout'
import useLanguage from '../../hooks/useLanguage'

const TTL_MS = CHECKOUT_TTL_MINUTES * 60_000
const WARN_MS = 5 * 60_000


export function HoldTimer({ startedAt }) {
  const { t } = useLanguage()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const left = Math.max(0, new Date(startedAt).getTime() + TTL_MS - now)
  const mm = Math.floor(left / 60_000)
  const ss = String(Math.floor((left % 60_000) / 1000)).padStart(2, '0')
  const low = left <= WARN_MS

  return (
    <p
      role="timer"
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
        low
          ? 'bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200'
          : 'bg-mist text-navy dark:bg-white/10 dark:text-white'
      }`}
    >
      <Icon n={low ? 'alert' : 'clock'} className="h-4 w-4" />
      {t('co.holdFor', null, 'Tickets held for')}
      <span className="font-mono tabular-nums">
        {mm}:{ss}
      </span>
    </p>
  )
}