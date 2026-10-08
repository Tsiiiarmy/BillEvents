import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { Icon } from '../common/Icon'
import { events } from '../../data'
import heroImg from '../../assets/images/hero-addis-concert.jpg'

/* ───────────── HERO ───────────── */
export function Hero() {
  const navigate = useNavigate()
  const ref = useRef(null)
  useEffect(() => { // subtle parallax: only the photo layer moves
    const f = () => ref.current?.style.setProperty('--py', `${Math.min(window.scrollY, 600) * 0.25}px`)
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const feat = events[0]
  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden bg-navy text-white">
      <div className="absolute inset-x-0 -top-10 -z-20 h-[120%]" style={{ transform: 'translateY(var(--py,0px))' }}>
        <img src={heroImg} alt="A huge crowd lighting up the night with phone lights at a live concert in Addis Ababa" className="kenburns h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/80 to-navy/25" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy/70 via-transparent to-navy/30" />
      <div className="animate-drift absolute -left-24 top-10 -z-10 h-96 w-96 rounded-full bg-aqua/25 blur-3xl" />
      <div className="wrap grid min-h-[620px] items-center gap-10 pb-40 pt-16 lg:grid-cols-[1.15fr_.85fr] lg:pt-20">
        <div>
          <p className="animate-up text-xs font-bold tracking-[0.25em] text-aqua">DISCOVER • BOOK • EXPERIENCE</p>
          <h1 className="animate-up mt-5 font-heading text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl" style={{ animationDelay: '.12s' }}>
            Unforgettable moments, <span className="text-aqua">one place.</span>
          </h1>
          <p className="animate-up mt-5 max-w-lg text-lg text-white/85" style={{ animationDelay: '.24s' }}>
            Discover concerts, festivals, shows, exhibitions and experiences happening around you.
          </p>
          <form role="search" onSubmit={(e) => { e.preventDefault(); const q = new FormData(e.currentTarget).get('q').trim(); navigate(q ? `/events?q=${encodeURIComponent(q)}` : '/events') }}  className="animate-up mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-2 pl-5 text-navy shadow-2xl ring-4 ring-white/10 transition focus-within:ring-aqua/60" style={{ animationDelay: '.36s' }}>
            <Icon n="search" className="h-5 w-5 shrink-0 text-mortar" />
            <input id="hero-search" name="q" type="search" aria-label="Search events, artists, venues" placeholder="Search events, artists, venues..." className="min-w-0 flex-1 bg-transparent px-2 py-2 outline-none placeholder:text-mortar/70" />
            <button aria-label="Search" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-aqua transition hover:scale-105 active:scale-95"><Icon n="arrow" /></button>
          </form>
          <div className="animate-up mt-6 flex flex-wrap items-center gap-2" style={{ animationDelay: '.48s' }}>
            <span className="mr-1 text-sm font-bold text-white/80">Popular:</span>
            {['Music', 'Festivals', 'Shows', 'Exhibitions', 'Outdoor'].map((c) => (
            <Link key={c} to={`/events?category=${encodeURIComponent(c)}`} className="rounded-full border border-white/30 px-4 py-1.5 text-sm backdrop-blur transition hover:border-aqua hover:bg-aqua hover:text-navy">{c}</Link>            ))}
          </div>
        </div>
        <div className="animate-up lg:justify-self-end lg:self-end" style={{ animationDelay: '.7s' }}>
            <Link to={`/events/${feat.id}`} className="animate-float flex w-full max-w-sm items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-3 pr-4 shadow-2xl backdrop-blur-xl transition hover:bg-white/20">         
            <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-linear-to-br ${feat.grad}`}><Icon n={feat.icon} className="h-8 w-8 text-white/80" /></div>
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-aqua px-2 py-0.5 text-[10px] font-bold text-navy">FEATURED</span>
              <p className="mt-1 truncate font-heading font-bold">{feat.title}</p>
              <p className="truncate text-xs text-white/75">{feat.date.split(' · ')[0]} · {feat.venue}</p>
            </div>
            <Icon n="arrow" className="h-5 w-5 shrink-0" />
          </Link>
        </div>
      </div>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-28" aria-hidden="true">
        <path className="animate-wave fill-aqua/45" d="M0 50C240 110 480 0 720 45S1200 100 1440 30V120H0Z" />
        <path className="fill-white dark:fill-navy" d="M0 85C260 125 520 45 760 80S1220 115 1440 75V120H0Z" />
      </svg>
    </section>
  )
}