import { Link } from 'react-router-dom'
import { Logo } from '../common/Brand'
import { Icon } from '../common/Icon'
import { ThemeToggle } from '../common/ThemeToggle'
import { publicUrl } from '../../data/links'

/** Organizer portal header. Same name and props as the public Navbar,
 *  so every moved page imports it unchanged. */
export function Navbar({ theme, toggle }) {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/85 backdrop-blur-lg dark:border-white/10 dark:bg-ink/80">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link
          to="/organizer"
          aria-label="BillEvents Organizer home"
          className="flex items-center gap-3"
        >
          <Logo theme={theme} className="h-8" />
          <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white dark:bg-aqua dark:text-navy">
            Organizer
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={publicUrl('/')}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-navy/70 transition hover:bg-navy/5 hover:text-navy dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Icon n="arrowleft" className="h-4 w-4" />
            <span className="hidden sm:inline">Back to BillEvents</span>
            <span className="sm:hidden">Site</span>
          </a>
          <ThemeToggle theme={theme} toggle={toggle} />
        </div>
      </div>
    </header>
  )
}