import { Icon } from '../common/Icon'
import { Reveal } from '../common/Reveal'
import { Btn } from '../common/Btn'
import { benefits } from '../../data'


/* ───────────── ORGANIZERS ───────────── */
export function Organizers() {
  return (
    <section id="organizers" className="pb-20">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-navy to-[#2C4A86] p-6 text-white sm:p-10 lg:p-14 dark:ring-1 dark:ring-aqua/20">
          <div className="animate-drift absolute -right-20 -top-20 h-80 w-80 rounded-full bg-aqua/25 blur-3xl" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.2em] text-aqua">FOR ORGANIZERS</p>
              <h2 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">Bring Your Event to Life</h2>
              <p className="mt-4 max-w-md text-white/80">Create, manage and sell tickets for your event — all in one place.</p>
              <ul className="mt-8 grid gap-5">
                {benefits.map((b) => (
                  <li key={b.title} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-aqua"><Icon n={b.icon} /></span>
                    <div><h3 className="font-heading font-bold">{b.title}</h3><p className="text-sm text-white/70">{b.text}</p></div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn as="a" href="#" className="bg-aqua text-navy">Create Event <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
                <Btn as="a" href="#how" variant="ghost">Learn More</Btn>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="animate-float rounded-2xl bg-white p-4 text-navy shadow-2xl sm:p-5" role="img" aria-label="Sample organizer dashboard showing tickets sold, revenue, sales chart and ticket inventory">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-sm font-bold">Event Performance</p>
                  <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold text-teal">SAMPLE DATA</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[['Tickets sold', '7,420'], ['Revenue', '5.08M ETB'], ['Upcoming', '6']].map(([l, v]) => (
                    <div key={l} className="rounded-xl bg-mist p-3"><p className="text-[10px] text-mortar">{l}</p><p className="font-heading text-base font-bold sm:text-lg">{v}</p></div>
                  ))}
                </div>
                <svg viewBox="0 0 300 100" className="mt-4 h-28 w-full" aria-hidden="true">
                  <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6BD6DA" stopOpacity=".55" /><stop offset="1" stopColor="#6BD6DA" stopOpacity="0" /></linearGradient></defs>
                  <path d="M0 80C40 70 60 40 100 50S160 85 200 45 270 15 300 20V100H0Z" fill="url(#area)" />
                  <path className="line" pathLength="1" d="M0 80C40 70 60 40 100 50S160 85 200 45 270 15 300 20" fill="none" stroke="#3364AA" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="mt-3 grid gap-2.5">
                  {[['Early Bird', 0.82], ['Regular', 0.56], ['VIP', 0.28]].map(([l, w]) => (
                    <div key={l} className="flex items-center gap-3 text-xs"><span className="w-16 text-mortar">{l}</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-mist"><span className="bar block h-full rounded-full bg-aqua" style={{ '--w': w }} /></span></div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}