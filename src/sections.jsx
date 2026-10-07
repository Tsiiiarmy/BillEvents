import { useEffect, useRef, useState } from 'react'
import { Icon, Reveal, Logo, BillPay, Btn, Heading, EventCard, ThemeToggle } from './components'
import { events, categories, steps, benefits } from './data'
import heroImg from './assets/images/hero-addis-concert.jpg'
import logoDark from './assets/logo/billevents-logo-reverse.svg'

/* ───────────── NAVBAR ───────────── */
export function Navbar({ theme, toggle, user = null }) {
  // user = null → guest. Pass { name } later to show My Tickets + profile menu.
  const [open, setOpen] = useState(false)
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const f = () => setSc(window.scrollY > 10)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const links = [['Discover', '#discover'], ['Categories', '#categories'], ['How It Works', '#how'], ['For Organizers', '#organizers']]
  if (user) links.push(['My Tickets', '#'])
  const a = 'text-sm font-medium text-navy/80 transition hover:text-teal dark:text-white/80 dark:hover:text-aqua'
  return (
    <header className={`sticky top-0 z-50 border-b border-navy/10 bg-white/85 backdrop-blur-lg transition-shadow dark:border-white/10 dark:bg-navy/85 ${sc ? 'shadow-lg shadow-navy/10' : ''}`}>
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label="BillEvents home"><Logo className="h-8" /></a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map(([t, h]) => <a key={t} href={h} className={a}>{t}</a>)}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="icon-btn" aria-label="Search events" onClick={() => document.getElementById('hero-search')?.focus()}><Icon n="search" /></button>
          <label className="relative hidden items-center sm:flex">
            <span className="sr-only">Language</span>
            <Icon n="globe" className="pointer-events-none absolute left-2.5 h-4 w-4" />
            <select className="cursor-pointer appearance-none rounded-full bg-transparent py-2 pl-8 pr-3 text-sm font-bold hover:bg-navy/10 dark:hover:bg-white/10">
              <option className="text-navy">EN</option><option className="text-navy">አማ</option><option className="text-navy">OM</option><option className="text-navy">ትግ</option>
            </select>
          </label>
          <ThemeToggle theme={theme} toggle={toggle} />
          {user ? (
            <details className="relative">
              <summary className="icon-btn cursor-pointer list-none" aria-label="Profile menu"><Icon n="user" /></summary>
              <ul className="absolute right-0 mt-2 w-48 rounded-xl border border-navy/10 bg-white p-2 text-sm shadow-xl dark:border-white/10 dark:bg-navy-2">
                {['My Tickets', 'Order History', 'Saved Events', 'Notifications', 'Settings', 'Sign Out'].map((t) => <li key={t}><a href="#" className="block rounded-lg px-3 py-2 hover:bg-mist dark:hover:bg-white/10">{t}</a></li>)}
              </ul>
            </details>
          ) : <a href="#" className={`${a} hidden px-2 md:block`}>Sign In</a>}
          <Btn as="a" href="#organizers" className="hidden bg-aqua text-navy sm:inline-flex">Create Event</Btn>
          <button className="icon-btn lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><Icon n={open ? 'x' : 'menu'} /></button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="wrap grid gap-1 border-t border-navy/10 py-4 lg:hidden dark:border-white/10">
          {links.map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium hover:bg-mist dark:hover:bg-white/10">{t}</a>)}
          <div className="mt-2 flex gap-3"><a href="#" className="flex-1 rounded-full border border-navy/20 py-3 text-center font-bold dark:border-white/25">Sign In</a><Btn as="a" href="#organizers" className="flex-1 bg-aqua text-navy">Create Event</Btn></div>
        </nav>
      )}
    </header>
  )
}

