import { Icon } from '../common/Icon'
import { Reveal } from '../common/Reveal'
import { Heading } from '../common/Heading'
import { steps } from '../../data'



/* ───────────── HOW IT WORKS ───────────── */
export function HowItWorks() {
  return (
    <section id="how" className="py-20">
      <div className="wrap">
        <Heading eyebrow="HOW IT WORKS" title="Great experiences in four simple steps." />
        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden border-t-2 border-dashed border-aqua/70 lg:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 140} className="relative text-center">
              <div className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-teal shadow-xl shadow-navy/10 ring-1 ring-navy/10 dark:bg-navy-2 dark:text-aqua dark:ring-aqua/30">
                <Icon n={s.icon} className="h-8 w-8" />
                <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-navy text-[11px] font-bold text-white dark:bg-aqua dark:text-navy">{s.n}</span>
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm text-mortar dark:text-white/70">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}