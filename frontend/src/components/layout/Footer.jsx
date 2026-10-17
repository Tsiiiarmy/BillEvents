import { Link } from 'react-router-dom'
import { SocialIcon } from '../common/SocialIcon'
import { Newsletter } from './Newsletter'
import useLanguage from '../../hooks/useLanguage'
import { LANGUAGES } from '../../i18n/languages'
import logoDark from '../../assets/logo/billevents-logo-reverse.svg'
import payMonogram from '../../assets/logo/billpay-monogram-reverse.svg'

const quick = [
  ['nav.discover', '/events'],
  ['nav.categories', '/#categories'],
  ['footer.howItWorks', '/#how'],
  ['footer.forOrganizers', '/#organizers'],
]

const support = [
  ['footer.help', '/help'],
  ['footer.contact', '/contact'],
  ['footer.terms', '/terms'],
  ['footer.privacy', '/privacy'],
]

// Brand names — not translated. TODO: real profile URLs.
const social = [
  ['Facebook', 'facebook'],
  ['X', 'x'],
  ['Instagram', 'instagram'],
  ['YouTube', 'youtube'],
  ['LinkedIn', 'linkedin'],
]

const link = 'transition hover:text-aqua'

export function Footer() {
  const { lang, setLang, t } = useLanguage()

  return (
    <>
      <Newsletter />

      <footer className="bg-navy text-white dark:bg-[#0F1A33]">
        <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <img src={logoDark} alt="BillEvents" className="h-10 w-auto" />
            <p className="mt-4 max-w-[17rem] text-sm leading-6 text-white/70">{t('footer.tagline')}</p>
            <Link
              to="/events"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-aqua"
            >
              {t('footer.explore')}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Quick links */}
          <nav aria-label={t('footer.quickLinks')}>
            <h3 className="font-heading font-bold">{t('footer.quickLinks')}</h3>
            <ul className="mt-4 grid gap-2.5 text-sm text-white/70">
              {quick.map(([key, to]) => (
                <li key={key}>
                  <Link to={to} className={link}>
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label={t('footer.support')}>
            <h3 className="font-heading font-bold">{t('footer.support')}</h3>
            <ul className="mt-4 grid gap-2.5 text-sm text-white/70">
              {support.map(([key, to]) => (
                <li key={key}>
                  <Link to={to} className={link}>
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Follow us */}
          <div>
            <h3 className="font-heading font-bold">{t('footer.follow')}</h3>
            <p className="mt-3 max-w-[14rem] text-sm leading-6 text-white/60">{t('footer.followText')}</p>
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

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="wrap flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/70 lg:flex-row">
            <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>

            <ul aria-label={t('footer.languages')} className="flex flex-wrap justify-center gap-5">
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button
                    type="button"
                    lang={l.code}
                    aria-pressed={lang === l.code}
                    onClick={() => setLang(l.code)}
                    className={`${link} ${lang === l.code ? 'font-bold text-white underline underline-offset-4' : ''}`}
                  >
                    {l.native}
                  </button>
                </li>
              ))}
            </ul>

            <p className="flex items-center gap-2">
              {t('footer.family')}
              <img src={payMonogram} alt="BillPay" className="h-5 w-auto" />
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}