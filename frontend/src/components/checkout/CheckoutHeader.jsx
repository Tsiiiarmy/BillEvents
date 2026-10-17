import { Link } from "react-router-dom";

import { Logo } from "../common/Brand";
import { Icon } from "../common/Icon";
import { ThemeToggle } from "../common/ThemeToggle";
import useLanguage from "../../hooks/useLanguage";

/** `key` is the translation key; `label` stays as the English fallback. */
export const CHECKOUT_STEPS = [
  { id: "details", key: "co.step.details", label: "Your details" },
  { id: "payment", key: "co.step.payment", label: "Payment" },
  { id: "done", key: "co.step.done", label: "Confirmation" },
];

/**
 * Slim header for the checkout flow. Deliberately has no main navigation:
 * once someone is paying we don't want to invite them away from the page.
 */
export function CheckoutHeader({
  theme,
  toggle,
  current = "details",
  backTo = "/events",
  backLabel,
}) {
  const { t } = useLanguage();
  const index = Math.max(
    0,
    CHECKOUT_STEPS.findIndex((s) => s.id === current),
  );

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white/90 backdrop-blur-lg dark:border-white/10 dark:bg-ink/90">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-5">
          <Link to="/" aria-label={t("nav.home")}>
            <Logo theme={theme} className="h-8" />
          </Link>
          <Link
            to={backTo}
            className="hidden items-center gap-1.5 text-sm font-bold text-teal hover:underline sm:flex dark:text-aqua"
          >
            <Icon n="arrowleft" className="h-4 w-4" />
            {backLabel ?? t("co.back")}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <p className="flex items-center gap-1.5 text-xs font-bold text-mortar dark:text-white/60">
            <Icon n="lock" className="h-4 w-4" />
            <span className="hidden sm:inline">{t("co.secure")}</span>
          </p>
          <ThemeToggle theme={theme} toggle={toggle} />
        </div>
      </div>

      <div className="border-t border-navy/10 dark:border-white/10">
        <nav aria-label={t("co.progress")} className="wrap py-3">
          {/* Mobile: compact text. Desktop: numbered track. */}
          <p className="text-sm font-bold sm:hidden">
            <span className="text-mortar dark:text-white/60">
              {t("co.stepOf", { n: index + 1, total: CHECKOUT_STEPS.length })}
            </span>
            {t(CHECKOUT_STEPS[index].key)}
          </p>

          <ol className="hidden items-center gap-3 sm:flex">
            {CHECKOUT_STEPS.map((step, i) => {
              const done = i < index;
              const now = i === index;
              return (
                <li
                  key={step.id}
                  className="flex flex-1 items-center gap-3 last:flex-none"
                >
                  <span
                    className="flex items-center gap-2.5"
                    aria-current={now ? "step" : undefined}
                  >
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                        done
                          ? "bg-teal text-white dark:bg-aqua dark:text-navy"
                          : now
                            ? "bg-navy text-white dark:bg-aqua dark:text-navy"
                            : "border border-navy/20 text-mortar dark:border-white/20 dark:text-white/50"
                      }`}
                    >
                      {done ? <Icon n="check" className="h-4 w-4" /> : i + 1}
                    </span>
                    <span
                      className={`text-sm ${now ? "font-bold" : "text-mortar dark:text-white/55"}`}
                    >
                      {t(step.key)}
                    </span>
                    {done && (
                      <span className="sr-only">{t("co.completed")}</span>
                    )}
                  </span>
                  {i < CHECKOUT_STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`h-px flex-1 ${done ? "bg-teal dark:bg-aqua" : "bg-navy/15 dark:bg-white/15"}`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
}
