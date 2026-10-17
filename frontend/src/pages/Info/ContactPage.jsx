import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { InfoLayout } from '../../components/info/InfoLayout'
import { Field, TextareaField } from '../../components/common/FormField'
import { Btn } from '../../components/common/Btn'
import { Icon } from '../../components/common/Icon'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { CONTACT, CONTACT_TOPICS, ORDER_REF } from '../../data/support'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^\+?[0-9][0-9\s-]{7,}$/

const blank = (user, ref) => ({
  name: user?.name ?? '',
  reply: user?.email || user?.phone || '',
  ref,
  topic: ref ? 'order' : '',
  message: '',
})

export default function ContactPage({ theme, toggle }) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [params] = useSearchParams()
  const startRef = (params.get('ref') ?? '').toUpperCase()

  const [form, setForm] = useState(() => blank(user, startRef))
  const [errors, setErrors] = useState({}) // translation KEYS
  const [sent, setSent] = useState(false)
  const doneRef = useRef(null)

  useEffect(() => {
    if (sent) doneRef.current?.focus()
  }, [sent])

  const set = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }
  const e = (k) => (errors[k] ? t(errors[k]) : undefined)

  const validate = () => {
    const x = {}
    const reply = form.reply.trim()
    if (!form.name.trim()) x.name = 'err.name'
    if (!EMAIL.test(reply) && !PHONE.test(reply)) x.reply = 'ct.errReply'
    if (form.ref.trim() && !ORDER_REF.test(form.ref.trim())) x.ref = 'ct.errRef'
    if (!form.topic) x.topic = 'ct.errTopic'
    if (form.message.trim().length < 10) x.message = 'ct.errMessage'
    return x
  }

  const submit = (ev) => {
    ev.preventDefault()
    const x = validate()
    setErrors(x)
    const first = Object.keys(x)[0]
    if (first) {
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    setSent(true)
  }

  const topicLabel = (tp) => t(`ct.topic.${tp.id}`, null, tp.label)

  const channels = [
    CONTACT.email && { icon: 'mail', label: t('co.email'), value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    CONTACT.phone && { icon: 'phone', label: t('co.phone'), value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    CONTACT.hours && { icon: 'clock', label: t('ct.hours'), value: CONTACT.hours },
    CONTACT.address && { icon: 'pin', label: t('ct.office'), value: CONTACT.address },
  ].filter(Boolean)

  const current = CONTACT_TOPICS.find((tp) => tp.id === form.topic)
  const [prefixBefore, prefixAfter = ''] = t('ct.orderText').split('{prefix}')

  return (
    <InfoLayout theme={theme} toggle={toggle} eyebrow={t('footer.contact')} title={t('ct.title')} lead={t('ct.lead')}>
      <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
        <div className="rounded-3xl bg-white p-6 sm:p-8 dark:bg-navy-2">
          {sent ? (
            <div className="py-6 text-center">
              <span className="animate-pop mx-auto grid h-16 w-16 place-items-center rounded-full bg-aqua text-navy">
                <Icon n="check" className="h-8 w-8" />
              </span>
              <h2 ref={doneRef} tabIndex={-1} className="mt-5 font-heading text-2xl font-bold outline-none">
                {t('ct.sentTitle')}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-mortar dark:text-white/70">
                {current && topicLabel(current)}
                {form.ref.trim() && (
                  <>
                    {' '}
                    · <span className="font-mono">{form.ref.trim()}</span>
                  </>
                )}
              </p>
              <p className="mx-auto mt-5 flex max-w-md items-start gap-2 rounded-2xl bg-mist p-4 text-left text-sm text-navy dark:bg-white/10 dark:text-white/80">
                <Icon n="info" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <span className="font-bold">{t('ct.previewLabel')}</span> {t('ct.previewText')}
                </span>
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Btn
                  variant="primary"
                  onClick={() => {
                    setForm((f) => ({ ...f, ref: '', topic: '', message: '' }))
                    setSent(false)
                  }}
                >
                  {t('ct.another')}
                </Btn>
                <Btn as={Link} to="/help" variant="ghost">
                  {t('ct.backHelp')}
                </Btn>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="contact-name"
                  label={t('co.name')}
                  icon="user"
                  autoComplete="name"
                  value={form.name}
                  onChange={set('name')}
                  error={e('name')}
                />
                <Field
                  id="contact-reply"
                  label={t('auth.id')}
                  icon="mail"
                  hint={t('ct.replyHint')}
                  autoComplete="email"
                  value={form.reply}
                  onChange={set('reply')}
                  error={e('reply')}
                />
              </div>

              <Field
                id="contact-ref"
                label={t('ct.ref')}
                icon="ticket"
                optional
                hint={t('ct.refHint')}
                value={form.ref}
                onChange={(v) => set('ref')(v.toUpperCase())}
                error={e('ref')}
              />

              <fieldset aria-describedby={errors.topic ? 'contact-topic-error' : undefined}>
                <legend className="text-sm font-bold">{t('ct.topic')}</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {CONTACT_TOPICS.map((tp, i) => {
                    const on = form.topic === tp.id
                    return (
                      <label key={tp.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="topic"
                          value={tp.id}
                          id={i === 0 ? 'contact-topic' : undefined}
                          checked={on}
                          onChange={() => set('topic')(tp.id)}
                          className="peer sr-only"
                        />
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition peer-focus-visible:ring-2 peer-focus-visible:ring-aqua ${
                            on
                              ? 'border-navy bg-navy text-white dark:border-aqua dark:bg-aqua dark:text-navy'
                              : 'border-navy/15 text-mortar hover:border-navy/40 dark:border-white/15 dark:text-white/70 dark:hover:border-white/40'
                          }`}
                        >
                          {on && <Icon n="check" className="h-4 w-4" />}
                          {topicLabel(tp)}
                        </span>
                      </label>
                    )
                  })}
                </div>
                {errors.topic && (
                  <p
                    id="contact-topic-error"
                    className="mt-2 flex items-center gap-1.5 text-sm font-bold text-red-600 dark:text-red-400"
                  >
                    <Icon n="alert" className="h-4 w-4" />
                    {t(errors.topic)}
                  </p>
                )}
              </fieldset>

              <TextareaField
                id="contact-message"
                label={t('ct.message')}
                rows={6}
                value={form.message}
                onChange={set('message')}
                error={e('message')}
              />

              <div>
                <Btn type="submit" variant="primary">
                  <Icon n="send" className="h-4 w-4" />
                  {t('ct.send')}
                </Btn>
              </div>
            </form>
          )}
        </div>

        <aside className="grid content-start gap-4">
          <div className="rounded-3xl bg-white p-6 dark:bg-navy-2">
            <h2 className="font-heading text-lg font-bold">{t('ct.beforeTitle')}</h2>
            <p className="mt-2 text-sm text-mortar dark:text-white/70">{t('ct.beforeText')}</p>
            <Link
              to="/help"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:underline dark:text-aqua"
            >
              {t('ct.visitHelp')}
              <Icon n="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-6 dark:bg-navy-2">
            <h2 className="font-heading text-lg font-bold">{t('ct.orderTitle')}</h2>
            <p className="mt-2 text-sm text-mortar dark:text-white/70">
              {prefixBefore}
              <span className="font-mono font-bold">BE-</span>
              {prefixAfter}
            </p>
          </div>

          {channels.length > 0 && (
            <div className="rounded-3xl bg-navy p-6 text-white">
              <h2 className="font-heading text-lg font-bold">{t('ct.other')}</h2>
              <ul className="mt-4 grid gap-3 text-sm">
                {channels.map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <Icon n={c.icon} className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                    <span>
                      <span className="block text-white/60">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} className="font-bold hover:text-aqua">
                          {c.value}
                        </a>
                      ) : (
                        <span className="font-bold">{c.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </InfoLayout>
  )
}