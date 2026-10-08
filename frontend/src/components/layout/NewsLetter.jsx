import { useState } from 'react'
import { Icon } from '../common/Icon'
import { Reveal } from '../common/Reveal'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | done

  const submit = (e) => {
    e.preventDefault()
    setStatus(EMAIL.test(email) ? 'done' : 'error')
  }

  return (
    <section aria-label="Newsletter" className="wrap pb-12 pt-4">
      <Reveal>
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-linear-to-r from-navy to-[#2C4A86] px-6 py-6 text-white shadow-xl shadow-navy/20 md:flex-row md:justify-between dark:from-navy-2 dark:to-[#35508a] dark:shadow-none dark:ring-1 dark:ring-white/10">
          <div className="flex items-center gap-4 text-center md:text-left">
            <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-aqua sm:grid"><Icon n="send" className="h-6 w-6" /></span>
            <div>
              <h2 className="font-heading text-lg font-bold">Be the First to Know</h2>
              <p className="text-sm text-white/75">Get the latest events, exclusive offers, and more — straight to your inbox.</p>
            </div>
          </div>

          {status === 'done' ? (
            <p role="status" className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold">
              <Icon n="check" className="h-4 w-4 text-aqua" /> Thanks! You’re on the list. <span className="font-normal text-white/60">(preview only)</span>
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="w-full md:max-w-md">
              <div className="flex items-center rounded-full bg-white p-1.5 pl-5 text-navy focus-within:ring-4 focus-within:ring-aqua/50">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input id="newsletter-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
                  placeholder="Enter your email address" autoComplete="email" aria-invalid={status === 'error'}
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-mortar/60" />
                <button type="submit" className="rounded-full bg-aqua px-5 py-2.5 text-sm font-bold transition hover:brightness-95 active:scale-95">Subscribe</button>
              </div>
              {status === 'error' && <p role="alert" className="mt-2 pl-4 text-xs font-medium text-red-300">Please enter a valid email address.</p>}
            </form>
          )}
        </div>
      </Reveal>
    </section>
  )
}