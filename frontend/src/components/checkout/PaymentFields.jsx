import { Field, SelectField } from '../common/FormField'
import { Icon } from '../common/Icon'
import { BANKS } from '../../data/checkout'

/** "4111111111111111" → "4111 1111 1111 1111" */
const groupCard = (v) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')

/** "1228" → "12/28" */
const groupExp = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

export function PaymentFields({ method, form, set, err }) {
  if (method.kind === 'mobile') {
    return (
      <Field
        id="pay-phone"
        label={`${method.name} phone number`}
        icon="phone"
        prefix="+251"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="911 234 567"
        hint={method.detail}
        value={form.phone}
        onChange={set('phone')}
        error={err.phone}
      />
    )
  }

  if (method.kind === 'bank') {
    return (
      <div className="grid gap-5">
        <SelectField
          id="pay-bank"
          label="Your bank"
          placeholder="Choose your bank"
          options={BANKS}
          hint={method.detail}
          value={form.bank}
          onChange={set('bank')}
          error={err.bank}
        />
        <Field
          id="pay-account"
          label="Account holder name"
          icon="user"
          autoComplete="name"
          placeholder="Abebe Kebede"
          value={form.account}
          onChange={set('account')}
          error={err.account}
        />
      </div>
    )
  }

  // kind === 'card'
  return (
    <div className="grid gap-5">
      <p className="flex items-start gap-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 text-sm text-mortar dark:text-white/75">
        <Icon n="alert" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <span>
          <strong className="font-bold">This is a mockup.</strong> Nothing is sent anywhere, but
          please do not type a real card number. Try 4111 1111 1111 1111.
        </span>
      </p>

      <Field
        id="pay-card"
        label="Card number"
        icon="card"
        inputMode="numeric"
        autoComplete="off"
        placeholder="4111 1111 1111 1111"
        value={form.card}
        onChange={(v) => set('card')(groupCard(v))}
        error={err.card}
      />
      <Field
        id="pay-holder"
        label="Name on card"
        icon="user"
        autoComplete="off"
        placeholder="ABEBE KEBEDE"
        value={form.holder}
        onChange={set('holder')}
        error={err.holder}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="pay-exp"
          label="Expiry date"
          icon="calendar"
          inputMode="numeric"
          autoComplete="off"
          placeholder="MM/YY"
          value={form.exp}
          onChange={(v) => set('exp')(groupExp(v))}
          error={err.exp}
        />
        <Field
          id="pay-cvc"
          label="CVC"
          icon="lock"
          inputMode="numeric"
          autoComplete="off"
          maxLength={4}
          placeholder="123"
          value={form.cvc}
          onChange={(v) => set('cvc')(v.replace(/\D/g, '').slice(0, 4))}
          error={err.cvc}
        />
      </div>
    </div>
  )
}