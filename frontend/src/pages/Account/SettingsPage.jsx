import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccountLayout } from '../../components/account/AccountLayout'
import { Icon } from '../../components/common/Icon'
import { Btn } from '../../components/common/Btn'
import { Field } from '../../components/common/FormField'

import useAuth from '../../hooks/useAuth'
import useOrders from '../../hooks/useOrders'
import useSaved from '../../hooks/useSaved'
import useCheckout from '../../hooks/useCheckout'
import useLanguage, { translate } from '../../hooks/useLanguage'
import { LANGUAGES } from '../../i18n/languages'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^(\+251|251|0)?[79]\d{8}$/

/** Shared panel so every block on the page sits in the same frame. */
function Section({ icon, title, lead, children }) {
  return (
    <section className="rounded-3xl bg-white p-5 sm:p-6 dark:bg-navy-2">
      <div className="flex items-start gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-teal dark:bg-navy dark:text-aqua">
          <Icon n={icon} className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2 className="font-heading text-lg font-bold">{title}</h2>
          {lead && <p className="mt-0.5 text-sm text-mortar dark:text-white/60">{lead}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

/** Destructive actions ask once before they fire. */
function DangerRow({ label, detail, count, onConfirm }) {
  const { t } = useLanguage()
  const [asking, setAsking] = useState(false)

  useEffect(() => {
    if (!asking) return undefined
    const timer = setTimeout(() => setAsking(false), 6000)
    return () => clearTimeout(timer)
  }, [asking])

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-navy/10 p-4 dark:border-white/15">
      <div className="min-w-0">
        <p className="font-bold">
          {label} <span className="font-normal text-mortar dark:text-white/55">({count})</span>
        </p>
        <p className="mt-0.5 text-sm text-mortar dark:text-white/60">{detail}</p>
      </div>

      {asking ? (
        <div className="flex items-center gap-2" role="group" aria-label={t('set.confirm', { label })}>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              setAsking(false)
            }}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
          >
            {t('set.yesDelete')}
          </button>
          <button
            type="button"
            onClick={() => setAsking(false)}
            className="rounded-full border border-navy/20 px-4 py-2 text-sm font-bold transition hover:bg-navy/5 dark:border-white/25 dark:hover:bg-white/10"
          >
            {t('set.cancel')}
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={count === 0}
          onClick={() => setAsking(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-500/10 disabled:pointer-events-none disabled:opacity-40 dark:text-red-400"
        >
          <Icon n="trash" className="h-4 w-4" />
          {t('set.delete')}
        </button>
      )}
    </div>
  )
}

export default function SettingsPage({ theme, toggle }) {
  const navigate = useNavigate()
  const { user, updateUser, signOut } = useAuth()
  const { orders, clearOrders } = useOrders()
  const { saved, clearSaved } = useSaved()
  const { draft, clearCheckout } = useCheckout()
  const { lang, language, setLang, t } = useLanguage()

  const [form, setForm] = useState(() => ({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  }))
  const [err, setErr] = useState({}) // translation KEYS
  const [saved_, setSaved_] = useState(false)

  useEffect(() => {
    document.title = `${translate(lang, 'account.settings')} — BillEvents`
  }, [lang])

  useEffect(() => {
    if (!saved_) return undefined
    const timer = setTimeout(() => setSaved_(false), 3000)
    return () => clearTimeout(timer)
  }, [saved_])

  const set = (k) => (val) => {
    setForm((s) => ({ ...s, [k]: val }))
    setSaved_(false)
  }

  const dirty =
    form.name !== (user?.name ?? '') || form.email !== (user?.email ?? '') || form.phone !== (user?.phone ?? '')

  const submit = (e) => {
    e.preventDefault()
    const x = {}
    const email = form.email.trim()
    const phone = form.phone.replace(/\s/g, '')

    if (form.name.trim().length < 2) x.name = 'err.name'
    if (email && !EMAIL.test(email)) x.email = 'err.email'
    if (phone && !PHONE.test(phone)) x.phone = 'co.errPhone'
    if (!email && !phone) x.email = 'set.errOneContact'

    setErr(x)
    if (Object.keys(x).length) return

    updateUser({ name: form.name.trim(), email, phone })
    setSaved_(true)
  }

  const errorText = (k) => (err[k] ? t(err[k]) : undefined)

  const leave = () => {
    signOut()
    navigate('/')
  }

  const joined = user?.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString(language.locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  const themes = [
    ['light', 'set.light', 'sun'],
    ['dark', 'set.dark', 'moon'],
  ]

  return (
    <AccountLayout theme={theme} toggle={toggle} title={t('account.settings')} lead={t('set.lead')}>
      <div className="grid gap-6">
        {/* Profile */}
        <Section icon="user" title={t('set.details')} lead={t('set.detailsLead')}>
          <form onSubmit={submit} noValidate className="grid gap-5">
            <Field
              id="set-name"
              label={t('co.name')}
              icon="user"
              autoComplete="name"
              placeholder="Abebe Kebede"
              value={form.name}
              onChange={set('name')}
              error={errorText('name')}
            />
            <Field
              id="set-email"
              label={t('co.email')}
              icon="mail"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              hint={t('set.emailHint')}
              value={form.email}
              onChange={set('email')}
              error={errorText('email')}
            />
            <Field
              id="set-phone"
              label={t('co.phone')}
              icon="phone"
              prefix="+251"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="911 234 567"
              hint={t('set.phoneHint')}
              value={form.phone}
              onChange={set('phone')}
              error={errorText('phone')}
            />

            <div className="flex flex-wrap items-center gap-4">
              <Btn type="submit" disabled={!dirty} className="disabled:pointer-events-none disabled:opacity-40">
                <Icon n="check" className="h-4 w-4" />
                {t('set.save')}
              </Btn>
              {saved_ && (
                <p role="status" className="inline-flex items-center gap-1.5 text-sm font-bold text-teal dark:text-aqua">
                  <Icon n="check" className="h-4 w-4" />
                  {t('set.saved')}
                </p>
              )}
              {!saved_ && dirty && <p className="text-sm text-mortar dark:text-white/60">{t('set.unsaved')}</p>}
            </div>
          </form>

          {joined && (
            <p className="mt-5 border-t border-navy/10 pt-4 text-xs text-mortar dark:border-white/10 dark:text-white/55">
              {t('set.joined', { date: joined })}
            </p>
          )}
        </Section>

        {/* Appearance */}
        <Section icon="sun" title={t('set.appearance')} lead={t('set.appearanceLead')}>
          <fieldset>
            <legend className="sr-only">{t('set.theme')}</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {themes.map(([val, key, ic]) => (
                <label key={val} className="cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === val}
                    onChange={() => theme !== val && toggle()}
                    className="peer sr-only"
                  />
                  <span className="flex items-center gap-3 rounded-2xl border border-navy/10 p-4 transition hover:border-navy/30 peer-checked:border-aqua peer-checked:bg-aqua/10 peer-focus-visible:ring-4 peer-focus-visible:ring-aqua/40 dark:border-white/15 dark:hover:border-white/35 dark:peer-checked:border-aqua">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-teal dark:bg-navy dark:text-aqua">
                      <Icon n={ic} className="h-5 w-5" />
                    </span>
                    <span className="font-bold">{t(key)}</span>
                    {theme === val && <Icon n="check" className="ml-auto h-5 w-5 text-teal dark:text-aqua" />}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </Section>

        {/* Language */}
        <Section icon="globe" title={t('settings.lang.title')} lead={t('settings.lang.lead')}>
          <fieldset>
            <legend className="sr-only">{t('settings.lang.title')}</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {LANGUAGES.map((l) => (
                <label key={l.code} className="cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    checked={lang === l.code}
                    onChange={() => setLang(l.code)}
                    className="peer sr-only"
                  />
                  <span className="flex items-center gap-3 rounded-2xl border border-navy/10 p-4 transition hover:border-navy/30 peer-checked:border-aqua peer-checked:bg-aqua/10 peer-focus-visible:ring-4 peer-focus-visible:ring-aqua/40 dark:border-white/15 dark:hover:border-white/35 dark:peer-checked:border-aqua">
                    <span
                      lang={l.code}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-sm font-bold text-teal dark:bg-navy dark:text-aqua"
                    >
                      {l.short}
                    </span>
                    <span className="min-w-0">
                      <span lang={l.code} className="block font-bold">
                        {l.native}
                      </span>
                      {l.native !== l.name && (
                        <span className="block text-xs text-mortar dark:text-white/55">{l.name}</span>
                      )}
                    </span>
                    {lang === l.code && <Icon n="check" className="ml-auto h-5 w-5 shrink-0 text-teal dark:text-aqua" />}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-mist p-3.5 text-sm text-mortar dark:bg-navy dark:text-white/65">
            <Icon n="info" className="mt-0.5 h-4 w-4 shrink-0" />
            {t('settings.lang.note')}
          </p>
        </Section>

        {/* Local data */}
        <Section icon="shield" title={t('set.data')} lead={t('set.dataLead')}>
          <div className="grid gap-3">
            <DangerRow
              label={t('set.orders')}
              detail={t('set.ordersDetail')}
              count={orders.length}
              onConfirm={clearOrders}
            />
            <DangerRow
              label={t('account.saved')}
              detail={t('set.savedDetail')}
              count={saved.length}
              onConfirm={clearSaved}
            />
            <DangerRow
              label={t('set.draft')}
              detail={t('set.draftDetail')}
              count={draft ? 1 : 0}
              onConfirm={clearCheckout}
            />
          </div>
        </Section>

        {/* Session */}
        <Section icon="logout" title={t('nav.signOut')} lead={t('set.signOutLead')}>
          <div className="flex flex-wrap items-center gap-4">
            <Btn as="button" variant="dark" onClick={leave}>
              <Icon n="logout" className="h-4 w-4" />
              {t('nav.signOut')}
            </Btn>
            <p className="text-sm text-mortar dark:text-white/60">{t('set.signOutNote')}</p>
          </div>
        </Section>

        <p className="flex items-start gap-2 text-xs text-mortar dark:text-white/55">
          <Icon n="info" className="h-4 w-4 shrink-0" />
          {t('set.preview')}
        </p>
      </div>
    </AccountLayout>
  )
}