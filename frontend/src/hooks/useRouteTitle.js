import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { allEvents } from '../data'
import useLanguage from './useLanguage'


const BASE = typeof document !== 'undefined' ? document.title : 'BillEvents'

// [pattern, translation key, English fallback]
const ROUTES = [
  [/^\/events$/, 'title.discover', 'Discover events'],
  [/^\/signin$/, 'title.signin', 'Sign in'],
  [/^\/signup$/, 'title.signup', 'Create account'],
  [/^\/checkout$/, 'title.checkout', 'Checkout'],
  [/^\/checkout\/payment$/, 'title.payment', 'Payment'],
  [/^\/checkout\/success\//, 'title.success', 'Payment complete'],
  [/^\/account\/tickets$/, 'title.tickets', 'My tickets'],
  [/^\/account\/tickets\//, 'title.ticket', 'Your ticket'],
  [/^\/account\/saved$/, 'title.saved', 'Saved events'],
  [/^\/account\/settings$/, 'title.settings', 'Settings'],
  [/^\/help$/, 'title.help', 'Help center'],
  [/^\/contact$/, 'title.contact', 'Contact us'],
  [/^\/terms$/, 'title.terms', 'Terms and conditions'],
  [/^\/privacy$/, 'title.privacy', 'Privacy policy'],
  [/^\/entry$/, 'title.entry', 'Gate entry'],
]

/** Sets the browser tab title for the current page. */
export default function useRouteTitle() {
  const { pathname } = useLocation()
  const { t, lang } = useLanguage()

  useEffect(() => {
    if (pathname === '/') {
      document.title = BASE
      return
    }

    // Event pages use the event's own name.
    const id = pathname.match(/^\/events\/([^/]+)$/)?.[1]
    const event = id && allEvents.find((e) => String(e.id) === id)
    if (event) {
      document.title = `${event.title} · BillEvents`
      return
    }

    const hit = ROUTES.find(([re]) => re.test(pathname))
    const label = hit ? t(hit[1], null, hit[2]) : t('title.notFound', null, 'Page not found')
    document.title = `${label} · BillEvents`
  }, [pathname, lang, t])
}