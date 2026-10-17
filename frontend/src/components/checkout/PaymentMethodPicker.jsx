import { Icon } from '../common/Icon'
import { PAYMENT_METHODS } from '../../data/checkout'
import useLanguage from '../../hooks/useLanguage'

/**
 * Radio cards for the BillPay payment methods.
 * The native radio stays in the DOM (sr-only) so keyboard and screen
 * readers behave normally; the card is the visible control.
 *
 * Brand names (telebirr, CBE Birr) have no translation key, so they stay as-is.
 */
export function PaymentMethodPicker({ value, onChange, disabled = false }) {
  const { t } = useLanguage()

  return (
    <fieldset disabled={disabled} className="disabled:opacity-60">
      <legend className="font-heading text-lg font-bold">{t('pay.choose')}</legend>
      <p className="mt-1 text-sm text-mortar dark:text-white/60">{t('pay.chooseLead')}</p>

      <div className="mt-4 grid gap-3">
        {PAYMENT_METHODS.map((m) => {
          const on = value === m.id
          return (
            <label key={m.id} className="block cursor-pointer">
              <input
                type="radio"
                name="payment-method"
                value={m.id}
                checked={on}
                onChange={() => onChange(m.id)}
                className="peer sr-only"
              />
              <span className="flex items-start gap-3.5 rounded-2xl border border-navy/10 p-4 transition hover:border-navy/30 peer-checked:border-aqua peer-checked:bg-aqua/10 peer-focus-visible:ring-4 peer-focus-visible:ring-aqua/40 dark:border-white/15 dark:hover:border-white/35 dark:peer-checked:border-aqua dark:peer-checked:bg-aqua/10">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist text-teal dark:bg-navy dark:text-aqua">
                  <Icon n={m.icon} className="h-5 w-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-heading font-bold">{t(`pm.${m.id}.name`, null, m.name)}</span>
                  <span className="mt-0.5 block text-sm text-mortar dark:text-white/60">
                    {t(`pm.${m.id}.blurb`, null, m.blurb)}
                  </span>
                </span>

                {/* Uses `on` directly: Tailwind's peer-checked can't reach nested elements */}
                <span
                  aria-hidden="true"
                  className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition ${
                    on ? 'border-aqua' : 'border-navy/25 dark:border-white/30'
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full bg-aqua transition motion-reduce:transition-none ${
                      on ? 'scale-100' : 'scale-0'
                    }`}
                  />
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}