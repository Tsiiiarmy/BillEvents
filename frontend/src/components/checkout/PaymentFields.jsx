import { Field, SelectField } from '../common/FormField'
import { Icon } from '../common/Icon'
import { BANKS } from '../../data/checkout'
import useLanguage from '../../hooks/useLanguage'

/** "4111111111111111" → "4111 1111 1111 1111" */
const groupCard = (v) =>
  v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')

/** "1228" → "12/28" */
const groupExp = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

/** `err` holds translation keys; they're turned into text here. */
export function PaymentFields({ method, form, set, err }) {
  const { t } = useLanguage()
  const e = (k) => (err[k] ? t(err[k]) : undefined)
  const name = t(`pm.${method.id}.name`, null, method.name)
  const detail = t(`pm.${method.id}.detail`, null, method.detail)

  if (method.kind === 'mobile') {
    return (
      <Field
        id="pay-phone"
        label={t('pay.phoneLabel', { method: name })}
        icon="phone"
        prefix="+251"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="911 234 567"
        hint={detail}
        value={form.phone}
        onChange={set('phone')}
        error={e('phone')}
      />
    )
  }

  if (method.kind === 'bank') {
    // Bank names are proper names — not translated.
    return (
      <div className="grid gap-5">
        <SelectField
          id="pay-bank"
          label={t('pay.bank')}
          placeholder={t('pay.bankPlaceholder')}
          options={BANKS}
          hint={detail}
          value={form.bank}
          onChange={set('bank')}
          error={e('bank')}
        />
        <Field
          id="pay-account"
          label={t('pay.account')}
          icon="user"
          autoComplete="name"
          placeholder="Abebe Kebede"
          value={form.account}
          onChange={set('account')}
          error={e('account')}
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
          <strong className="font-bold">{t('pay.mockTitle')}</strong> {t('pay.mockText')}
        </span>
      </p>

      <Field
        id="pay-card"
        label={t('pay.card')}
        icon="card"
        inputMode="numeric"
        autoComplete="off"
        placeholder="4111 1111 1111 1111"
        value={form.card}
        onChange={(v) => set('card')(groupCard(v))}
        error={e('card')}
      />
      <Field
        id="pay-holder"
        label={t('pay.holder')}
        icon="user"
        autoComplete="off"
        placeholder="ABEBE KEBEDE"
        value={form.holder}
        onChange={set('holder')}
        error={e('holder')}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="pay-exp"
          label={t('pay.exp')}
          icon="calendar"
          inputMode="numeric"
          autoComplete="off"
          placeholder="MM/YY"
          value={form.exp}
          onChange={(v) => set('exp')(groupExp(v))}
          error={e('exp')}
        />
        <Field
          id="pay-cvc"
          label={t('pay.cvc')}
          icon="lock"
          inputMode="numeric"
          autoComplete="off"
          maxLength={4}
          placeholder="123"
          value={form.cvc}
          onChange={(v) => set('cvc')(v.replace(/\D/g, '').slice(0, 4))}
          error={e('cvc')}
        />
      </div>
    </div>
  )
}