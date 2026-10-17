import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { BillPay } from '../../components/common/Brand'
import { CheckoutHeader } from '../../components/checkout/CheckoutHeader'
import { OrderSummary } from '../../components/checkout/OrderSummary'
import { PaymentMethodPicker } from '../../components/checkout/PaymentMethodPicker'
import { PaymentFields } from '../../components/checkout/PaymentFields'

import useAuth from '../../hooks/useAuth'
import useCheckout from '../../hooks/useCheckout'
import useOrders from '../../hooks/useOrders'
import useLanguage from '../../hooks/useLanguage'
import { PAYMENT_METHODS } from '../../data/checkout'
import { calcTotals, etb } from '../../utils/money'

const PHONE = /^(\+251|251|0)?[79]\d{8}$/
const THINKING_MS = 2200

const card = 'rounded-3xl border border-navy/10 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-navy-2'

export default function PaymentPage({ theme, toggle }) {
  const { user, isSignedIn } = useAuth()
  const { draft, hasDraft, clearCheckout } = useCheckout()
  const { createOrder } = useOrders()
  const { t } = useLanguage()

  const [methodId, setMethodId] = useState(PAYMENT_METHODS[0].id)
  const [form, setForm] = useState(() => ({
    phone: draft?.contact?.phone ?? user?.phone ?? '',
    bank: '',
    account: draft?.contact?.name ?? user?.name ?? '',
    card: '',
    holder: draft?.contact?.name ?? user?.name ?? '',
    exp: '',
    cvc: '',
  }))
  const [err, setErr] = useState({}) // translation KEYS
  const [stage, setStage] = useState('form') // form | processing | failed
  const [doneRef, setDoneRef] = useState(null)
  const [outcome, setOutcome] = useState('success') // dev-only switch
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  // Guards. All hooks are above this line so the hook order never changes.
  // Paid comes first: the draft is deleted on success, so this must win
  // over the "no draft" guard or we'd bounce to /events instead.
  if (doneRef) return <Navigate to={`/checkout/success/${doneRef}`} replace />
  if (!hasDraft) return <Navigate to="/events" replace />
  if (!isSignedIn) return <Navigate to="/signin?next=/checkout/payment" replace />
  if (!draft.contact) return <Navigate to="/checkout" replace />

  const method = PAYMENT_METHODS.find((m) => m.id === methodId) || PAYMENT_METHODS[0]
  const methodName = t(`pm.${method.id}.name`, null, method.name)
  const methodDetail = t(`pm.${method.id}.detail`, null, method.detail)
  const totals = calcTotals(draft.items)
  const busy = stage === 'processing'

  const set = (k) => (val) => {
    setForm((s) => ({ ...s, [k]: val }))
    if (stage === 'failed') setStage('form')
  }

  const pickMethod = (id) => {
    setMethodId(id)
    setErr({})
    if (stage === 'failed') setStage('form')
  }

  const validate = () => {
    const x = {}
    if (method.kind === 'mobile') {
      if (!PHONE.test(form.phone.replace(/\s/g, ''))) x.phone = 'pay.errPhone'
    }
    if (method.kind === 'bank') {
      if (!form.bank) x.bank = 'pay.errBank'
      if (form.account.trim().length < 2) x.account = 'pay.errAccount'
    }
    if (method.kind === 'card') {
      if (form.card.replace(/\D/g, '').length !== 16) x.card = 'pay.errCard'
      if (form.holder.trim().length < 2) x.holder = 'pay.errHolder'
      if (!/^\d{2}\/\d{2}$/.test(form.exp)) {
        x.exp = 'pay.errExpFormat'
      } else {
        const m = Number(form.exp.slice(0, 2))
        const y = 2000 + Number(form.exp.slice(3))
        const now = new Date()
        if (m < 1 || m > 12) x.exp = 'pay.errExpMonth'
        else if (y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth() + 1)) {
          x.exp = 'pay.errExpired'
        }
      }
      if (!/^\d{3,4}$/.test(form.cvc)) x.cvc = 'pay.errCvc'
    }
    return x
  }

  const pay = (e) => {
    e.preventDefault()
    const x = validate()
    setErr(x)
    if (Object.keys(x).length) return

    setStage('processing')
    timer.current = setTimeout(() => {
      if (outcome === 'fail') {
        setStage('failed')
        return
      }
      // A real backend would confirm the payment and return the order.
      const order = createOrder({
        draft,
        method: { id: method.id, name: method.name },
        user,
      })
      setDoneRef(order.ref)
      clearCheckout()
    }, THINKING_MS)
  }

  return (
    <div className="min-h-screen">
      <CheckoutHeader
        theme={theme}
        toggle={toggle}
        current="payment"
        backTo="/checkout"
        backLabel={t('pay.backToDetails')}
      />

      <main id="main" className="wrap py-8 sm:py-12">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t('pay.title')}</h1>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-mortar dark:text-white/70">
          {t('pay.lead')} <BillPay theme={theme} className="h-4" />
        </p>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
          {/* Left: method + fields */}
          <div className="grid gap-6">
            {stage === 'failed' && (
              <div role="alert" className="flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-4">
                <Icon n="alert" className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-heading font-bold text-red-700 dark:text-red-300">{t('pay.failTitle')}</p>
                  <p className="mt-1 text-sm text-mortar dark:text-white/70">{t('pay.failText')}</p>
                </div>
              </div>
            )}

            <section className={card}>
              <PaymentMethodPicker value={methodId} onChange={pickMethod} disabled={busy} />
            </section>

            <section className={card} aria-labelledby="pay-details-h">
              <h2 id="pay-details-h" className="font-heading text-lg font-bold">
                {t('pay.detailsTitle', { method: methodName })}
              </h2>
              <p className="mt-1 text-sm text-mortar dark:text-white/60">{methodDetail}</p>

              <form onSubmit={pay} noValidate id="payment-form" className="mt-5">
                <fieldset disabled={busy} className="grid gap-5 disabled:opacity-60">
                  <PaymentFields method={method} form={form} set={set} err={err} />
                </fieldset>
              </form>
            </section>

            {import.meta.env.DEV && (
              <div className="rounded-2xl border border-dashed border-navy/25 p-4 dark:border-white/25">
                <p className="text-[10px] font-bold uppercase tracking-widest text-mortar dark:text-white/50">
                  Dev · simulate outcome
                </p>
                <div className="mt-2.5 flex flex-wrap gap-5 text-sm">
                  {[
                    ['success', 'Payment succeeds'],
                    ['fail', 'Payment fails'],
                  ].map(([val, label]) => (
                    <label key={val} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="dev-outcome"
                        checked={outcome === val}
                        onChange={() => setOutcome(val)}
                        className="h-4 w-4 accent-[#0E7C86]"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <p className="flex items-start gap-2 text-xs text-mortar dark:text-white/55">
              <Icon n="info" className="h-4 w-4 shrink-0" />
              {t('pay.preview')}
            </p>
          </div>

          {/* Right: summary + pay button */}
          <div className="lg:sticky lg:top-36">
            <OrderSummary draft={draft} totals={totals}>
              <Btn
                type="submit"
                form="payment-form"
                disabled={busy}
                className="mt-5 w-full bg-aqua py-3.5 text-base text-navy disabled:pointer-events-none disabled:opacity-50"
              >
                <Icon n="lock" className="h-4 w-4" />
                {busy ? t('pay.confirming') : t('pay.payAmount', { amount: etb(totals.total) })}
              </Btn>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-mortar dark:text-white/60">
                {t('co.poweredBy')} <BillPay theme={theme} className="h-4" />
              </p>
            </OrderSummary>
          </div>
        </div>
      </main>

      {busy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pay-busy-h"
          className="fixed inset-0 z-[80] grid place-items-center bg-navy/60 p-5 backdrop-blur-sm"
        >
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-navy-2">
            <span
              aria-hidden="true"
              className="mx-auto block h-12 w-12 animate-spin rounded-full border-4 border-navy/15 border-t-aqua motion-reduce:animate-none dark:border-white/20"
            />
            <h2 id="pay-busy-h" className="mt-5 font-heading text-xl font-bold">
              {t('pay.busyTitle')}
            </h2>
            <p className="mt-2 text-sm text-mortar dark:text-white/65" aria-live="polite">
              {methodDetail}
            </p>
            <p className="mt-4 text-xs text-mortar dark:text-white/50">{t('pay.busyKeep')}</p>
          </div>
        </div>
      )}
    </div>
  )
}