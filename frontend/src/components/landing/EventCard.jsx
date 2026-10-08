import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../common/Icon'
import { Btn } from '../common/Btn'
import { Reveal } from '../common/Reveal'

export function EventCard({ e, i = 0 }) {
  const [fav, setFav] = useState(false)
  return (
    <Reveal delay={i * 90}>
      <article className="group overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-md shadow-navy/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy/15 dark:border-white/10 dark:bg-navy-2 dark:shadow-none dark:hover:shadow-[0_24px_50px_-24px_rgba(107,214,218,.4)]">
        <div className="relative h-44 overflow-hidden">
          <div className={`absolute inset-0 bg-linear-to-br ${e.grad} transition duration-700 group-hover:scale-110`}>
            {e.image && <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover" />}
          </div>
          {!e.image && <Icon n={e.icon} className="absolute -bottom-5 -right-3 h-36 w-36 text-white/20 transition duration-700 group-hover:-rotate-6 group-hover:scale-110" />}
          <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-navy">{e.cat}</span>
          <button onClick={() => setFav(!fav)} aria-pressed={fav} aria-label={`Save ${e.title}`} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy transition hover:scale-110 active:scale-90">
            <Icon n="heart" className={`h-4 w-4 transition ${fav ? 'scale-125 fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
        <div className="p-5">
          <p className="flex items-center gap-1.5 text-xs text-mortar dark:text-white/60"><Icon n="calendar" className="h-3.5 w-3.5" />{e.date}</p>
          <h3 className="mt-2 font-heading text-lg font-bold leading-snug">
            <Link to={`/events/${e.id}`} className="transition hover:text-teal dark:hover:text-aqua">{e.title}</Link>
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-mortar dark:text-white/60"><Icon n="pin" className="h-3.5 w-3.5 shrink-0" />{e.venue}, {e.city}</p>
          <p className="mt-3 text-sm">From <b className="font-heading">{e.price.toLocaleString()} ETB</b></p>
          <Btn as={Link} to={`/events/${e.id}`} className="mt-4 w-full bg-aqua text-navy">Get Tickets <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
        </div>
      </article>
    </Reveal>
  )
}