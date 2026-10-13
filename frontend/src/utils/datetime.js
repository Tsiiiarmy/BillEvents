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

export function isPastEvent(order) {
  const t = toTime(order?.eventStart)
  if (t === null) return false // unknown date → keep it visible
  return t + GRACE_HOURS * 3_600_000 < Date.now()
}

/** "In 11 days", "Tomorrow", "Today", "Happening now", "3 weeks ago". */
export function whenLabel(order) {
  const t = toTime(order?.eventStart)
  if (t === null) return ''

  const diff = t - Date.now()
  const day = 86_400_000

  if (diff < 0 && diff > -GRACE_HOURS * 3_600_000) return 'Happening now'

  const days = Math.round(diff / day)
  if (days === 0) return diff > 0 ? 'Today' : 'Earlier today'
  if (days === 1) return 'Tomorrow'
  if (days === -1) return 'Yesterday'
  if (days > 1 && days < 14) return `In ${days} days`
  if (days >= 14) {
    const weeks = Math.round(days / 7)
    return weeks < 9 ? `In ${weeks} weeks` : `In ${Math.round(days / 30)} months`
  }
  const ago = Math.abs(days)
  if (ago < 14) return `${ago} days ago`
  const weeks = Math.round(ago / 7)
  return weeks < 9 ? `${weeks} weeks ago` : `${Math.round(ago / 30)} months ago`
}

/** Sort newest-first for past events, soonest-first for upcoming. */
export const byStart = (dir = 1) => (a, b) =>
  dir * ((toTime(a.eventStart) ?? 0) - (toTime(b.eventStart) ?? 0))