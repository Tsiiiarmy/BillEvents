import { Link } from 'react-router-dom'
import { SocialIcon } from '../common/SocialIcon'
import { Newsletter } from './NewsLetter'
import logoDark from '../../assets/logo/billevents-logo-reverse.svg'
import payMonogram from '../../assets/logo/billpay-monogram-reverse.svg'

const quick = [
  ['Discover', '/events'],
  ['Categories', '/#categories'],
  ['How It Works', '/#how'],
  ['For Organizers', '/#organizers'],
]

const support = [
  'Help Center',
  'Contact Us',
  'Terms & Conditions',
  'Privacy Policy',
]

const social = [
  ['Facebook', 'facebook'],
  ['X', 'x'],
  ['Instagram', 'instagram'],
  ['YouTube', 'youtube'],
  ['LinkedIn', 'linkedin'],
]

const langs = ['English', 'Amharic', 'Afaan Oromoo', 'Tigrinya']

const link = 'transition hover:text-aqua'

export function Footer() {
  return (
    <>
      <Newsletter />

      <footer className="bg-navy text-white dark:bg-[#0F1A33]">
        {/* Main Footer */}
        <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <img
              src={logoDark}
              alt="BillEvents"
              className="h-10 w-auto"
            />

            <p className="mt-4 max-w-[17rem] text-sm leading-6 text-white/70">
              Discover unforgettable experiences, all in one place.
            </p>

            <Link
              to="/events"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-aqua"
            >
              Explore Events
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="font-heading font-bold">
              Quick Links
            </h3>

            <ul className="mt-4 grid gap-2.5 text-sm text-white/70">
              {quick.map(([text, to]) => (
                <li key={text}>
                  <Link to={to} className={link}>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support">
            <h3 className="font-heading font-bold">
              Support
            </h3>

            <ul className="mt-4 grid gap-2.5 text-sm text-white/70">
              {support.map((text) => (
                <li key={text}>
                  <a href="#" className={link}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Follow Us */}
          <div>
            <h3 className="font-heading font-bold">
              Follow Us
            </h3>

            <p className="mt-3 max-w-[14rem] text-sm leading-6 text-white/60">
              Stay connected and never miss what’s happening.
            </p>

            <ul className="-ml-2 mt-3 flex flex-wrap">
              {social.map(([label, name]) => (
                <li key={name}>
                  <a
                    href="#"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full text-white/90 transition duration-300 hover:-translate-y-1 hover:text-aqua"
                  >
                    <SocialIcon name={name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10">
          <div className="wrap flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/70 lg:flex-row">

            <p>
              © 2026 BillEvents. All rights reserved.
            </p>

            <ul className="flex flex-wrap justify-center gap-5">
              {langs.map((language) => (
                <li key={language}>
                  <a href="#" className={link}>
                    {language}
                  </a>
                </li>
              ))}
            </ul>

            <p className="flex items-center gap-2">
              Part of the BillPay family
              <img
                src={payMonogram}
                alt="BillPay"
                className="h-5 w-auto"
              />
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}