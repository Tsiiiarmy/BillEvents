import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { SkipLink } from "../../components/common/SkipLink";
import { Icon } from "../../components/common/Icon";
import { Btn } from "../../components/common/Btn";
import { Reveal } from "../../components/common/Reveal";
import useOrganizer from "../../hooks/useOrganizer";
import { APPLICATION_STEPS, CHECKPOINTS } from "../../data/organizer";

export default function BecomeOrganizerPage({ theme, toggle }) {
  const { status } = useOrganizer();
  useEffect(() => {
    document.title = "Become an Organizer — BillEvents";
  }, []);

  // Already applied or approved? Send them to the right place instead.
  if (status !== "none") return <Navigate to="/organizer" replace />;

  return (
    <>
      <SkipLink />
      <Navbar theme={theme} toggle={toggle} />
      <main id="main">
        <section className="relative isolate overflow-hidden bg-mist dark:bg-navy-3">
          <div className="animate-drift absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-aqua/25 blur-3xl" />
          <div className="wrap grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
            <div>
              <p className="animate-up text-xs font-bold tracking-[0.25em] text-teal dark:text-aqua">
                FOR ORGANIZERS
              </p>
              <h1
                className="animate-up mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl"
                style={{ animationDelay: ".1s" }}
              >
                Become a BillEvents{" "}
                <span className="text-teal dark:text-aqua">Organizer</span>
              </h1>
              <p
                className="animate-up mt-5 max-w-lg text-lg text-mortar dark:text-white/75"
                style={{ animationDelay: ".2s" }}
              >
                Create, manage and sell tickets for your events on BillEvents.
                First, let’s get your organizer profile verified.
              </p>
              <div
                className="animate-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
                style={{ animationDelay: ".3s" }}
              >
                <Btn
                  as={Link}
                  to="/organizer/register"
                  className="bg-aqua px-6 py-3.5 text-base text-navy"
                >
                  Apply to Become an Organizer{" "}
                  <Icon
                    n="arrow"
                    className="h-4 w-4 transition group-hover:translate-x-1"
                  />
                </Btn>
                <Link
                  to="/organizer/status"
                  className="text-sm font-bold text-teal hover:underline dark:text-aqua"
                >
                  Already applied? Check status
                </Link>
              </div>
            </div>

            <Reveal delay={150}>
              <div className="rounded-3xl border border-navy/10 bg-white p-6 shadow-xl shadow-navy/10 sm:p-7 dark:border-white/10 dark:bg-navy-2 dark:shadow-none">
                <h2 className="font-heading text-lg font-bold">
                  Your application at a glance
                </h2>
                <p className="mt-1 text-sm text-mortar dark:text-white/60">
                  Six short steps. You can review everything before you submit.
                </p>
                <ol className="mt-5 grid gap-1">
                  {APPLICATION_STEPS.map((s, i) => (
                    <li
                      key={s.n}
                      className="relative flex items-center gap-4 py-2.5"
                    >
                      {i < APPLICATION_STEPS.length - 1 && (
                        <span
                          className="absolute left-5 top-12 h-full w-px bg-navy/15 dark:bg-white/15"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mist text-teal dark:bg-navy dark:text-aqua">
                        <Icon n={s.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-heading font-bold leading-tight">
                          <span className="mr-2 text-xs text-mortar dark:text-white/50">
                            {s.n}
                          </span>
                          {s.title}
                        </p>
                        <p className="text-sm text-mortar dark:text-white/60">
                          {s.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 sm:py-20" aria-labelledby="checkpoints">
          <div className="wrap">
            <Reveal>
              <h2
                id="checkpoints"
                className="font-heading text-3xl font-bold sm:text-4xl"
              >
                Two checkpoints before your event goes live
              </h2>
              <p className="mt-3 max-w-2xl text-mortar dark:text-white/70">
                We verify every organizer, and we review every event. It keeps
                BillEvents safe for organizers and attendees.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {CHECKPOINTS.map((c, i) => (
                <Reveal key={c.title} delay={i * 120}>
                  <div className="h-full rounded-2xl border border-navy/10 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 dark:border-white/10 dark:bg-navy-2 dark:hover:shadow-none">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-aqua text-navy">
                      <Icon n={c.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-bold">
                      <span className="mr-2 text-mortar dark:text-white/50">
                        {i + 1}.
                      </span>
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-mortar dark:text-white/70">
                      {c.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={100}>
              <div className="mt-10 rounded-2xl bg-mist p-6 sm:p-8 dark:bg-navy-3">
                <h3 className="font-heading text-lg font-bold">
                  What you’ll need
                </h3>
                <ul className="mt-4 grid gap-3 text-mortar sm:grid-cols-3 dark:text-white/75">
                  {[
                    "Your contact details",
                    "Verification documents (what’s required may vary by organizer type)",
                    "A short note about the events you organize",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-aqua text-navy">
                        <Icon n="check" className="h-3.5 w-3.5" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
