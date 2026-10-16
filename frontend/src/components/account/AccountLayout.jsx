import { Link, Navigate, useLocation } from "react-router-dom";

import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";
import { SkipLink } from "../common/SkipLink";
import { Icon } from "../common/Icon";
import { Avatar } from "../common/Avatar";
import { ACCOUNT_LINKS } from "../layout/UserMenu";
import useAuth from "../../hooks/useAuth";
import useLanguage from '../../hooks/useLanguage'

/** Shared chrome for every /account page: guard, side nav, heading. */
export function AccountLayout({ theme, toggle, title, lead, children }) {
  const { user, isSignedIn } = useAuth();
  const { t } = useLanguage()
  const { pathname } = useLocation();

  if (!isSignedIn) return <Navigate to={`/signin?next=${pathname}`} replace />;

  return (
    <>
      <SkipLink />
      <Navbar theme={theme} toggle={toggle} />

      <main
        id="main"
        className="min-h-[60vh] bg-mist py-8 sm:py-12 dark:bg-navy-3"
      >
        <div className="wrap">
          <div className="flex items-center gap-4">
            <Avatar user={user} className="h-14 w-14 text-lg" />
            <div className="min-w-0">
              <p className="text-sm text-mortar dark:text-white/60">
                {user.name ? `Hi, ${user.name.split(" ")[0]}` : "Your account"}
              </p>
              <h1 className="font-heading text-3xl font-bold sm:text-4xl">
                {title}
              </h1>
            </div>
          </div>
          {lead && (
            <p className="mt-3 max-w-2xl text-mortar dark:text-white/70">
              {lead}
            </p>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
            {/* Scrolls horizontally on mobile instead of stacking into a wall of links */}
            <nav
              aria-label="Account"
              className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0"
            >
              <ul className="flex gap-2 lg:sticky lg:top-24 lg:flex-col">
                {ACCOUNT_LINKS.map((l) => {
                  const on = pathname.startsWith(l.to);
                  return (
                    <li key={l.to} className="shrink-0">
                      <Link
                        to={l.to}
                        aria-current={on ? "page" : undefined}
                        className={`flex items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition lg:rounded-xl lg:w-full ${
                          on
                            ? "bg-navy text-white dark:bg-aqua dark:text-navy"
                            : "bg-white text-mortar hover:text-navy dark:bg-navy-2 dark:text-white/65 dark:hover:text-white"
                        }`}
                      >
                        <Icon n={l.icon} className="h-4 w-4" />
                          {t(l.key)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
