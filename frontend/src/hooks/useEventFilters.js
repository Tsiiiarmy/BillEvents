import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { allEvents } from '../data/events'

export const SORTS = [['soonest', 'Date: soonest'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low']]
export const PRICES = [['any', 'Any price'], ['0-499', 'Under 500 ETB'], ['500-1500', '500 – 1,500 ETB'], ['1501-', 'Over 1,500 ETB']]

const DEFAULTS = { q: '', category: 'All', city: 'All', price: 'any', sort: 'soonest' }

/**
 * All discovery logic lives here. Right now it filters sample data in the browser.
 * When the backend is ready, replace `allEvents` + the useMemo with an API request
 * that sends `filters` as query parameters. The pages won't need to change.
 */
export default function useEventFilters() {
  const [params, setParams] = useSearchParams()
  const filters = Object.fromEntries(Object.keys(DEFAULTS).map((k) => [k, params.get(k) ?? DEFAULTS[k]]))

  const setFilter = (key, value) =>
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      if (!value || value === DEFAULTS[key]) next.delete(key)
      else next.set(key, value)
      return next
    }, { replace: true })

  const clear = () => setParams({}, { replace: true })
  const hasFilters = ['q', 'category', 'city', 'price'].some((k) => filters[k] !== DEFAULTS[k])

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    const [min, max] = filters.price === 'any' ? [0, Infinity] : filters.price.split('-').map((n) => (n === '' ? Infinity : Number(n)))
    return allEvents
      .filter((e) => !q || [e.title, e.venue, e.city, e.cat, e.category].some((f) => f.toLowerCase().includes(q)))
      .filter((e) => filters.category === 'All' || e.category === filters.category)
      .filter((e) => filters.city === 'All' || e.city === filters.city)
      .filter((e) => e.price >= min && e.price <= max)
      .sort((a, b) =>
        filters.sort === 'price-asc' ? a.price - b.price
        : filters.sort === 'price-desc' ? b.price - a.price
        : a.start.localeCompare(b.start))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.q, filters.category, filters.city, filters.price, filters.sort])

  return { filters, setFilter, clear, hasFilters, results, total: allEvents.length }
}