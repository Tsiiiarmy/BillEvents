import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import useLanguage, { translate } from '../../hooks/useLanguage'

import { Icon } from '../../components/common/Icon'
import { Logo, BillPay } from '../../components/common/Brand'
import { Btn } from '../../components/common/Btn'
import { ThemeToggle } from '../../components/common/ThemeToggle'
import { LanguageMenu } from '../../components/layout/LanguageMenu'

import heroImg from '../../assets/images/hero-addis-concert.jpg'
import logoDark from '../../assets/logo/billevents-logo-reverse.svg'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^(\+251|251|0)?[79]\d{8}$/ // Ethiopian mobile, e.g. 911234567 or 0911234567
const strength = (p) =>
  [p.length >= 8, /[A-Z]/.test(p) && /[a-z]/.test(p), /\d/.test(p), /[^A-Za-z0-9]/.test(p)].filter(Boolean).length

function Field({ id, label, icon, value, onChange, error, right, prefix, ...p }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-white px-3.5 transition focus-within:ring-4 dark:bg-navy-2 ${
          error
            ? 'border-red-500 focus-within:ring-red-500/20'
            : 'border-navy/15 focus-within:border-aqua focus-within:ring-aqua/30 dark:border-white/15'
        }`}
      >
        <Icon n={icon} className="h-4 w-4 shrink-0 text-mortar dark:text-white/50" />
        {prefix && (
          <span className="border-r border-navy/15 pr-2 text-sm font-bold text-mortar dark:border-white/15 dark:text-white/60">
            {prefix}
          </span>
        )}
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className="min-w-0 flex-1 bg-transparent py-3 outline-none placeholder:text-mortar/50 dark:placeholder:text-white/30"
          {...p}
        />
        {right}
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

function PasswordField({ show, setShow, ...p }) {
  const { t } = useLanguage()
  return (
    <Field
      type={show ? 'text' : 'password'}
      icon="lock"
      {...p}
      right={
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={t(show ? 'auth.pwHide' : 'auth.pwShow')}
          className="grid h-8 w-8 place-items-center rounded-full text-mortar transition hover:bg-navy/10 dark:text-white/60 dark:hover:bg-white/10"
        >
          <Icon n={show ? 'eyeoff' : 'eye'} className="h-4 w-4" />
        </button>
      }
    />
  )
}

const PERKS = [
  ['ticket', 'auth.perk1'],
  ['heart', 'auth.perk2'],
  ['shield', 'auth.perk3'],
]

// "mikiyas.g" → "Mikiyas G". Only used when someone signs in with an email
// and we have no real name for them yet.
const nameFromEmail = (email) =>
  email
    .split('@')[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ') || 'BillEvents user'

export default function AuthPage({ mode, theme, toggle }) {
  const up = mode === 'signup'
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { signIn } = useAuth()
  const { lang, t } = useLanguage()

  // ?next=/checkout sends you back where you came from. Only in-app paths allowed.
  const raw = params.get('next') || ''
  const next = raw.startsWith('/') && !raw.startsWith('//') ? raw : null
  const [v, setV] = useState({ name: '', phone: '', email: '', id: '', password: '', terms: false, remember: true })
  const [err, setErr] = useState({}) // translation KEYS
  const [show, setShow] = useState(false)
  const [done, setDone] = useState(false)
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }))
  const s = strength(v.password)
  const e = (k) => (err[k] ? t(err[k]) : undefined)

  useEffect(() => {
    document.title = `${translate(lang, up ? 'auth.tabSignUp' : 'auth.tabSignIn')} — BillEvents`
  }, [lang, up])

  const submit = (ev) => {
    ev.preventDefault()
    const x = {}
    if (up) {
      if (v.name.trim().length < 2) x.name = 'err.name'
      if (!PHONE.test(v.phone.replace(/\s/g, ''))) x.phone = 'co.errPhone'
      if (!EMAIL.test(v.email)) x.email = 'err.email'
      if (v.password.length < 8) x.password = 'auth.errPassword'
      if (!v.terms) x.terms = 'auth.errTerms'
    } else {
      if (!(EMAIL.test(v.id) || PHONE.test(v.id.replace(/\s/g, '')))) x.id = 'auth.errId'
      if (!v.password) x.password = 'auth.errPwEmpty'
    }
    setErr(x)
    if (Object.keys(x).length) return

    // Front-end only. There is no password check — useAuth just remembers who you are.
    const byEmail = EMAIL.test(v.id)
    signIn(
      up
        ? { name: v.name.trim(), email: v.email.trim(), phone: v.phone.replace(/\s/g, '') }
        : {
            name: byEmail ? nameFromEmail(v.id.trim()) : 'BillEvents user',
            email: byEmail ? v.id.trim() : '',
            phone: byEmail ? '' : v.id.replace(/\s/g, ''),
          },
    )

    if (next) navigate(next, { replace: true })
    else setDone(true)
  }

  const linkCls = 'font-bold text-teal underline dark:text-aqua'
  // The two links sit in a different place in each language's sentence.
  const termsParts = t('auth.terms').split(/(\{terms\}|\{privacy\})/)

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Left: cinematic brand panel (desktop only) */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-navy p-12 text-white lg:flex">
        <img src={heroImg} alt="" className="kenburns absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/80 to-navy/50" />
        <div className="animate-drift absolute -left-20 top-20 -z-10 h-96 w-96 rounded-full bg-aqua/25 blur-3xl" />
        <Link to="/" aria-label={t('nav.home')}>
          <img src={logoDark} alt="BillEvents" className="h-9 w-auto" />
        </Link>
        <div>
          <h2 className="animate-up max-w-md font-heading text-5xl font-bold leading-tight">{t(`auth.${mode}.big`)}</h2>
          <ul className="mt-8 grid gap-4">
            {PERKS.map(([ic, key], i) => (
              <li
                key={key}
                className="animate-up flex items-center gap-3 text-white/90"
                style={{ animationDelay: `${0.2 + i * 0.12}s` }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-aqua backdrop-blur">
                  <Icon n={ic} />
                </span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
        <p className="flex items-center gap-2 text-sm text-white/70">
          {t('trust.lead')} <BillPay fixedDark className="h-5" />
        </p>
      </aside>

      {/* Right: form */}
      <main className="flex flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="lg:hidden" aria-label={t('nav.home')}>
            <Logo className="h-8" />
          </Link>
          <Link
            to="/"
            className="hidden items-center gap-2 text-sm font-bold text-teal hover:underline lg:flex dark:text-aqua"
          >
            <Icon n="arrow" className="h-4 w-4 rotate-180" />
            {t('auth.backToEvents')}
          </Link>
          <div className="flex items-center gap-1">
            <LanguageMenu />
            <ThemeToggle theme={theme} toggle={toggle} />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          {done ? (
            <div className="animate-up text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-aqua text-navy">
                <Icon n="check" className="h-8 w-8" />
              </span>
              <h1 className="mt-6 font-heading text-3xl font-bold">{t(up ? 'auth.doneUp' : 'auth.doneIn')}</h1>
              <p className="mt-3 text-mortar dark:text-white/70">{t('auth.doneText')}</p>
              <Btn as={Link} to="/" variant="dark" className="mt-8">
                {t('auth.backToEvents')}
              </Btn>
            </div>
          ) : (
            <div className="animate-up">
              <div className="mb-8 grid grid-cols-2 rounded-full bg-mist p-1 dark:bg-navy-2">
                {[
                  ['/signin', 'auth.tabSignIn', 'signin'],
                  ['/signup', 'auth.tabSignUp', 'signup'],
                ].map(([to, key, m]) => (
                  <Link
                    key={m}
                    to={next ? `${to}?next=${encodeURIComponent(next)}` : to}
                    aria-current={mode === m ? 'page' : undefined}
                    className={`rounded-full py-2.5 text-center text-sm font-bold transition ${
                      mode === m
                        ? 'bg-navy text-white shadow dark:bg-aqua dark:text-navy'
                        : 'text-mortar hover:text-navy dark:text-white/60 dark:hover:text-white'
                    }`}
                  >
                    {t(key)}
                  </Link>
                ))}
              </div>
              <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t(`auth.${mode}.title`)}</h1>
              <p className="mt-2 text-mortar dark:text-white/70">{t(`auth.${mode}.sub`)}</p>

              <form onSubmit={submit} noValidate className="mt-8 grid gap-5">
                {up ? (
                  <>
                    <Field
                      id="name"
                      label={t('co.name')}
                      icon="user"
                      autoComplete="name"
                      placeholder="Abebe Kebede"
                      value={v.name}
                      onChange={set('name')}
                      error={e('name')}
                    />
                    <Field
                      id="phone"
                      label={t('co.phone')}
                      icon="phone"
                      prefix="+251"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="911 234 567"
                      value={v.phone}
                      onChange={set('phone')}
                      error={e('phone')}
                    />
                    <Field
                      id="email"
                      label={t('co.email')}
                      icon="mail"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={v.email}
                      onChange={set('email')}
                      error={e('email')}
                    />
                  </>
                ) : (
                  <Field
                    id="id"
                    label={t('auth.id')}
                    icon="user"
                    autoComplete="username"
                    placeholder={t('auth.idPlaceholder')}
                    value={v.id}
                    onChange={set('id')}
                    error={e('id')}
                  />
                )}

                <div>
                  <PasswordField
                    id="password"
                    label={t('auth.password')}
                    show={show}
                    setShow={setShow}
                    autoComplete={up ? 'new-password' : 'current-password'}
                    placeholder={t(up ? 'auth.pwNew' : 'auth.pwCurrent')}
                    value={v.password}
                    onChange={set('password')}
                    error={e('password')}
                  />
                  {up && v.password && (
                    <div className="mt-2.5" aria-live="polite">
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map((n) => (
                          <span
                            key={n}
                            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                              s >= n
                                ? s <= 1
                                  ? 'bg-red-500'
                                  : s <= 2
                                    ? 'bg-amber-500'
                                    : 'bg-aqua'
                                : 'bg-navy/10 dark:bg-white/15'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-xs text-mortar dark:text-white/60">
                        {t('auth.strength', { level: t(`auth.s${s}`) })}
                      </p>
                    </div>
                  )}
                </div>

                {up ? (
                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={v.terms}
                        onChange={(ev) => set('terms')(ev.target.checked)}
                        aria-invalid={!!err.terms}
                        aria-describedby={err.terms ? 'terms-err' : undefined}
                        className="mt-0.5 h-4 w-4 accent-[#0E7C86]"
                      />
                      <span>
                        {termsParts.map((part, i) =>
                          part === '{terms}' ? (
                            <Link key={i} to="/terms" target="_blank" rel="noopener" className={linkCls}>
                              {t('footer.terms')}
                            </Link>
                          ) : part === '{privacy}' ? (
                            <Link key={i} to="/privacy" target="_blank" rel="noopener" className={linkCls}>
                              {t('footer.privacy')}
                            </Link>
                          ) : (
                            <span key={i}>{part}</span>
                          ),
                        )}
                      </span>
                    </label>
                    {err.terms && (
                      <p id="terms-err" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                        {t(err.terms)}
                      </p>
                    )}
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={v.remember}
                      onChange={(ev) => set('remember')(ev.target.checked)}
                      className="h-4 w-4 accent-[#0E7C86]"
                    />
                    {t('auth.remember')}
                  </label>
                )}

                <Btn type="submit" className="w-full bg-aqua py-3.5 text-base text-navy">
                  {t(up ? 'auth.tabSignUp' : 'auth.tabSignIn')}{' '}
                  <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </Btn>
              </form>

              <p className="mt-6 text-center text-sm text-mortar dark:text-white/70">
                {t(up ? 'auth.haveAccount' : 'auth.newHere')}{' '}
                <Link
                  to={(up ? '/signin' : '/signup') + (next ? `?next=${encodeURIComponent(next)}` : '')}
                  className="font-bold text-teal hover:underline dark:text-aqua"
                >
                  {t(up ? 'nav.signIn' : 'auth.createLink')}
                </Link>
              </p>
            </div>
          )}
        </div>
        <p className="flex items-center justify-center gap-2 text-xs text-mortar dark:text-white/50">
          {t('co.poweredBy')} <BillPay className="h-4" />
        </p>
      </main>
    </div>
  )
}