/* ───────────── HERO ───────────── */
export function Hero() {
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
          <form role="search" onSubmit={(e) => e.preventDefault()} className="animate-up mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-2 pl-5 text-navy shadow-2xl ring-4 ring-white/10 transition focus-within:ring-aqua/60" style={{ animationDelay: '.36s' }}>
            <Icon n="search" className="h-5 w-5 shrink-0 text-mortar" />
            <input id="hero-search" type="search" aria-label="Search events, artists, venues" placeholder="Search events, artists, venues..." className="min-w-0 flex-1 bg-transparent px-2 py-2 outline-none placeholder:text-mortar/70" />
            <button aria-label="Search" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-aqua transition hover:scale-105 active:scale-95"><Icon n="arrow" /></button>
          </form>
          <div className="animate-up mt-6 flex flex-wrap items-center gap-2" style={{ animationDelay: '.48s' }}>
            <span className="mr-1 text-sm font-bold text-white/80">Popular:</span>
            {['Music', 'Festivals', 'Shows', 'Exhibitions', 'Outdoor'].map((c) => (
              <a key={c} href="#categories" className="rounded-full border border-white/30 px-4 py-1.5 text-sm backdrop-blur transition hover:border-aqua hover:bg-aqua hover:text-navy">{c}</a>
            ))}
          </div>
        </div>
        <div className="animate-up lg:justify-self-end lg:self-end" style={{ animationDelay: '.7s' }}>
          <a href="#discover" className="animate-float flex w-full max-w-sm items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-3 pr-4 shadow-2xl backdrop-blur-xl transition hover:bg-white/20">
            <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-linear-to-br ${feat.grad}`}><Icon n={feat.icon} className="h-8 w-8 text-white/80" /></div>
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-aqua px-2 py-0.5 text-[10px] font-bold text-navy">FEATURED</span>
              <p className="mt-1 truncate font-heading font-bold">{feat.title}</p>
              <p className="truncate text-xs text-white/75">{feat.date.split(' · ')[0]} · {feat.venue}</p>
            </div>
            <Icon n="arrow" className="h-5 w-5 shrink-0" />
          </a>
        </div>
      </div>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-28" aria-hidden="true">
        <path className="animate-wave fill-aqua/45" d="M0 50C240 110 480 0 720 45S1200 100 1440 30V120H0Z" />
        <path className="fill-white dark:fill-navy" d="M0 85C260 125 520 45 760 80S1220 115 1440 75V120H0Z" />
      </svg>
    </section>
  )
}

/* ───────────── FEATURED EVENTS ───────────── */
export function Featured() {
  return (
    <section id="discover" className="py-20">
      <div className="wrap">
        <Heading eyebrow="FEATURED EVENTS" title="Don't Miss These" text="Handpicked events worth experiencing."
          right={<a href="#" className="hidden items-center gap-2 text-sm font-bold text-teal hover:underline sm:flex dark:text-aqua">View All Events <Icon n="arrow" className="h-4 w-4" /></a>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e, i) => <EventCard key={e.id} e={e} i={i} />)}
        </div>
      </div>
    </section>
  )
}

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
                <a href="#discover" className="group flex w-24 flex-col items-center gap-3 text-center sm:w-auto">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-teal shadow-lg shadow-navy/10 ring-1 ring-navy/5 transition duration-300 group-hover:-translate-y-1.5 group-hover:bg-aqua group-hover:text-navy group-hover:shadow-aqua/50 dark:bg-navy-2 dark:text-aqua dark:ring-white/10 dark:group-hover:bg-aqua dark:group-hover:text-navy">
                    <Icon n={c.icon} className="h-8 w-8 transition duration-300 group-hover:scale-110" />
                  </span>
                  <span className="text-sm font-bold">{c.name}</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────── HOW IT WORKS ───────────── */
export function HowItWorks() {
  return (
    <section id="how" className="py-20">
      <div className="wrap">
        <Heading eyebrow="HOW IT WORKS" title="Great experiences in four simple steps." />
        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden border-t-2 border-dashed border-aqua/70 lg:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 140} className="relative text-center">
              <div className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-teal shadow-xl shadow-navy/10 ring-1 ring-navy/10 dark:bg-navy-2 dark:text-aqua dark:ring-aqua/30">
                <Icon n={s.icon} className="h-8 w-8" />
                <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-navy text-[11px] font-bold text-white dark:bg-aqua dark:text-navy">{s.n}</span>
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm text-mortar dark:text-white/70">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── ORGANIZERS ───────────── */
export function Organizers() {
  return (
    <section id="organizers" className="pb-20">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-navy to-[#2C4A86] p-6 text-white sm:p-10 lg:p-14 dark:ring-1 dark:ring-aqua/20">
          <div className="animate-drift absolute -right-20 -top-20 h-80 w-80 rounded-full bg-aqua/25 blur-3xl" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.2em] text-aqua">FOR ORGANIZERS</p>
              <h2 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">Bring Your Event to Life</h2>
              <p className="mt-4 max-w-md text-white/80">Create, manage and sell tickets for your event — all in one place.</p>
              <ul className="mt-8 grid gap-5">
                {benefits.map((b) => (
                  <li key={b.title} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-aqua"><Icon n={b.icon} /></span>
                    <div><h3 className="font-heading font-bold">{b.title}</h3><p className="text-sm text-white/70">{b.text}</p></div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn as="a" href="#" className="bg-aqua text-navy">Create Event <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
                <Btn as="a" href="#how" variant="ghost">Learn More</Btn>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="animate-float rounded-2xl bg-white p-4 text-navy shadow-2xl sm:p-5" role="img" aria-label="Sample organizer dashboard showing tickets sold, revenue, sales chart and ticket inventory">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-sm font-bold">Event Performance</p>
                  <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold text-teal">SAMPLE DATA</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[['Tickets sold', '7,420'], ['Revenue', '5.08M ETB'], ['Upcoming', '6']].map(([l, v]) => (
                    <div key={l} className="rounded-xl bg-mist p-3"><p className="text-[10px] text-mortar">{l}</p><p className="font-heading text-base font-bold sm:text-lg">{v}</p></div>
                  ))}
                </div>
                <svg viewBox="0 0 300 100" className="mt-4 h-28 w-full" aria-hidden="true">
                  <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6BD6DA" stopOpacity=".55" /><stop offset="1" stopColor="#6BD6DA" stopOpacity="0" /></linearGradient></defs>
                  <path d="M0 80C40 70 60 40 100 50S160 85 200 45 270 15 300 20V100H0Z" fill="url(#area)" />
                  <path className="line" pathLength="1" d="M0 80C40 70 60 40 100 50S160 85 200 45 270 15 300 20" fill="none" stroke="#3364AA" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="mt-3 grid gap-2.5">
                  {[['Early Bird', 0.82], ['Regular', 0.56], ['VIP', 0.28]].map(([l, w]) => (
                    <div key={l} className="flex items-center gap-3 text-xs"><span className="w-16 text-mortar">{l}</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-mist"><span className="bar block h-full rounded-full bg-aqua" style={{ '--w': w }} /></span></div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── APP ───────────── */
export function AppSection() {
  const qr = Array.from({ length: 81 }, (_, i) => (i * 7 + (i % 9) * 3) % 5 < 2)
  const Store = ({ small, big }) => (
    <a href="#" className="rounded-xl bg-navy px-5 py-2.5 text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-navy-2 dark:bg-white dark:text-navy dark:hover:bg-white/90">
      <span className="block text-[10px] leading-none opacity-75">{small}</span><span className="font-heading text-base font-bold">{big}</span>
    </a>
  )
  return (
    <section id="app" className="overflow-hidden bg-mist py-20 dark:bg-navy-3">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="flex justify-center">
          <div className="relative">
            <div className="animate-float relative h-[30rem] w-60 rounded-[2.5rem] border-[8px] border-navy bg-white p-3 text-navy shadow-2xl dark:border-[#0c1830]">
              <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-navy/20" />
              <p className="text-[10px] text-mortar">Discover</p>
              <p className="font-heading text-sm font-bold">Events near you</p>
              <div className="mt-2 flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-[10px] text-mortar"><Icon n="search" className="h-3 w-3" />Search events...</div>
              <div className="mt-3 flex items-end rounded-xl bg-linear-to-br from-aqua via-[#3364AA] to-navy p-3 text-white" style={{ height: 96 }}>
                <div><p className="font-heading text-xs font-bold">Addis Summer Festival</p><p className="text-[9px] opacity-80">Oct 24 · Millennium Hall</p></div>
              </div>
              <p className="mt-3 text-[10px] font-bold">Your ticket</p>
              <div className="mt-1.5 rounded-xl border border-navy/10 p-3 text-center">
                <div className="mx-auto grid w-24 grid-cols-9 gap-px">{qr.map((on, i) => <span key={i} className={`aspect-square ${on ? 'bg-navy' : 'bg-transparent'}`} />)}</div>
                <p className="mt-2 text-[9px] text-mortar">Show at the entrance</p>
              </div>
            </div>
            <div className="absolute -right-10 top-24 hidden rounded-xl bg-white p-3 text-navy shadow-xl sm:block" style={{ animation: 'float 7s ease-in-out -2s infinite' }}>
              <p className="flex items-center gap-1.5 text-[11px] font-bold"><Icon n="ticket" className="h-4 w-4 text-teal" />Ticket ready</p><p className="text-[10px] text-mortar">2 × Regular</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xs font-bold tracking-[0.2em] text-teal dark:text-aqua">GET THE BILLEVENTS APP</p>
          <h2 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">Your events, always with you.</h2>
          <p className="mt-4 max-w-md text-mortar dark:text-white/70">Discover new events, keep your tickets close, and stay ready for your next experience.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Store small="Download on the" big="App Store" /><Store small="Get it on" big="Google Play" /></div>
          <Btn as="a" href="#" variant="dark" className="mt-6">Get the App <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────── BILLPAY TRUST ───────────── */
export function Trust() {
  return (
    <section className="py-16">
      <Reveal className="wrap flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-bold tracking-wide text-mortar dark:text-white/70">Secure payments powered by</p>
        <BillPay className="h-10" />
        <p className="text-xs tracking-[0.25em] text-mortar dark:text-white/60">SAFE • SIMPLE • RELIABLE</p>
      </Reveal>
    </section>
  )
}

/* ───────────── FOOTER ───────────── */
export function Footer() {
  const cols = [
    ['Discover', ['Events', 'Categories', 'Upcoming Events']],
    ['For Organizers', ['Create Event', 'Organizer Dashboard', 'How It Works']],
    ['Support', ['Help Center', 'Contact', 'Terms & Conditions', 'Privacy Policy']],
  ]
  return (
    <footer className="bg-navy text-white dark:bg-[#0F1A33]">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div><img src={logoDark} alt="BillEvents" className="h-9 w-auto" /><p className="mt-4 max-w-[14rem] text-sm text-white/70">Discover unforgettable experiences.</p></div>
        {cols.map(([t, ls]) => (
          <div key={t}><h3 className="font-heading font-bold">{t}</h3>
            <ul className="mt-4 grid gap-2.5 text-sm text-white/70">{ls.map((l) => <li key={l}><a href="#" className="transition hover:text-aqua">{l}</a></li>)}</ul></div>
        ))}
        <div><h3 className="font-heading font-bold">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            {[['Facebook', 'f'], ['X', '𝕏'], ['Instagram', 'ig'], ['YouTube', '▶']].map(([n, g]) => (
              <a key={n} href="#" aria-label={n} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-sm font-bold transition hover:-translate-y-1 hover:border-aqua hover:bg-aqua hover:text-navy">{g}</a>
            ))}
          </div></div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/70 md:flex-row">
          <p className="flex items-center gap-2">© 2026 BillEvents. Powered by <BillPay fixedDark className="h-5" /></p>
          <ul className="flex flex-wrap justify-center gap-5">{['English', 'Amharic', 'Afaan Oromoo', 'Tigrinya'].map((l) => <li key={l}><a href="#" className="hover:text-aqua">{l}</a></li>)}</ul>
        </div>
      </div>
    </footer>
  )
}