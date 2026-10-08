import { Icon } from '../common/Icon'
import { Reveal } from '../common/Reveal'
import { events } from '../../data'
import logoLight from '../../assets/logo/billevents-logo.svg'

const AppleLogo = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
)
const PlayLogo = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
  </svg>
)

// Before launch, swap these for the official App Store / Google Play badges.
function StoreButton({ logo, small, big }) {
  return (
    <a href="#" aria-label={`${small} ${big}`} className="group flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-navy shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <span className="transition duration-300 group-hover:scale-110">{logo}</span>
      <span className="text-left leading-tight">
        <span className="block text-[11px] opacity-70">{small}</span>
        <span className="block font-heading text-lg font-bold">{big}</span>
      </span>
    </a>
  )
}

// Phone screen mockup (always light, like a real app screen)
function Phone() {
  const [feat, ...rest] = events
  const upcoming = [rest[0], rest[2]]
  return (
    <div className="animate-float mx-auto h-[28rem] w-60 rounded-[2.5rem] border-[8px] border-[#0c1830] bg-white p-3 text-navy shadow-2xl">
      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-navy/20" />
      <div className="flex items-center justify-between">
        <img src={logoLight} alt="BillEvents" className="h-5 w-auto" />
        <Icon n="search" className="h-4 w-4 text-mortar" />
      </div>
      <div className={`mt-3 flex flex-col justify-end rounded-xl bg-linear-to-br ${feat.grad} p-3 text-white`} style={{ height: 104 }}>
        <p className="font-heading text-xs font-bold">{feat.title}</p>
        <p className="text-[9px] opacity-85">{feat.date.split(' · ')[0]} · {feat.venue}</p>
        <span className="mt-1.5 w-fit rounded-full bg-aqua px-2.5 py-1 text-[9px] font-bold text-navy">Get Tickets</span>
      </div>
      <p className="mt-3 text-[10px] font-bold">Upcoming Events</p>
      <ul className="mt-1.5 grid gap-2">
        {upcoming.map((e) => (
          <li key={e.id} className="flex items-center gap-2 rounded-lg border border-navy/10 p-2">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md bg-linear-to-br ${e.grad}`}><Icon n={e.icon} className="h-4 w-4 text-white/90" /></span>
            <span className="min-w-0"><span className="block truncate text-[10px] font-bold">{e.title}</span><span className="block text-[9px] text-mortar">{e.date.split(' · ')[0]}</span></span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AppSection() {
  return (
    <section id="app" className="py-20 lg:pt-28">
      <div className="wrap">
        <Reveal>
          <div className="relative grid items-end rounded-3xl bg-linear-to-r from-navy from-45% to-[#2FB3BD] shadow-2xl shadow-navy/25 lg:min-h-[20rem] lg:grid-cols-[19rem_1fr_21rem] dark:ring-1 dark:ring-aqua/25">
            {/* decorative background (clipped to the rounded panel) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
              <div className="animate-drift absolute -right-10 -top-16 h-72 w-72 rounded-full bg-aqua/30 blur-3xl" />
              <svg viewBox="0 0 400 120" fill="none" stroke="white" className="absolute -right-6 bottom-4 hidden w-[26rem] opacity-25 lg:block">
                {[0, 10, 20].map((o) => <path key={o} className="animate-wave" strokeWidth="1.5" d={`M0 ${70 + o}C80 ${10 + o} 140 ${120 + o} 220 ${60 + o}S340 ${20 + o} 400 ${50 + o}`} />)}
              </svg>
            </div>

            {/* phone: top pokes out of the panel on desktop, bottom is cropped */}
            <div className="relative order-2 mx-auto mt-2 h-[22rem] w-64 overflow-hidden lg:order-1 lg:-mt-14 lg:mb-0 lg:h-[24rem]">
              <Phone />
            </div>

            {/* text */}
            <div className="relative order-1 self-center px-6 py-12 text-center text-white lg:order-2 lg:px-4 lg:text-left">
              <p className="text-xs font-bold tracking-[0.2em] text-aqua">GET THE BILLEVENTS APP</p>
              <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">Your events, always with you.</h2>
              <p className="mx-auto mt-3 max-w-md text-white/80 lg:mx-0">Discover new events, keep your tickets close, and stay ready for your next experience.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-4 lg:justify-start">
                <StoreButton logo={<AppleLogo />} small="Download on the" big="App Store" />
                <StoreButton logo={<PlayLogo />} small="Get it on" big="Google Play" />
              </div>
            </div>

            {/* right side: decorative cards (a photo can go here later) */}
            <div className="relative order-3 hidden h-full min-h-[18rem] lg:block" aria-hidden="true">
              <div className="absolute right-10 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-white/10" />
              <div className="absolute right-20 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-aqua/40" />
              <div className="animate-float absolute right-28 top-12 flex items-center gap-2 rounded-2xl bg-white p-3 text-navy shadow-xl">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-aqua"><Icon n="ticket" className="h-5 w-5" /></span>
                <span className="leading-tight"><span className="block text-xs font-bold">Ticket ready</span><span className="block text-[10px] text-mortar">2 × Regular</span></span>
              </div>
              <div className="absolute bottom-14 right-6 flex items-center gap-2 rounded-2xl bg-white/15 p-3 text-white shadow-xl backdrop-blur-md" style={{ animation: 'float 7s ease-in-out -2s infinite' }}>
                <Icon n="heart" className="h-5 w-5 fill-current text-aqua" />
                <span className="text-xs font-bold">Saved events</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}