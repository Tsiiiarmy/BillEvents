import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Icon } from '../../components/common/Icon'
import { Logo, BillPay } from '../../components/common/Brand'
import { Btn } from '../../components/common/Btn'
import { ThemeToggle } from '../../components/common/ThemeToggle'

import heroImg from '../../assets/images/hero-addis-concert.jpg'
import logoDark from '../../assets/logo/billevents-logo-reverse.svg'


const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^(\+251|251|0)?[79]\d{8}$/ // Ethiopian mobile, e.g. 911234567 or 0911234567
const strength = (p) => [p.length >= 8, /[A-Z]/.test(p) && /[a-z]/.test(p), /\d/.test(p), /[^A-Za-z0-9]/.test(p)].filter(Boolean).length

function Field({ id, label, icon, value, onChange, error, right, prefix, ...p }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">{label}</label>
      <div className={`flex items-center gap-2 rounded-xl border bg-white px-3.5 transition focus-within:ring-4 dark:bg-navy-2 ${error ? 'border-red-500 focus-within:ring-red-500/20' : 'border-navy/15 focus-within:border-aqua focus-within:ring-aqua/30 dark:border-white/15'}`}>
        <Icon n={icon} className="h-4 w-4 shrink-0 text-mortar dark:text-white/50" />
        {prefix && <span className="border-r border-navy/15 pr-2 text-sm font-bold text-mortar dark:border-white/15 dark:text-white/60">{prefix}</span>}
        <input id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
          className="min-w-0 flex-1 bg-transparent py-3 outline-none placeholder:text-mortar/50 dark:placeholder:text-white/30" {...p} />
        {right}
      </div>
      {error && <p id={`${id}-err`} className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}

function PasswordField({ show, setShow, ...p }) {
  return (
    <Field type={show ? 'text' : 'password'} icon="lock" {...p}
      right={<button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="grid h-8 w-8 place-items-center rounded-full text-mortar transition hover:bg-navy/10 dark:text-white/60 dark:hover:bg-white/10"><Icon n={show ? 'eyeoff' : 'eye'} className="h-4 w-4" /></button>} />
  )
}

const copy = {
  signin: { title: 'Welcome back', sub: "Sign in to see your tickets and discover what's on.", big: 'Your next unforgettable moment is waiting.' },
  signup: { title: 'Create your account', sub: 'Join BillEvents to buy tickets and keep them all in one place.', big: 'Join the moments that move Ethiopia.' },
}
const perks = [['ticket', 'All your tickets in one place'], ['heart', 'Save the events you love'], ['shield', 'Secure payments with BillPay']]

export default function AuthPage({ mode, theme, toggle }) {
  const up = mode === 'signup'
  const [v, setV] = useState({ name: '', phone: '', email: '', id: '', password: '', terms: false, remember: true })
  const [err, setErr] = useState({})
  const [show, setShow] = useState(false)
  const [done, setDone] = useState(false)
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }))
  const s = strength(v.password)

  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (up) {
      if (v.name.trim().length < 2) x.name = 'Please enter your full name.'
      if (!PHONE.test(v.phone.replace(/\s/g, ''))) x.phone = 'Enter a valid mobile number, e.g. 911 234 567.'
      if (!EMAIL.test(v.email)) x.email = 'Enter a valid email address.'
      if (v.password.length < 8) x.password = 'Use at least 8 characters.'
      if (!v.terms) x.terms = 'Please accept the terms to continue.'
    } else {
      if (!(EMAIL.test(v.id) || PHONE.test(v.id.replace(/\s/g, '')))) x.id = 'Enter your email or phone number.'
      if (!v.password) x.password = 'Enter your password.'
    }
    setErr(x)
    if (!Object.keys(x).length) setDone(true)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Left: cinematic brand panel (desktop only) */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-navy p-12 text-white lg:flex">
        <img src={heroImg} alt="" className="kenburns absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/80 to-navy/50" />
        <div className="animate-drift absolute -left-20 top-20 -z-10 h-96 w-96 rounded-full bg-aqua/25 blur-3xl" />
        <Link to="/" aria-label="BillEvents home"><img src={logoDark} alt="BillEvents" className="h-9 w-auto" /></Link>
        <div>
          <h2 className="animate-up max-w-md font-heading text-5xl font-bold leading-tight">{copy[mode].big}</h2>
          <ul className="mt-8 grid gap-4">
            {perks.map(([ic, t], i) => (
              <li key={t} className="animate-up flex items-center gap-3 text-white/90" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-aqua backdrop-blur"><Icon n={ic} /></span>{t}
              </li>
            ))}
          </ul>
        </div>
        <p className="flex items-center gap-2 text-sm text-white/70">Secure payments powered by <BillPay fixedDark className="h-5" /></p>
      </aside>

      {/* Right: form */}
      <main className="flex flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="lg:hidden" aria-label="BillEvents home"><Logo className="h-8" /></Link>
          <Link to="/" className="hidden items-center gap-2 text-sm font-bold text-teal hover:underline lg:flex dark:text-aqua"><Icon n="arrow" className="h-4 w-4 rotate-180" />Back to events</Link>
          <ThemeToggle theme={theme} toggle={toggle} />
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          {done ? (
            <div className="animate-up text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-aqua text-navy"><Icon n="check" className="h-8 w-8" /></span>
              <h1 className="mt-6 font-heading text-3xl font-bold">{up ? 'Account created!' : "You're signed in!"}</h1>
              <p className="mt-3 text-mortar dark:text-white/70">This is a front-end preview, so nothing was sent anywhere. Real accounts come when we connect the backend.</p>
              <Btn as={Link} to="/" variant="dark" className="mt-8">Back to events</Btn>
            </div>
          ) : (
            <div className="animate-up">
              <div className="mb-8 grid grid-cols-2 rounded-full bg-mist p-1 dark:bg-navy-2">
                {[['/signin', 'Sign In', 'signin'], ['/signup', 'Create Account', 'signup']].map(([to, t, m]) => (
                  <Link key={m} to={to} aria-current={mode === m ? 'page' : undefined}
                    className={`rounded-full py-2.5 text-center text-sm font-bold transition ${mode === m ? 'bg-navy text-white shadow dark:bg-aqua dark:text-navy' : 'text-mortar hover:text-navy dark:text-white/60 dark:hover:text-white'}`}>{t}</Link>
                ))}
              </div>
              <h1 className="font-heading text-3xl font-bold sm:text-4xl">{copy[mode].title}</h1>
              <p className="mt-2 text-mortar dark:text-white/70">{copy[mode].sub}</p>

              <form onSubmit={submit} noValidate className="mt-8 grid gap-5">
                {up ? (<>
                  <Field id="name" label="Full name" icon="user" autoComplete="name" placeholder="Abebe Kebede" value={v.name} onChange={set('name')} error={err.name} />
                  <Field id="phone" label="Phone number" icon="phone" prefix="+251" inputMode="tel" autoComplete="tel-national" placeholder="911 234 567" value={v.phone} onChange={set('phone')} error={err.phone} />
                  <Field id="email" label="Email" icon="mail" type="email" autoComplete="email" placeholder="you@example.com" value={v.email} onChange={set('email')} error={err.email} />
                </>) : (
                  <Field id="id" label="Email or phone number" icon="user" autoComplete="username" placeholder="you@example.com or 0911 234 567" value={v.id} onChange={set('id')} error={err.id} />
                )}

                <div>
                  <PasswordField id="password" label="Password" show={show} setShow={setShow} autoComplete={up ? 'new-password' : 'current-password'} placeholder={up ? 'At least 8 characters' : 'Your password'} value={v.password} onChange={set('password')} error={err.password} />
                  {up && v.password && (
                    <div className="mt-2.5" aria-live="polite">
                      <div className="flex gap-1.5">{[1, 2, 3, 4].map((n) => <span key={n} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${s >= n ? (s <= 1 ? 'bg-red-500' : s <= 2 ? 'bg-amber-500' : 'bg-aqua') : 'bg-navy/10 dark:bg-white/15'}`} />)}</div>
                      <p className="mt-1 text-xs text-mortar dark:text-white/60">Strength: {['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][s]}</p>
                    </div>
                  )}
                </div>

                {up ? (
                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm">
                      <input type="checkbox" checked={v.terms} onChange={(e) => set('terms')(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#0E7C86]" />
                      <span>I agree to the <a href="#" className="font-bold text-teal underline dark:text-aqua">Terms & Conditions</a> and <a href="#" className="font-bold text-teal underline dark:text-aqua">Privacy Policy</a>.</span>
                    </label>
                    {err.terms && <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{err.terms}</p>}
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={v.remember} onChange={(e) => set('remember')(e.target.checked)} className="h-4 w-4 accent-[#0E7C86]" />Remember me</label>
                    <a href="#" className="font-bold text-teal hover:underline dark:text-aqua">Forgot password?</a>
                  </div>
                )}

                <Btn type="submit" className="w-full bg-aqua py-3.5 text-base text-navy">{up ? 'Create Account' : 'Sign In'} <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Btn>
              </form>

              <p className="mt-6 text-center text-sm text-mortar dark:text-white/70">
                {up ? 'Already have an account? ' : "New to BillEvents? "}
                <Link to={up ? '/signin' : '/signup'} className="font-bold text-teal hover:underline dark:text-aqua">{up ? 'Sign in' : 'Create an account'}</Link>
              </p>
            </div>
          )}
        </div>
        <p className="flex items-center justify-center gap-2 text-xs text-mortar dark:text-white/50">Payments powered by <BillPay className="h-4" /></p>
      </main>
    </div>
  )
}