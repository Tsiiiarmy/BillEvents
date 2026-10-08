import { BillPay } from '../common/Brand'
import logoDark from '../../assets/logo/billevents-logo-reverse.svg'

/* ───────────── FOOTER ───────────── */
export function Footer() {
  const cols = [
    ['Discover', ['Events', 'Categories', 'Upcoming Events']],
    ['For Organizers', ['Create Event', 'Organizer Dashboard', 'How It Works']],
    ['Support', ['Help Center', 'Contact', 'Terms & Conditions', 'Privacy Policy']],
  ]
  return (
    <footer className="bg-navy text-white dark:bg-[#0F1A33]">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div><img src={logoDark} alt="BillEvents" className="h-9 w-auto" /><p className="mt-4 max-w-[14rem] text-sm text-white/70">Discover unforgettable experiences.</p></div>
        {cols.map(([t, ls]) => (
          <div key={t}><h3 className="font-heading font-bold">{t}</h3>
            <ul className="mt-4 grid gap-2.5 text-sm text-white/70">{ls.map((l) => <li key={l}><a href="#" className="transition hover:text-aqua">{l}</a></li>)}</ul></div>
        ))}
        <div><h3 className="font-heading font-bold">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            {[['Facebook', 'f'], ['X', '𝕏'], ['Instagram', 'ig'], ['YouTube', '▶']].map(([n, g]) => (
              <a key={n} href="#" aria-label={n} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-sm font-bold transition hover:-translate-y-1 hover:border-aqua hover:bg-aqua hover:text-navy">{g}</a>
            ))}
          </div></div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/70 md:flex-row">
          <p className="flex items-center gap-2">© 2026 BillEvents. Powered by <BillPay fixedDark className="h-5" /></p>
          <ul className="flex flex-wrap justify-center gap-5">{['English', 'Amharic', 'Afaan Oromoo', 'Tigrinya'].map((l) => <li key={l}><a href="#" className="hover:text-aqua">{l}</a></li>)}</ul>
        </div>
      </div>
    </footer>
  )
}