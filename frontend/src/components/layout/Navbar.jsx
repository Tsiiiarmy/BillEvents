import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

/**
 * Landing page, at the top: see-through over the hero photo, all white.
 * After scrolling (and on every other page): the white bar.
 * The see-through state adds the `dark` class to the header, which makes
 * everything inside it (menus, toggle, logo) use its white-on-dark look.
 */
export function Navbar({ theme, toggle }) {
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isSignedIn, signOut } = useAuth();
  const { lang, setLang, t } = useLanguage();

  const navRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const f = () => setSc(window.scrollY > 40);
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

  /* Sliding underline: follows the hovered/focused link, rests under the
     current page's link, hides when there isn't one. */
  const moveTo = (el) => {
    const line = lineRef.current;
    if (!line) return;
    if (!el) {
      line.style.opacity = "0";
      return;
    }
    const pad = 16; // matches px-4 on the links
    line.style.setProperty("--x", `${el.offsetLeft + pad}px`);
    line.style.setProperty("--w", `${el.offsetWidth - pad * 2}px`);
    line.style.opacity = "1";
  };
  const restOnActive = () =>
    moveTo(navRef.current?.querySelector('[aria-current="page"]'));

  useLayoutEffect(() => {
    restOnActive();
    document.fonts?.ready.then(restOnActive);
    window.addEventListener("resize", restOnActive);
    return () => window.removeEventListener("resize", restOnActive);
  }, [pathname, lang, isSignedIn]);

  const leave = () => {
    setOpen(false);
    signOut();
    navigate("/");
  };

  const links = isSignedIn ? [...BASE_LINKS, TICKETS_LINK] : BASE_LINKS;
  const isOn = (l) => Boolean(l.match?.(pathname));

  // See-through only on the landing page, at the top, with the menu closed.
  const overlay = pathname === "/" && !sc && !open;

  // Come back to the same page after signing in.
  const signInTo =
    pathname === "/" ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup")
      ? "/signin"
      : `/signin?next=${encodeURIComponent(pathname)}`;

  const row =
    "flex items-center gap-3 rounded-lg px-3 py-3 font-medium hover:bg-mist dark:hover:bg-white/10";

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        overlay
          ? "dark border-b border-transparent bg-linear-to-b from-navy/50 to-transparent text-white"
          : "border-b border-navy/10 bg-white/90 text-navy shadow-lg shadow-navy/10 backdrop-blur-lg dark:border-white/10 dark:bg-ink/85 dark:text-white dark:shadow-black/20"
      }`}
    >
      {/* logo | links (centred) | controls */}
      <div className="wrap grid h-16 grid-cols-[auto_1fr] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Link to="/" aria-label={t("nav.home")} className="justify-self-start">
          <Logo theme={overlay ? "dark" : theme} className="h-8" />
        </Link>

        <nav
          ref={navRef}
          aria-label={t("nav.main")}
          onMouseLeave={restOnActive}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) restOnActive();
          }}
          className="relative hidden h-16 items-center lg:flex"
        >
          <span
            ref={lineRef}
            aria-hidden="true"
            className="slide-pill absolute bottom-3 left-0 h-0.5 rounded-full bg-navy dark:bg-white"
          />
          {links.map((l) => {
            const on = isOn(l);
            return (
              <Link
                key={l.key}
                to={l.to}
                aria-current={on ? "page" : undefined}
                onMouseEnter={(e) => moveTo(e.currentTarget)}
                onFocus={(e) => moveTo(e.currentTarget)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2 text-sm transition-colors ${
                  on
                    ? "font-bold text-navy dark:text-white"
                    : "font-medium text-navy/70 hover:text-navy dark:text-white/90 dark:hover:text-white"
                }`}
              >
                {l.icon && <Icon n={l.icon} className="h-4 w-4" />}
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-self-end gap-1">
          <div className="hidden sm:block">
            <LanguageMenu />
          </div>

          <ThemeToggle theme={theme} toggle={toggle} />

          <span aria-hidden="true" className="mx-1.5 hidden h-6 w-px bg-navy/10 sm:block dark:bg-white/20" />

          {isSignedIn ? (
            <UserMenu />
          ) : (
            <>
              {/* The wrapper does the hiding — Btn's own inline-flex would override `hidden` */}
              <span className="hidden sm:block">
                <Btn
                  as={Link}
                  to={signInTo}
                  className={`whitespace-nowrap transition ${
                    overlay
                      ? "bg-transparent text-white ring-1 ring-white/70 hover:bg-white hover:text-navy"
                      : "bg-navy text-white hover:bg-navy/90 dark:bg-white dark:text-navy dark:hover:bg-white/90"
                  }`}
                >
                  <Icon n="user" className="h-4 w-4" />
                  {t("nav.signIn")}
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
          className="wrap menu-in grid gap-1 border-t border-navy/10 py-4 lg:hidden dark:border-white/10"
        >
          {!isSignedIn && (
            <Link
              to={signInTo}
              className="mb-2 flex items-center gap-3 rounded-xl bg-mist px-3 py-3 transition hover:bg-navy/10 sm:hidden dark:bg-navy-2 dark:hover:bg-white/10"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-white dark:bg-white dark:text-navy">
                <Icon n="user" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-sm font-bold">{t("nav.signIn")}</span>
                <span className="block truncate text-xs text-mortar dark:text-white/60">
                  {t("nav.signInHint")}
                </span>
              </span>
              <Icon n="arrow" className="h-4 w-4 shrink-0" />
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
              {l.icon && <Icon n={l.icon} className="h-4 w-4 text-mortar dark:text-white/60" />}
              {t(l.key)}
            </Link>
          ))}

          {isSignedIn && (
            <>
              <hr className="my-2 border-navy/10 dark:border-white/10" />
              {ACCOUNT_LINKS.filter((l) => l.to !== TICKETS_LINK.to).map((l) => (
                <Link key={l.to} to={l.to} className={row}>
                  <Icon n={l.icon} className="h-4 w-4 text-mortar dark:text-white/60" />
                  {t(l.key)}
                </Link>
              ))}
              <button type="button" onClick={leave} className={`${row} text-left`}>
                <Icon n="logout" className="h-4 w-4 text-mortar dark:text-white/60" />
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
                        ? "bg-navy text-white dark:bg-white dark:text-navy"
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