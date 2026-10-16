import { useEffect } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { SkipLink } from "../../components/common/SkipLink";
import { FilterBar } from "../../components/discover/FilterBar";
import { EventGrid } from "../../components/discover/EventGrid";
import useEventFilters from "../../hooks/useEventFilters";

export default function DiscoverPage({ theme, toggle }) {
  const { filters, setFilter, clear, hasFilters, results } = useEventFilters();
  useEffect(() => {
    document.title = "Discover Events — BillEvents";
  }, []);

  return (
    <>
      <SkipLink />
      <Navbar theme={theme} toggle={toggle} />
      <main id="main">
        <section className="relative isolate overflow-hidden bg-navy pb-24 pt-14 text-white sm:pt-20 dark:bg-navy-3">
          <div className="animate-drift absolute -left-24 -top-10 -z-10 h-80 w-80 rounded-full bg-aqua/25 blur-3xl" />
          <div className="wrap">
            <p className="animate-up text-xs font-bold tracking-[0.25em] text-aqua">
              DISCOVER EVENTS
            </p>
            <h1
              className="animate-up mt-4 max-w-2xl font-heading text-4xl font-bold leading-tight sm:text-6xl"
              style={{ animationDelay: ".1s" }}
            >
              Find your next <span className="text-aqua">unforgettable</span>{" "}
              moment.
            </h1>
            <p
              className="animate-up mt-4 max-w-xl text-lg text-white/80"
              style={{ animationDelay: ".2s" }}
            >
              Browse concerts, festivals, shows, exhibitions and outdoor
              experiences across Ethiopia.
            </p>
          </div>
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-14 w-full sm:h-20"
            aria-hidden="true"
          >
            <path
              className="animate-wave fill-aqua/45"
              d="M0 50C240 110 480 0 720 45S1200 100 1440 30V120H0Z"
            />
            <path
              className="fill-white dark:fill-navy"
              d="M0 85C260 125 520 45 760 80S1220 115 1440 75V120H0Z"
            />
          </svg>
        </section>

        <div className="wrap">
          <FilterBar filters={filters} setFilter={setFilter} />
        </div>

        <section className="wrap py-10" aria-label="Event results">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p aria-live="polite" className="font-heading text-xl font-bold">
              {results.length} {results.length === 1 ? "event" : "events"}
              {filters.category !== "All" && (
                <span className="font-normal text-mortar dark:text-white/60">
                  {" "}
                  in {filters.category}
                </span>
              )}
            </p>
            {hasFilters && (
              <button
                onClick={clear}
                className="text-sm font-bold text-teal hover:underline dark:text-aqua"
              >
                Clear all filters
              </button>
            )}
          </div>
          <EventGrid events={results} onClear={clear} />
        </section>
      </main>
      <Footer />
    </>
  );
}
