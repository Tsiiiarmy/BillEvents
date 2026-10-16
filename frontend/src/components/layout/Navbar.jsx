import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Icon } from '../common/Icon'
import { Logo } from '../common/Brand'
import { Btn } from '../common/Btn'
import { ThemeToggle } from '../common/ThemeToggle'
import { Avatar } from '../common/Avatar'
import { UserMenu, ACCOUNT_LINKS } from './UserMenu'
import useAuth from '../../hooks/useAuth'

export function Navbar({ theme, toggle }) {
  const [open, setOpen] = useState(false)
  const [sc, setSc] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, isSignedIn, signOut } = useAuth()

  useEffect(() => {
    const f = () => setSc(window.scrollY > 10)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const goSearch = () => {
    const el = document.getElementById('hero-search') || document.getElementById('event-search')
    if (el) el.focus()
    else navigate('/events')
  }

  const leave = () => {
    setOpen(false)
    signOut()
    navigate('/')
  }

  const links = [
    ['Discover', '/events'],
    ['Categories', '/#categories'],
    ['How It Works', '/#how'],
    ['For Organizers', '/organizer'],
  ]

  const a = 'text-sm font-medium text-navy/80 transition hover:text-teal dark:text-white/80 dark:hover:text-aqua'
  const active = (h) =>
    (h === '/events' && pathname.startsWith('/events')) ||
    (h === '/account/tickets' && pathname.startsWith('/account/tickets'))

  return (
    <header
      className={`sticky top-0 z-50 border-b border-navy/10 bg-white/85 backdrop-blur-lg transition-shadow dark:border-white/10 dark:bg-navy/85 ${
        sc ? 'shadow-lg shadow-navy/10' : ''
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="BillEvents home">
          <Logo theme={theme} className="h-8" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map(([t, h]) => (
            <Link
              key={t}
              to={h}
              aria-current={active(h) ? 'page' : undefined}
              className={`${a} ${active(h) ? '!font-bold !text-teal dark:!text-aqua' : ''}`}
            >
              {t}
            </Link>
          ))}
          {/* Deliberately a top-level link, not buried in the menu: this is the
              page people open at the gate. */}
          {isSignedIn && (
            <Link
              to="/account/tickets"
              aria-current={active('/account/tickets') ? 'page' : undefined}
              className={`${a} inline-flex items-center gap-1.5 ${
                active('/account/tickets') ? '!font-bold !text-teal dark:!text-aqua' : ''
              }`}
            >
              <Icon n="ticket" className="h-4 w-4" />
              My Tickets
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="icon-btn" aria-label="Search events" onClick={goSearch}>
            <Icon n="search" />
          </button>

          <label className="relative hidden items-center sm:flex">
            <span className="sr-only">Language</span>
            <Icon n="globe" className="pointer-events-none absolute left-2.5 h-4 w-4" />
            <select className="cursor-pointer appearance-none rounded-full bg-transparent py-2 pl-8 pr-3 text-sm font-bold hover:bg-navy/10 dark:hover:bg-white/10">
              <option className="text-navy">EN</option>
              <option className="text-navy">አማ</option>
              <option className="text-navy">OM</option>
              <option className="text-navy">ትግ</option>
              <option className="text-navy">Somali</option>
              <option className="text-navy">Wolaita</option>
            </select>
          </label>

          <ThemeToggle theme={theme} toggle={toggle} />

          {isSignedIn ? (
            <UserMenu />
          ) : (
            <Link to="/signin" className={`${a} hidden px-2 md:block`}>
              Sign In
            </Link>
          )}

          <Btn as={Link} to="/organizer" className="hidden bg-aqua text-navy sm:inline-flex">
            Create Event
          </Btn>

          <button
            className="icon-btn lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Icon n={open ? 'x' : 'menu'} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="wrap grid gap-1 border-t border-navy/10 py-4 lg:hidden dark:border-white/10"
        >
          {isSignedIn && (
            <div className="mb-2 flex items-center gap-3 rounded-xl bg-mist px-3 py-3 dark:bg-navy-2">
              <Avatar user={user} className="h-10 w-10 text-sm" />
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-bold">{user.name || 'BillEvents user'}</p>
                <p className="truncate text-xs text-mortar dark:text-white/60">
                  {user.email || user.phone || 'Signed in'}
                </p>
              </div>
            </div>
          )}

          {links.map(([t, h]) => (
            <Link
              key={t}
              to={h}
              className="rounded-lg px-3 py-3 font-medium hover:bg-mist dark:hover:bg-white/10"
            >
              {t}
            </Link>
          ))}

          {isSignedIn ? (
            <>
              <hr className="my-2 border-navy/10 dark:border-white/10" />
              {ACCOUNT_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium hover:bg-mist dark:hover:bg-white/10"
                >
                  <Icon n={l.icon} className="h-4 w-4 text-mortar dark:text-white/60" />
                  {l.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={leave}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-left font-medium hover:bg-mist dark:hover:bg-white/10"
              >
                <Icon n="logout" className="h-4 w-4 text-mortar dark:text-white/60" />
                Sign out
              </button>
              <Btn as={Link} to="/organizer" className="mt-2 bg-aqua text-navy">
                Create Event
              </Btn>
            </>
          ) : (
            <div className="mt-2 flex gap-3">
              <Link
                to="/signin"
                className="flex-1 rounded-full border border-navy/20 py-3 text-center font-bold dark:border-white/25"
              >
                Sign In
              </Link>
              <Btn as={Link} to="/organizer" className="flex-1 bg-aqua text-navy">
                Create Event
              </Btn>
            </div>
          )}
        </nav>
      )}
    </header>
  )
}