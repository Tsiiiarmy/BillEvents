import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { Field } from '../../components/common/FormField'
import { BillPay } from '../../components/common/Brand'
import { CheckoutHeader } from '../../components/checkout/CheckoutHeader'
import { OrderSummary } from '../../components/checkout/OrderSummary'

import useAuth from '../../hooks/useAuth'
import useCheckout from '../../hooks/useCheckout'
import useLanguage from '../../hooks/useLanguage'
import { MAX_PER_TIER } from '../../data/checkout'
import { calcTotals, etb } from '../../utils/money'

// Same rules as AuthPage. If data/patterns.js already exports these, swap to it.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^(\+251|251|0)?[79]\d{8}$/

export default function CheckoutPage({ theme, toggle }) {
  const navigate = useNavigate()
  const { user, isSignedIn } = useAuth()
  const { draft, hasDraft, setContact, setItems } = useCheckout()
  const { t } = useLanguage()

  const [form, setForm] = useState(() => ({
    name: draft?.contact?.name ?? user?.name ?? '',
    email: draft?.contact?.email ?? user?.email ?? '',
    phone: draft?.contact?.phone ?? user?.phone ?? '',
  }))

  // Holds translation KEYS, so errors switch language along with the page.
  const [err, setErr] = useState({})

  // Guards. Hooks above run first so the order never changes.
  if (!hasDraft) return <Navigate to="/events" replace />
  if (!isSignedIn) return <Navigate to="/signin?next=/checkout" replace />

  const totals = calcTotals(draft.items)
  const set = (k) => (val) => setForm((s) => ({ ...s, [k]: val }))

  const change = (id, d) => {
    const next = draft.items
      .map((i) => (i.id === id ? { ...i, qty: Math.min(MAX_PER_TIER, Math.max(0, i.qty + d)) } : i))
      .filter((i) => i.qty > 0)
    if (next.length) setItems(next)
  }

  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (form.name.trim().length < 2) x.name = 'co.errName'
    if (!EMAIL.test(form.email.trim())) x.email = 'co.errEmail'
    if (!PHONE.test(form.phone.replace(/\s/g, ''))) x.phone = 'co.errPhone'
    setErr(x)
    if (Object.keys(x).length) return

    setContact({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.replace(/\s/g, ''),
    })
    navigate('/checkout/payment')
  }

  const errorText = (k) => (err[k] ? t(err[k]) : undefined)

  const stepper =
    'grid h-8 w-8 place-items-center rounded-full border border-navy/20 transition hover:bg-navy/10 disabled:opacity-30 disabled:hover:bg-transparent dark:border-white/25 dark:hover:bg-white/10'
  const card = 'rounded-3xl border border-navy/10 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-navy-2'

  return (
    <div className="min-h-screen">
      <CheckoutHeader
        theme={theme}
        toggle={toggle}
        current="details"
        backTo={`/events/${draft.eventId}`}
        backLabel={t('co.backToEvent')}
      />

      <main id="main" className="wrap py-8 sm:py-12">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t('co.title')}</h1>
        <p className="mt-2 text-mortar dark:text-white/70">{t('co.lead')}</p>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
          {/* Left: tickets + details */}
          <div className="grid gap-6">
            <section className={card} aria-labelledby="tickets-h">
              <div className="flex items-baseline justify-between gap-3">
                <h2 id="tickets-h" className="font-heading text-lg font-bold">
                  {t('co.yourTickets')}
                </h2>
                <Link to={`/events/${draft.eventId}`} className="text-sm font-bold text-teal hover:underline dark:text-aqua">
                  {t('co.change')}
                </Link>
              </div>

              <ul className="mt-4 grid gap-3">
                {draft.items.map((i) => (
                  <li
                    key={i.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-navy/10 p-4 dark:border-white/15"
                  >
                    <div className="min-w-0">
                      <p className="font-heading font-bold">{i.name}</p>
                      <p className="text-sm text-mortar dark:text-white/60">
                        {i.price ? t('co.each', { price: etb(i.price) }) : t('card.free')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5" role="group" aria-label={t('sel.qtyGroup', { name: i.name })}>
                      <button
                        type="button"
                        onClick={() => change(i.id, -1)}
                        disabled={totals.qty <= 1}
                        aria-label={t('sel.remove', { name: i.name })}
                        className={stepper}
                      >
                        <Icon n="minus" className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center font-bold" aria-live="polite">
                        {i.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => change(i.id, 1)}
                        disabled={i.qty >= MAX_PER_TIER}
                        aria-label={t('sel.add', { name: i.name })}
                        className={stepper}
                      >
                        <Icon n="plus" className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-xs text-mortar dark:text-white/55">{t('co.atLeastOne')}</p>
            </section>

            <section className={card} aria-labelledby="details-h">
              <h2 id="details-h" className="font-heading text-lg font-bold">
                {t('co.holder')}
              </h2>
              <p className="mt-1 text-sm text-mortar dark:text-white/60">{t('co.holderLead')}</p>

              <form onSubmit={submit} noValidate className="mt-5 grid gap-5" id="checkout-form">
                <Field
                  id="co-name"
                  label={t('co.name')}
                  icon="user"
                  autoComplete="name"
                  placeholder="Abebe Kebede"
                  value={form.name}
                  onChange={set('name')}
                  error={errorText('name')}
                />
                <Field
                  id="co-email"
                  label={t('co.email')}
                  icon="mail"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  hint={t('co.emailHint')}
                  value={form.email}
                  onChange={set('email')}
                  error={errorText('email')}
                />
                <Field
                  id="co-phone"
                  label={t('co.phone')}
                  icon="phone"
                  prefix="+251"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="911 234 567"
                  hint={t('co.phoneHint')}
                  value={form.phone}
                  onChange={set('phone')}
                  error={errorText('phone')}
                />
              </form>
            </section>

            <p className="flex items-start gap-2 text-xs text-mortar dark:text-white/55">
              <Icon n="info" className="h-4 w-4 shrink-0" />
              {t('co.preview')}
            </p>
          </div>

          {/* Right: summary */}
          <div className="lg:sticky lg:top-36">
            <OrderSummary draft={draft} totals={totals}>
              <Btn type="submit" form="checkout-form" className="mt-5 w-full bg-aqua py-3.5 text-base text-navy">
                {t('co.continue')} <Icon n="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
              </Btn>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-mortar dark:text-white/60">
                {t('co.poweredBy')} <BillPay theme={theme} className="h-4" />
              </p>
            </OrderSummary>
          </div>
        </div>
      </main>
    </div>
  )
}