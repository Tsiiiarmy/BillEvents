import { Link } from 'react-router-dom'
import { Icon } from '../common/Icon'
import { Reveal } from '../common/Reveal'
import { Heading } from '../common/Heading'
import { categories } from '../../data'


/* ───────────── CATEGORIES ───────────── */
export function Categories() {
  return (
    <section id="categories" className="relative overflow-hidden bg-mist py-20 dark:bg-navy-3">
      <svg viewBox="0 0 400 120" fill="none" stroke="#6BD6DA" className="pointer-events-none absolute -right-10 top-6 hidden w-[28rem] opacity-60 sm:block" aria-hidden="true">
        {[0, 10, 20, 30].map((o) => <path key={o} className="animate-wave" strokeWidth="1.5" d={`M0 ${70 + o}C80 ${10 + o} 140 ${120 + o} 220 ${60 + o}S340 ${20 + o} 400 ${50 + o}`} />)}
      </svg>
      <div className="wrap relative">
        <Heading eyebrow="EXPLORE BY CATEGORY" title="Find Your Vibe" text="From music to culture, there's something for everyone." />
        <ul className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-8">
          {categories.map((c, i) => (
            <li key={c.name} className="shrink-0 snap-start">
              <Reveal delay={i * 60}>
                <Link to={`/events?category=${encodeURIComponent(c.name)}`} className="group flex w-24 flex-col items-center gap-3 text-center sm:w-auto">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-teal shadow-lg shadow-navy/10 ring-1 ring-navy/5 transition duration-300 group-hover:-translate-y-1.5 group-hover:bg-aqua group-hover:text-navy group-hover:shadow-aqua/50 dark:bg-navy-2 dark:text-aqua dark:ring-white/10 dark:group-hover:bg-aqua dark:group-hover:text-navy">
                    <Icon n={c.icon} className="h-8 w-8 transition duration-300 group-hover:scale-110" />
                  </span>
                  <span className="text-sm font-bold">{c.name}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}