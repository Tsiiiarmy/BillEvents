import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '../common/Icon'
import { Logo } from '../common/Brand'
import { Btn } from '../common/Btn'
import { ThemeToggle } from '../common/ThemeToggle'

/* ───────────── NAVBAR ───────────── */

export function Navbar({ theme, toggle, user = null }) {
  // user = null → guest. Pass { name } later to show My Tickets + profile menu.
  const [open, setOpen] = useState(false)
  const [sc, setSc] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const f = () => setSc(window.scrollY > 10)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  const goSearch = () => {
    const el = document.getElementById('hero-search') || document.getElementById('event-search')
    if (el) el.focus(); else navigate('/events')
  }

  const links = [['Discover', '/events'], ['Categories', '/#categories'], ['How It Works', '/#how'], ['For Organizers', '/#organizers']]
  if (user) links.push(['My Tickets', '#'])
  const a = 'text-sm font-medium text-navy/80 transition hover:text-teal dark:text-white/80 dark:hover:text-aqua'
  const active = (h) => h === '/events' && pathname.startsWith('/events')

  return (
    <header className={`sticky top-0 z-50 border-b border-navy/10 bg-white/85 backdrop-blur-lg transition-shadow dark:border-white/10 dark:bg-navy/85 ${sc ? 'shadow-lg shadow-navy/10' : ''}`}>
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="BillEvents home"><Logo className="h-8" /></Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map(([t, h]) => (
            <Link key={t} to={h} aria-current={active(h) ? 'page' : undefined} className={`${a} ${active(h) ? '!font-bold !text-teal dark:!text-aqua' : ''}`}>{t}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="icon-btn" aria-label="Search events" onClick={goSearch}><Icon n="search" /></button>
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
          ) : <Link to="/signin" className={`${a} hidden px-2 md:block`}>Sign In</Link>}
          <Btn as={Link} to="/#organizers" className="hidden bg-aqua text-navy sm:inline-flex">Create Event</Btn>
          <button className="icon-btn lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><Icon n={open ? 'x' : 'menu'} /></button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="wrap grid gap-1 border-t border-navy/10 py-4 lg:hidden dark:border-white/10">
          {links.map(([t, h]) => <Link key={t} to={h} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium hover:bg-mist dark:hover:bg-white/10">{t}</Link>)}
          <div className="mt-2 flex gap-3">
            <Link to="/signin" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-navy/20 py-3 text-center font-bold dark:border-white/25">Sign In</Link>
            <Btn as={Link} to="/#organizers" onClick={() => setOpen(false)} className="flex-1 bg-aqua text-navy">Create Event</Btn>
          </div>
        </nav>
      )}
    </header>
  )
}