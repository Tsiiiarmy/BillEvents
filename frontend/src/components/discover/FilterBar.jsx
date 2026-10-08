import { Icon } from '../common/Icon'
import { categories } from '../../data'
import { cities } from '../../data/events'
import { SORTS, PRICES } from '../../hooks/useEventFilters'

function Select({ label, value, onChange, options }) {
  return (
    <label className="grid gap-1.5 text-xs font-bold">
      <span className="text-mortar dark:text-white/60">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer rounded-xl border border-navy/15 bg-white px-3 py-2.5 text-sm font-medium transition focus:border-aqua dark:border-white/15 dark:bg-navy [&>option]:text-navy">
        {options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
      </select>
    </label>
  )
}

export function FilterBar({ filters, setFilter }) {
  return (
    <div className="relative z-10 -mt-10 rounded-3xl border border-navy/10 bg-white p-4 shadow-xl shadow-navy/10 sm:p-6 dark:border-white/10 dark:bg-navy-2 dark:shadow-none">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 rounded-full border border-navy/15 bg-mist px-4 transition focus-within:border-aqua focus-within:ring-4 focus-within:ring-aqua/30 dark:border-white/15 dark:bg-navy">
        <Icon n="search" className="h-5 w-5 shrink-0 text-mortar dark:text-white/60" />
        <input id="event-search" type="text" value={filters.q} onChange={(e) => setFilter('q', e.target.value)}
          aria-label="Search events, artists, venues" placeholder="Search events, artists, venues..."
          className="min-w-0 flex-1 bg-transparent py-3.5 outline-none placeholder:text-mortar/60 dark:placeholder:text-white/40" />
        {filters.q && (
          <button type="button" aria-label="Clear search" onClick={() => setFilter('q', '')} className="icon-btn h-8 w-8"><Icon n="x" className="h-4 w-4" /></button>
        )}
      </form>

      <div role="group" aria-label="Filter by category" className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {[{ name: 'All', icon: 'globe' }, ...categories].map((c) => {
          const on = filters.category === c.name
          return (
            <button key={c.name} aria-pressed={on} onClick={() => setFilter('category', c.name)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${on ? 'border-transparent bg-navy text-white dark:bg-aqua dark:text-navy' : 'border-navy/15 hover:border-aqua hover:bg-aqua/15 dark:border-white/20'}`}>
              <Icon n={c.icon} className="h-4 w-4" />{c.name}
            </button>
          )
        })}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Select label="City" value={filters.city} onChange={(v) => setFilter('city', v)} options={[['All', 'All cities'], ...cities.map((c) => [c, c])]} />
        <Select label="Price" value={filters.price} onChange={(v) => setFilter('price', v)} options={PRICES} />
        <Select label="Sort by" value={filters.sort} onChange={(v) => setFilter('sort', v)} options={SORTS} />
      </div>
    </div>
  )
}