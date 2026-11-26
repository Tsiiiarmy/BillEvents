import { Link } from 'react-router-dom'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { SkipLink } from '../../components/common/SkipLink'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import useLanguage from '../../hooks/useLanguage'

export default function NotFoundPage({ theme, toggle }) {
  const { t } = useLanguage()

  return (
    <>
      <SkipLink />
      <Navbar theme={theme} toggle={toggle} />

      <main id="main" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="animate-drift pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-aqua/15 blur-3xl"
        />

        <div className="wrap relative grid min-h-[70vh] place-items-center py-20 text-center">
          <div>
            <p
              aria-hidden="true"
              className="animate-up font-heading text-8xl font-bold text-navy/10 sm:text-9xl dark:text-white/10"
            >
              404
            </p>
            <span className="animate-float mx-auto -mt-10 grid h-20 w-20 place-items-center rounded-full bg-navy text-white shadow-xl shadow-navy/30 dark:bg-white dark:text-navy">
              <Icon n="ticket" className="h-9 w-9" />
            </span>

            <h1
              className="animate-up mt-6 font-heading text-3xl font-bold sm:text-4xl"
              style={{ animationDelay: '.1s' }}
            >
              {t('notFound.title', null, 'This page isn’t on the guest list')}
            </h1>
            <p
              className="animate-up mx-auto mt-3 max-w-md text-mortar dark:text-white/70"
              style={{ animationDelay: '.2s' }}
            >
              {t('notFound.text', null, 'The link may be broken or the page may have moved. Let’s get you back to the good stuff.')}
            </p>

            <div className="animate-up mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: '.3s' }}>
              <Btn as={Link} to="/events" className="bg-navy text-white dark:bg-white dark:text-navy">
                <Icon n="search" className="h-4 w-4" />
                {t('notFound.discover', null, 'Discover events')}
              </Btn>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-navy ring-1 ring-navy/20 transition hover:bg-navy/5 dark:text-white dark:ring-white/25 dark:hover:bg-white/10"
              >
                {t('notFound.home', null, 'Go to the home page')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}