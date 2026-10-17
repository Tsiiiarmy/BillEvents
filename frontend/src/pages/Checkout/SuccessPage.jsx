import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { BillPay } from '../../components/common/Brand'
import { CheckoutHeader } from '../../components/checkout/CheckoutHeader'
import { OrderSummary } from '../../components/checkout/OrderSummary'
import { DigitalTicket } from '../../components/tickets/DigitalTicket'

import useOrders from '../../hooks/useOrders'
import useLanguage, { translate } from '../../hooks/useLanguage'
import { calcTotals, etb } from '../../utils/money'

const NEXT_STEPS = [
  ['ticket', 'done.n1t', 'done.n1x'],
  ['phone', 'done.n2t', 'done.n2x'],
  ['scan', 'done.n3t', 'done.n3x'],
]

export default function SuccessPage({ theme, toggle }) {
  const { ref } = useParams()
  const { orders } = useOrders()
  const { lang, language, t } = useLanguage()
  const order = orders.find((o) => o.ref === ref) ?? null
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.title = order
      ? `${translate(lang, 'done.docTitle', { ref: order.ref })} — BillEvents`
      : `${translate(lang, 'done.notFound')} — BillEvents`
  }, [order, lang])

  if (!order) {
    return (
      <div className="min-h-screen">
        <CheckoutHeader theme={theme} toggle={toggle} current="done" backTo="/events" backLabel={t('event.back')} />
        <main id="main" className="wrap grid min-h-[50vh] place-items-center py-20 text-center">
          <div className="max-w-sm">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-mortar dark:bg-navy-2 dark:text-white/60">
              <Icon n="alert" className="h-7 w-7" />
            </span>
            <h1 className="mt-5 font-heading text-3xl font-bold">{t('done.notFound')}</h1>
            <p className="mt-3 text-mortar dark:text-white/70">{t('done.notFoundText')}</p>
            <Btn as={Link} to="/events" variant="dark" className="mt-6">
              {t('done.browse')}
            </Btn>
          </div>
        </main>
      </div>
    )
  }

  const totals = calcTotals(order.items)
  const paidOn = new Date(order.paidAt).toLocaleString(language.locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const tickets = t(order.quantity === 1 ? 'sel.count.one' : 'sel.count.other', { count: order.quantity })
  // Leaves {event} in place so the title can be bolded wherever each language puts it.
  const [before, after = ''] = t('done.forEvent', { tickets }).split('{event}')

  const methodName = order.method
    ? t(`pm.${order.method.id}.name`, null, order.method.name)
    : '—'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(order.ref)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the reference is on screen anyway */
    }
  }

  return (
    <div className="min-h-screen bg-mist dark:bg-navy-3">
      <CheckoutHeader theme={theme} toggle={toggle} current="done" backTo="/events" backLabel={t('event.back')} />

      <main id="main" className="wrap py-10 sm:py-14">
        {/* Confirmation */}
        <div className="text-center">
          <span className="animate-up mx-auto grid h-16 w-16 place-items-center rounded-full bg-aqua text-navy">
            <Icon n="check" className="h-8 w-8" />
          </span>
          <h1 className="animate-up mt-5 font-heading text-3xl font-bold sm:text-4xl">{t('done.title')}</h1>
          <p className="mt-3 text-mortar dark:text-white/70">
            {before}
            <span className="font-bold text-navy dark:text-white">{order.eventTitle}</span>
            {after}
          </p>

          <div className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl bg-white px-5 py-3 dark:bg-navy-2">
            <span className="text-sm text-mortar dark:text-white/60">{t('done.ref')}</span>
            <span className="font-heading text-xl font-bold tracking-wide">{order.ref}</span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:underline dark:text-aqua"
            >
              <Icon n={copied ? 'check' : 'copy'} className="h-4 w-4" />
              <span aria-live="polite">{copied ? t('done.copied') : t('done.copy')}</span>
            </button>
          </div>

          {order.contact?.email && (
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-mortar dark:text-white/60">
              <Icon n="mail" className="h-4 w-4 shrink-0" />
              {t('done.emailNote', { email: order.contact.email })}
            </p>
          )}
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
          {/* Left: the tickets */}
          <div className="grid gap-6">
            <h2 className="font-heading text-2xl font-bold">
              {order.quantity === 1 ? t('done.yourOne') : t('done.yourMany', { count: order.quantity })}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {order.tickets.map((tk) => (
                <DigitalTicket key={tk.code} order={order} ticket={tk} />
              ))}
            </div>

            <section className="rounded-3xl bg-white p-5 sm:p-6 dark:bg-navy-2" aria-labelledby="next-h">
              <h2 id="next-h" className="font-heading text-lg font-bold">
                {t('done.next')}
              </h2>
              <ul className="mt-4 grid gap-4">
                {NEXT_STEPS.map(([ic, titleKey, textKey]) => (
                  <li key={titleKey} className="flex items-start gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-teal dark:bg-navy dark:text-aqua">
                      <Icon n={ic} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-heading font-bold">{t(titleKey)}</p>
                      <p className="mt-0.5 text-sm text-mortar dark:text-white/65">{t(textKey)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <p className="flex items-start gap-2 text-xs text-mortar dark:text-white/55">
              <Icon n="info" className="h-4 w-4 shrink-0" />
              {t('done.preview')}
            </p>
          </div>

          {/* Right: the receipt */}
          <div className="lg:sticky lg:top-36">
            <OrderSummary draft={order} totals={totals}>
              <dl className="mt-5 grid gap-2.5 border-t border-navy/10 pt-4 text-sm dark:border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-mortar dark:text-white/60">{t('done.paidWith')}</dt>
                  <dd className="text-right font-medium">{methodName}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-mortar dark:text-white/60">{t('done.paidOn')}</dt>
                  <dd className="text-right font-medium">{paidOn}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-mortar dark:text-white/60">{t('done.amount')}</dt>
                  <dd className="text-right font-medium">{etb(order.total)}</dd>
                </div>
              </dl>

              <Btn as={Link} to="/account/tickets" variant="dark" className="mt-5 w-full py-3.5 text-base">
                <Icon n="ticket" className="h-4 w-4" />
                {t('done.seeAll')}
              </Btn>

              <Link
                to="/events"
                className="mt-3 flex items-center justify-center gap-1.5 text-sm font-bold text-teal hover:underline dark:text-aqua"
              >
                {t('done.browseMore')} <Icon n="arrow" className="h-4 w-4" />
              </Link>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-mortar dark:text-white/60">
                {t('done.paidSecurely')} <BillPay theme={theme} className="h-4" />
              </p>
            </OrderSummary>
          </div>
        </div>
      </main>
    </div>
  )
}