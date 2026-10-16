import { useEffect } from 'react'

import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import { SkipLink } from '../common/SkipLink'

/** Shared chrome for Help, Contact, Terms and Privacy: navy title band, mist body. */
export function InfoLayout({ theme, toggle, eyebrow, title, lead, children }) {
  useEffect(() => {
    document.title = `${title} — BillEvents`
  }, [title])

  return (
    <>
      <SkipLink />
      <Navbar theme={theme} toggle={toggle} />

      <main id="main">
        <header className="relative isolate overflow-hidden bg-navy text-white">
          <div
            aria-hidden="true"
            className="animate-drift absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-aqua/15 blur-3xl"
          />
          <div className="wrap py-14 sm:py-20">
            {eyebrow && (
              <p className="text-sm font-bold uppercase tracking-widest text-aqua">{eyebrow}</p>
            )}
            <h1 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">{title}</h1>
            {lead && <p className="mt-4 max-w-2xl text-lg text-white/75">{lead}</p>}
          </div>
        </header>

        <div className="bg-mist py-12 sm:py-16 dark:bg-navy-3">
          <div className="wrap">{children}</div>
        </div>
      </main>

      <Footer />
    </>
  )
}