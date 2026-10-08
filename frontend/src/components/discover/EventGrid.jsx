import { useEffect, useState } from 'react'
import { Icon } from '../common/Icon'
import { Btn } from '../common/Btn'
import { EventCard } from '../landing/EventCard'

const PAGE_SIZE = 8

export function EventGrid({ events, onClear }) {
  const [shown, setShown] = useState(PAGE_SIZE)
  useEffect(() => setShown(PAGE_SIZE), [events]) // go back to the first page whenever filters change

  if (!events.length) {
    return (
      <div className="grid place-items-center rounded-3xl border border-dashed border-navy/20 px-6 py-20 text-center dark:border-white/20">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-mist text-teal dark:bg-navy-2 dark:text-aqua"><Icon n="search" className="h-7 w-7" /></span>
        <h2 className="mt-5 font-heading text-2xl font-bold">No events found</h2>
        <p className="mt-2 max-w-sm text-mortar dark:text-white/70">Try a different search or remove some filters.</p>
        <Btn variant="dark" className="mt-6" onClick={onClear}>Clear all filters</Btn>
      </div>
    )
  }

  const visible = events.slice(0, shown)
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((e, i) => <EventCard key={e.id} e={e} i={i % 4} />)}
      </div>
      <div className="mt-10 text-center">
        <p className="text-sm text-mortar dark:text-white/60">Showing {visible.length} of {events.length}</p>
        {shown < events.length && <Btn variant="dark" className="mt-4" onClick={() => setShown((s) => s + PAGE_SIZE)}>Load more events</Btn>}
      </div>
    </>
  )
}