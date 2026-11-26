import { isPastDate } from './datetime'

const time = (e) => {
  const t = new Date(e.start).getTime()
  return Number.isNaN(t) ? Infinity : t
}

/** Events that fit a mood: upcoming first (soonest first), then past ones. */
export function pickForPlan(plan, events, n = 3) {
  const fits = (e) =>
    plan.cats ? plan.cats.includes(e.cat) : Number(e.price || 0) <= plan.maxPrice

  return events
    .filter(fits)
    .map((e) => ({ e, past: isPastDate(e.start), t: time(e) }))
    .sort((a, b) => a.past - b.past || a.t - b.t)
    .slice(0, n)
    .map((x) => x.e)
}