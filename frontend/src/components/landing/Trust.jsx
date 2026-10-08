import { BillPay } from '../common/Brand'
import { Reveal } from '../common/Reveal'

export function Trust() {
  return (
    <section className="py-16">
      <Reveal className="wrap flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-bold tracking-wide text-mortar dark:text-white/70">
          Secure payments powered by
        </p>

        <BillPay className="h-10" />

        <p className="text-xs tracking-[0.25em] text-mortar dark:text-white/60">
          SAFE • SIMPLE • RELIABLE
        </p>
      </Reveal>
    </section>
  )
}