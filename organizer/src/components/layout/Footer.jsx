import { publicUrl } from '../../data/links'
import logoDark from '../../assets/logo/billevents-logo-reverse.svg'
import payMonogram from '../../assets/logo/billpay-monogram-reverse.svg'

const links = [
  ['Help', '/help'],
  ['Contact', '/contact'],
  ['Terms', '/terms'],
  ['Privacy', '/privacy'],
]

/** Slim organizer footer. Support pages live on the public site. */
export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="wrap flex flex-col items-center justify-between gap-6 py-8 text-sm lg:flex-row">
        <img src={logoDark} alt="BillEvents" className="h-8 w-auto" />

        <nav aria-label="Support">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/70">
            {links.map(([label, to]) => (
              <li key={to}>
                <a href={publicUrl(to)} className="transition hover:text-aqua">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="flex items-center gap-2 text-xs text-white/70">
          © {new Date().getFullYear()} BillEvents · Part of the BillPay family
          <img src={payMonogram} alt="BillPay" className="h-5 w-auto" />
        </p>
      </div>
    </footer>
  )
}