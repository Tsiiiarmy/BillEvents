import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useOrders from '../../hooks/useOrders'
import useCheckout from '../../hooks/useCheckout'
import useSaved from '../../hooks/useSaved'
import { Icon } from './Icon'

// Dev-only. Never rendered in a production build.
const SAMPLE_USERS = [
  { id: 'u_sample_1', name: 'Mikiyas Getachew', email: 'mikiyas@example.com', phone: '0911234567' },
  { id: 'u_sample_2', name: 'Veronica Desta', email: 'veronica@example.com', phone: '0922345678' },
]

export function DevUserSwitcher() {
  const [open, setOpen] = useState(false)
  const { user, signIn, signOut } = useAuth()
  const { orders, clearOrders } = useOrders()
  const { draft, clearCheckout } = useCheckout()
  const { saved, clearSaved } = useSaved()
  if (!import.meta.env.DEV) return null

  const row =
    'w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition hover:bg-navy/10 dark:hover:bg-white/10'

  return (
    <div className="fixed bottom-4 right-4 z-[90] text-navy dark:text-white">
      {open && (
        <div className="mb-2 w-60 rounded-2xl border border-navy/15 bg-white p-3 shadow-2xl dark:border-white/15 dark:bg-navy-2">
          <p className="mb-2 px-1 text-[10px] font-bold tracking-widest text-mortar uppercase dark:text-white/50">
            Dev · customer
          </p>

          <p className="mb-2 rounded-lg bg-mist px-3 py-2 text-xs dark:bg-navy">
            {user ? (
              <>
                Signed in as <span className="font-bold">{user.name}</span>
              </>
            ) : (
              'Signed out'
            )}
          </p>

          {SAMPLE_USERS.map((u) => (
            <button key={u.id} type="button" className={row} onClick={() => signIn(u)}>
              Sign in as {u.name}
            </button>
          ))}

          <button type="button" className={row} onClick={signOut}>
            Sign out
          </button>

          <hr className="my-2 border-navy/10 dark:border-white/10" />

          <button type="button" className={row} onClick={clearCheckout}>
            Clear checkout draft {draft ? '(1)' : '(0)'}
          </button>
          <button type="button" className={row} onClick={clearOrders}>
            Clear orders ({orders.length})
          </button>
          <button type="button" className={row} onClick={clearSaved}>
            Clear saved events ({saved.length})
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Developer user tools"
        className="flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2.5 text-xs font-bold shadow-xl transition hover:-translate-y-0.5 dark:border-white/15 dark:bg-navy-2"
      >
        <Icon n="user" className="h-4 w-4" />
        {user ? user.name.split(' ')[0] : 'Guest'}
        <Icon n="chevron" className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}