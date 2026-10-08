import { Icon } from '../common/Icon'
import { Reveal } from '../common/Reveal'
import { Btn } from '../common/Btn'


/* ───────────── APP ───────────── */
export function AppSection() {
  const qr = Array.from({ length: 81 }, (_, i) => (i * 7 + (i % 9) * 3) % 5 < 2)
  const Store = ({ small, big }) => (
    <a href="#" className="rounded-xl bg-navy px-5 py-2.5 text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-navy-2 dark:bg-white dark:text-navy dark:hover:bg-white/90">
      <span className="block text-[10px] leading-none opacity-75">{small}</span><span className="font-heading text-base font-bold">{big}</span>
    </a>
  )
  return (
    <section id="app" className="overflow-hidden bg-mist py-20 dark:bg-navy-3">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="flex justify-center">
          <div className="relative">
            <div className="animate-float relative h-[30rem] w-60 rounded-[2.5rem] border-[8px] border-navy bg-white p-3 text-navy shadow-2xl dark:border-[#0c1830]">
              <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-navy/20" />
              <p className="text-[10px] text-mortar">Discover</p>
              <p className="font-heading text-sm font-bold">Events near you</p>
              <div className="mt-2 flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-[10px] text-mortar"><Icon n="search" className="h-3 w-3" />Search events...</div>
              <div className="mt-3 flex items-end rounded-xl bg-linear-to-br from-aqua via-[#3364AA] to-navy p-3 text-white" style={{ height: 96 }}>
                <div><p className="font-heading text-xs font-bold">Addis Summer Festival</p><p className="text-[9px] opacity-80">Oct 24 · Millennium Hall</p></div>
              </div>
              <p className="mt-3 text-[10px] font-bold">Your ticket</p>
              <div className="mt-1.5 rounded-xl border border-navy/10 p-3 text-center">
                <div className="mx-auto grid w-24 grid-cols-9 gap-px">{qr.map((on, i) => <span key={i} className={`aspect-square ${on ? 'bg-navy' : 'bg-transparent'}`} />)}</div>
                <p className="mt-2 text-[9px] text-mortar">Show at the entrance</p>
              </div>
            </div>
            <div className="absolute -right-10 top-24 hidden rounded-xl bg-white p-3 text-navy shadow-xl sm:block" style={{ animation: 'float 7s ease-in-out -2s infinite' }}>
              <p className="flex items-center gap-1.5 text-[11px] font-bold"><Icon n="ticket" className="h-4 w-4 text-teal" />Ticket ready</p><p className="text-[10px] text-mortar">2 × Regular</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xs font-bold tracking-[0.2em] text-teal dark:text-aqua">GET THE BILLEVENTS APP</p>
          <h2 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">Your events, always with you.</h2>
          <p className="mt-4 max-w-md text-mortar dark:text-white/70">Discover new events, keep your tickets close, and stay ready for your next experience.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Store small="Download on the" big="App Store" /><Store small="Get it on" big="Google Play" /></div>
          <Btn as="a" href="#" variant="dark" className="mt-6">Get the App <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
        </Reveal>
      </div>
    </section>
  )
}