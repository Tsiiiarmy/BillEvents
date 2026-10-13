import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Icon } from '../common/Icon'
import { Avatar } from '../common/Avatar'
import useAuth from '../../hooks/useAuth'

export const ACCOUNT_LINKS = [
  { to: '/account/tickets', label: 'My Tickets', icon: 'ticket' },
  { to: '/account/saved', label: 'Saved Events', icon: 'heart' },
  { to: '/account/settings', label: 'Settings', icon: 'settings' },
]

export function UserMenu() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  const btn = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Close when the route changes.
  useEffect(() => setOpen(false), [pathname])

  // Close on Escape or a click outside. Escape returns focus to the button.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  if (!user) return null

  const leave = () => {
    setOpen(false)
    signOut()
    navigate('/')
  }

  const row =
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-mist dark:hover:bg-white/10'

  return (
    <div ref={wrap} className="relative">
      <button
        ref={btn}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Account menu for ${user.name || 'your account'}`}
        className="flex items-center gap-1.5 rounded-full p-0.5 transition hover:opacity-85 focus-visible:ring-4 focus-visible:ring-aqua/40"
      >
        <Avatar user={user} />
        <Icon n="chevron" className={`hidden h-4 w-4 transition sm:block ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account"
          className="animate-up absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-navy/10 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-navy-2"
        >
          <div className="flex items-center gap-3 rounded-xl bg-mist px-3 py-3 dark:bg-navy">
            <Avatar user={user} className="h-10 w-10 text-sm" />
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-bold">{user.name || 'BillEvents user'}</p>
              <p className="truncate text-xs text-mortar dark:text-white/60">
                {user.email || user.phone || 'Signed in'}
              </p>
            </div>
          </div>

          <ul className="mt-2">
            {ACCOUNT_LINKS.map((l) => (
              <li key={l.to}>
                <Link role="menuitem" to={l.to} className={row}>
                  <Icon n={l.icon} className="h-4 w-4 text-mortar dark:text-white/60" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="my-2 border-navy/10 dark:border-white/10" />

          <button role="menuitem" type="button" onClick={leave} className={`${row} w-full text-left`}>
            <Icon n="logout" className="h-4 w-4 text-mortar dark:text-white/60" />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}