import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Icon } from "../common/Icon";
import { Logo } from "../common/Brand";
import { Btn } from "../common/Btn";
import { ThemeToggle } from "../common/ThemeToggle";
import { Avatar } from "../common/Avatar";
import { UserMenu, ACCOUNT_LINKS } from "./UserMenu";
import { LanguageMenu } from "./LanguageMenu";
import useAuth from "../../hooks/useAuth";
import useLanguage from "../../hooks/useLanguage";
import { LANGUAGES } from "../../i18n/languages";

const BASE_LINKS = [
  { key: "nav.discover", to: "/events", match: (p) => p.startsWith("/events") },
  { key: "nav.categories", to: "/#categories" },
  { key: "footer.howItWorks", to: "/#how" },
];

// Top-level on purpose: it's the page people open at the gate.
const TICKETS_LINK = {
  key: "nav.myTickets",
  to: "/account/tickets",
  icon: "ticket",
  match: (p) => p.startsWith("/account/tickets"),
};

export function Navbar({ theme, toggle }) {
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isSignedIn, signOut } = useAuth();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const f = () => setSc(window.scrollY > 10);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const leave = () => {
    setOpen(false);
    signOut();
    navigate("/");
  };

  const links = isSignedIn ? [...BASE_LINKS, TICKETS_LINK] : BASE_LINKS;
  const isOn = (l) => Boolean(l.match?.(pathname));

  // Come back to the same page after signing in.
  const signInTo =
    pathname === "/" ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup")
      ? "/signin"
      : `/signin?next=${encodeURIComponent(pathname)}`;

  const pill = (on) =>
    `inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
      on
        ? "bg-navy/7 font-bold text-navy dark:bg-white/10 dark:text-white"
        : "font-medium text-navy/70 hover:bg-navy/5 hover:text-navy dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
    }`;

  const row =
    "flex items-center gap-3 rounded-lg px-3 py-3 font-medium hover:bg-mist dark:hover:bg-white/10";

  return (
    <header
      className={`sticky top-0 z-50 border-b border-navy/10 bg-white/85 backdrop-blur-lg transition-shadow dark:border-white/10 dark:bg-ink/80 ${
        sc ? "shadow-lg shadow-navy/10" : ""
      }`}
    >
      {/* Three columns on laptop and up: logo | links (centred) | controls.
          The two outer columns share the leftover space equally, so the
          middle one stays in the true centre of the bar. */}
      <div className="wrap grid h-16 grid-cols-[auto_1fr] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Link to="/" aria-label={t("nav.home")} className="justify-self-start">
          <Logo theme={theme} className="h-8" />
        </Link>

        <nav
          aria-label={t("nav.main")}
          className="hidden items-center gap-1 lg:flex"
        >
          {links.map((l) => (
            <Link
              key={l.key}
              to={l.to}
              aria-current={isOn(l) ? "page" : undefined}
              className={pill(isOn(l))}
            >
              {l.icon && <Icon n={l.icon} className="h-4 w-4" />}
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-1 sm:gap-2">
          <div className="hidden sm:block">
            <LanguageMenu />
          </div>

          {isSignedIn ? (
            <UserMenu />
          ) : (
            <>
              {/* The wrapper does the hiding — Btn's own inline-flex would override `hidden` */}
              <span className="hidden sm:block">
                <Btn as={Link} to={signInTo} className="whitespace-nowrap bg-aqua text-navy">
                  <Icon n="user" className="h-4 w-4" />
                  {t('nav.signIn')}
                </Btn>
              </span>

              
              {/* Phones: a compact icon instead of the full pill */}
              <Link
                to={signInTo}
                aria-label={t("nav.signIn")}
                title={t("nav.signIn")}
                className="icon-btn sm:hidden"
              >
                <Icon n="user" />
              </Link>
            </>
          )}

          <ThemeToggle theme={theme} toggle={toggle} />

          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-label={t(open ? "nav.menuClose" : "nav.menuOpen")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <Icon n={open ? "x" : "menu"} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={t("nav.mobile")}
          className="wrap grid gap-1 border-t border-navy/10 py-4 lg:hidden dark:border-white/10"
        >
          {!isSignedIn && (
            <Link
              to={signInTo}
              className="mb-2 flex items-center gap-3 rounded-xl bg-mist px-3 py-3 transition hover:bg-aqua/15 sm:hidden dark:bg-navy-2 dark:hover:bg-white/10"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-aqua text-navy">
                <Icon n="user" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-sm font-bold">
                  {t("nav.signIn")}
                </span>
                <span className="block truncate text-xs text-mortar dark:text-white/60">
                  {t("nav.signInHint")}
                </span>
              </span>
              <Icon
                n="arrow"
                className="h-4 w-4 shrink-0 text-teal dark:text-aqua"
              />
            </Link>
          )}

          {isSignedIn && (
            <div className="mb-2 flex items-center gap-3 rounded-xl bg-mist px-3 py-3 dark:bg-navy-2">
              <Avatar user={user} className="h-10 w-10 text-sm" />
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-bold">
                  {user.name || t("account.guestName")}
                </p>
                <p className="truncate text-xs text-mortar dark:text-white/60">
                  {user.email || user.phone || t("account.signedIn")}
                </p>
              </div>
            </div>
          )}

          {links.map((l) => (
            <Link
              key={l.key}
              to={l.to}
              aria-current={isOn(l) ? "page" : undefined}
              className={`${row} ${isOn(l) ? "bg-mist font-bold dark:bg-white/10" : ""}`}
            >
              {l.icon && (
                <Icon
                  n={l.icon}
                  className="h-4 w-4 text-mortar dark:text-white/60"
                />
              )}
              {t(l.key)}
            </Link>
          ))}

          {isSignedIn && (
            <>
              <hr className="my-2 border-navy/10 dark:border-white/10" />
              {ACCOUNT_LINKS.filter((l) => l.to !== TICKETS_LINK.to).map(
                (l) => (
                  <Link key={l.to} to={l.to} className={row}>
                    <Icon
                      n={l.icon}
                      className="h-4 w-4 text-mortar dark:text-white/60"
                    />
                    {t(l.key)}
                  </Link>
                ),
              )}
              <button
                type="button"
                onClick={leave}
                className={`${row} text-left`}
              >
                <Icon
                  n="logout"
                  className="h-4 w-4 text-mortar dark:text-white/60"
                />
                {t("nav.signOut")}
              </button>
            </>
          )}

          {/* Language — the navbar dropdown is hidden on small phones */}
          <div className="mt-2 border-t border-navy/10 pt-4 sm:hidden dark:border-white/10">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-mortar dark:text-white/50">
              {t("nav.language")}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 px-3">
              {LANGUAGES.map((l) => {
                const on = lang === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    lang={l.code}
                    aria-pressed={on}
                    onClick={() => setLang(l.code)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold transition ${
                      on
                        ? "bg-navy text-white dark:bg-aqua dark:text-navy"
                        : "bg-mist text-mortar dark:bg-white/10 dark:text-white/70"
                    }`}
                  >
                    {on && <Icon n="check" className="h-4 w-4" />}
                    {l.native}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
