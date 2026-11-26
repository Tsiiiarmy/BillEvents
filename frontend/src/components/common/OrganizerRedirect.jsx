import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { organizerUrl } from '../../data/links'

/** Old /organizer/... links on the public site forward to the organizer app. */
export function OrganizerRedirect() {
  const { pathname, search, hash } = useLocation()
  const to = organizerUrl(pathname + search + hash)

  useEffect(() => {
    window.location.replace(to)
  }, [to])

  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <p className="text-mortar dark:text-white/70">
        Taking you to the organizer portal…{' '}
        <a href={to} className="font-bold text-teal underline dark:text-aqua">
          Continue
        </a>
      </p>
    </main>
  )
}