import { useEffect, useRef, useState } from 'react'
import logoLight from './assets/logo/billevents-logo.svg'
import logoDark from './assets/logo/billevents-logo-reverse.svg'
import payLight from './assets/logo/billpay-logo.svg'
import payDark from './assets/logo/billpay-logo-reverse.svg'

const P = {
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  heart: 'M12 21s-7-4.4-9.3-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.3 6C19 16.6 12 21 12 21z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  pin: 'M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  music: 'M9 18V6l11-2v12M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  flag: 'M5 21V4M5 4h13l-3 4 3 4H5',
  mic: 'M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zM6 11a6 6 0 0 0 12 0M12 17v4',
  frame: 'M4 4h16v16H4zM8 16l3-4 2 2 3-4',
  mountain: 'M3 20l6-11 4 6 2-3 6 8z',
  smile: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 14a5 5 0 0 0 8 0M9 9.5h.01M15 9.5h.01',
  palette: 'M12 3a9 9 0 0 0 0 18c1.5 0 2-1 1.5-2-.6-1.2.2-2.5 1.6-2.5H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3zM7.5 11h.01M10 7.5h.01M14.5 7.5h.01',
  fork: 'M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 21V3c-2 1-3 4-3 8h3',
  card: 'M3 6h18v12H3zM3 10h18M7 15h3',
  ticket: 'M3 9V6h18v3a3 3 0 0 0 0 6v3H3v-3a3 3 0 0 0 0-6zM14 6v12',
  phone: 'M7 2h10v20H7zM11 18h2',
  chart: 'M4 20V10M10 20V4M16 20v-7M2 20h20',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5',
  moon: 'M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  x: 'M6 6l12 12M18 6L6 18',
  plus: 'M12 5v14M5 12h14',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
}

export function Icon({ n, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={P[n]} />
    </svg>
  )
}

/** Fades/slides children in once when scrolled into view. */
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${on ? 'in' : ''} ${className}`}>{children}</div>
}

// Logos follow the guideline: colour on light, reversed on dark. Never filtered or recoloured.
export function Logo({ className = 'h-8' }) {
  return (<>
    <img src={logoLight} alt="BillEvents" className={`${className} w-auto dark:hidden`} />
    <img src={logoDark} alt="BillEvents" className={`${className} hidden w-auto dark:block`} />
  </>)
}
export function BillPay({ className = 'h-7', fixedDark = false }) {
  if (fixedDark) return <img src={payDark} alt="BillPay" className={`${className} w-auto`} />
  return (<>
    <img src={payLight} alt="BillPay" className={`${className} w-auto dark:hidden`} />
    <img src={payDark} alt="BillPay" className={`${className} hidden w-auto dark:block`} />
  </>)
}

export function Btn({ as: T = 'button', variant = 'primary', className = '', children, ...p }) {
  const v = {
    primary: 'bg-aqua text-navy shadow-[0_10px_28px_-10px_rgba(107,214,218,.9)] hover:brightness-95',
    dark: 'bg-navy text-white hover:bg-navy-2 dark:bg-aqua dark:text-navy',
    ghost: 'border border-white/30 text-white hover:bg-white/10',
  }[variant]
  return (
    <T className={`group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition duration-300 hover:-translate-y-0.5 active:translate-y-0 ${v} ${className}`} {...p}>
      {children}
    </T>
  )
}

export function Heading({ eyebrow, title, text, right }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <Reveal>
        <p className="text-xs font-bold tracking-[0.2em] text-teal dark:text-aqua">{eyebrow}</p>
        <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
        {text && <p className="mt-2 max-w-xl text-mortar dark:text-white/70">{text}</p>}
      </Reveal>
      {right}
    </div>
  )
}

export function ThemeToggle({ theme, toggle }) {
  return (
    <button onClick={toggle} className="icon-btn" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      <Icon n={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  )
}

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
          <h3 className="mt-2 font-heading text-lg font-bold leading-snug">{e.title}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-mortar dark:text-white/60"><Icon n="pin" className="h-3.5 w-3.5 shrink-0" />{e.venue}, {e.city}</p>
          <p className="mt-3 text-sm">From <b className="font-heading">{e.price.toLocaleString()} ETB</b></p>
          <Btn as="a" href="#" className="mt-4 w-full bg-aqua text-navy">Get Tickets <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
        </div>
      </article>
    </Reveal>
  )
}