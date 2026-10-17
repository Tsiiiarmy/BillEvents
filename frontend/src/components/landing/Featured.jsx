import { Link } from 'react-router-dom'
import { Icon } from '../common/Icon'
import { Heading } from '../common/Heading'
import { EventCard } from './EventCard'
import { events } from '../../data'
import useLanguage from '../../hooks/useLanguage'

/* ───────────── FEATURED EVENTS ───────────── */
export function Featured() {
  const { t } = useLanguage()

  return (
    <section id="discover" className="py-20">
      <div className="wrap">
        <Heading
          eyebrow={t('featured.eyebrow')}
          title={t('featured.title')}
          text={t('featured.text')}
          right={
            <Link
              to="/events"
              className="hidden items-center gap-2 text-sm font-bold text-teal hover:underline sm:flex dark:text-aqua"
            >
              {t('featured.viewAll')} <Icon n="arrow" className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e, i) => (
            <EventCard key={e.id} e={e} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}