import { translate, getLang } from '../hooks/useLanguage'

/**
 * Upcoming vs past. The grace period means an event that started this
 * evening still counts as upcoming while it is actually happening —
 * otherwise someone's ticket moves to "Past" while they are queueing.
 */
const GRACE_HOURS = 6

const toTime = (iso) => {
  const t = new Date(iso).getTime()
  return Number.isNaN(t) ? null : t
}

/** Works on any ISO date string, e.g. an event's `start`. */
export function isPastDate(iso) {
  const t = toTime(iso)
  if (t === null) return false // unknown date → keep it visible
  return t + GRACE_HOURS * 3_600_000 < Date.now()
}

export function isPastEvent(order) {
  return isPastDate(order?.eventStart)
}

/**
 * The language-neutral part: which phrase, and the number for it.
 * → { key: 'when.inDays', n: 11 } or null when there's no start date.
 */
export function whenParts(order) {
  const t = toTime(order?.eventStart)
  if (t === null) return null

  const diff = t - Date.now()
  const day = 86_400_000

  if (diff < 0 && diff > -GRACE_HOURS * 3_600_000) return { key: 'when.now' }

  const days = Math.round(diff / day)
  if (days === 0) return { key: diff > 0 ? 'when.today' : 'when.earlierToday' }
  if (days === 1) return { key: 'when.tomorrow' }
  if (days === -1) return { key: 'when.yesterday' }
  if (days > 1 && days < 14) return { key: 'when.inDays', n: days }
  if (days >= 14) {
    const weeks = Math.round(days / 7)
    return weeks < 9 ? { key: 'when.inWeeks', n: weeks } : { key: 'when.inMonths', n: Math.round(days / 30) }
  }
  const ago = Math.abs(days)
  if (ago < 14) return { key: 'when.daysAgo', n: ago }
  const weeks = Math.round(ago / 7)
  return weeks < 9 ? { key: 'when.weeksAgo', n: weeks } : { key: 'when.monthsAgo', n: Math.round(ago / 30) }
}

/** "In 11 days", "Tomorrow", "Happening now"… in the current language. */
export function whenLabel(order) {
  const p = whenParts(order)
  return p ? translate(getLang(), p.key, { n: p.n }) : ''
}

/** True while the event is on (between its start and the grace period). */
export function isHappeningNow(order) {
  return whenParts(order)?.key === 'when.now'
}

/** Sort newest-first for past events, soonest-first for upcoming. */
export const byStart = (dir = 1) => (a, b) =>
  dir * ((toTime(a.eventStart) ?? 0) - (toTime(b.eventStart) ?? 0))