import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { InfoLayout } from '../../components/info/InfoLayout'
import { Field, TextareaField } from '../../components/common/FormField'
import { Btn } from '../../components/common/Btn'
import { Icon } from '../../components/common/Icon'
import useAuth from '../../hooks/useAuth'
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
  const [params] = useSearchParams()
  const startRef = (params.get('ref') ?? '').toUpperCase()

  const [form, setForm] = useState(() => blank(user, startRef))
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const doneRef = useRef(null)

  useEffect(() => {
    if (sent) doneRef.current?.focus()
  }, [sent])

  const set = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const e = {}
    const reply = form.reply.trim()
    if (!form.name.trim()) e.name = 'Tell us your name.'
    if (!EMAIL.test(reply) && !PHONE.test(reply)) e.reply = 'Enter an email address or phone number we can reply to.'
    if (form.ref.trim() && !ORDER_REF.test(form.ref.trim())) e.ref = 'Order references look like BE-7KQ2MX.'
    if (!form.topic) e.topic = 'Choose what your message is about.'
    if (form.message.trim().length < 10) e.message = 'Add a few more details (at least 10 characters).'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    setSent(true)
  }

  const channels = [
    CONTACT.email && { icon: 'mail', label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    CONTACT.phone && { icon: 'phone', label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    CONTACT.hours && { icon: 'clock', label: 'Hours', value: CONTACT.hours },
    CONTACT.address && { icon: 'pin', label: 'Office', value: CONTACT.address },
  ].filter(Boolean)

  const topicLabel = CONTACT_TOPICS.find((t) => t.id === form.topic)?.label

  return (
    <InfoLayout
      theme={theme}
      toggle={toggle}
      eyebrow="Contact"
      title="Get in touch"
      lead="Questions about an order, a payment or your account? Send us a message."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
        <div className="rounded-3xl bg-white p-6 sm:p-8 dark:bg-navy-2">
          {sent ? (
            <div className="py-6 text-center">
              <span className="animate-pop mx-auto grid h-16 w-16 place-items-center rounded-full bg-aqua text-navy">
                <Icon n="check" className="h-8 w-8" />
              </span>
              <h2 ref={doneRef} tabIndex={-1} className="mt-5 font-heading text-2xl font-bold outline-none">
                Message ready
              </h2>
              <p className="mx-auto mt-2 max-w-md text-mortar dark:text-white/70">
                {topicLabel}
                {form.ref.trim() && <> · <span className="font-mono">{form.ref.trim()}</span></>}
              </p>
              <p className="mx-auto mt-5 flex max-w-md items-start gap-2 rounded-2xl bg-mist p-4 text-left text-sm text-navy dark:bg-white/10 dark:text-white/80">
                <Icon n="info" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <span className="font-bold">Preview build.</span> There’s no server yet, so this
                  message wasn’t actually sent. Once BillEvents is live, it will go straight to the
                  support team.
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
                  Write another
                </Btn>
                <Btn as={Link} to="/help" variant="ghost">
                  Back to Help
                </Btn>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="contact-name"
                  label="Your name"
                  icon="user"
                  autoComplete="name"
                  value={form.name}
                  onChange={set('name')}
                  error={errors.name}
                />
                <Field
                  id="contact-reply"
                  label="Email or phone number"
                  icon="mail"
                  hint="We’ll reply here."
                  autoComplete="email"
                  value={form.reply}
                  onChange={set('reply')}
                  error={errors.reply}
                />
              </div>

              <Field
                id="contact-ref"
                label="Order reference"
                icon="ticket"
                optional
                hint="On your ticket and receipt, e.g. BE-7KQ2MX."
                value={form.ref}
                onChange={(v) => set('ref')(v.toUpperCase())}
                error={errors.ref}
              />

              <fieldset aria-describedby={errors.topic ? 'contact-topic-error' : undefined}>
                <legend className="text-sm font-bold">What is this about?</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {CONTACT_TOPICS.map((t, i) => {
                    const on = form.topic === t.id
                    return (
                      <label key={t.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="topic"
                          value={t.id}
                          id={i === 0 ? 'contact-topic' : undefined}
                          checked={on}
                          onChange={() => set('topic')(t.id)}
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
                          {t.label}
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
                    {errors.topic}
                  </p>
                )}
              </fieldset>

              <TextareaField
                id="contact-message"
                label="Your message"
                rows={6}
                value={form.message}
                onChange={set('message')}
                error={errors.message}
              />

              <div>
                <Btn type="submit" variant="primary">
                  <Icon n="send" className="h-4 w-4" />
                  Send message
                </Btn>
              </div>
            </form>
          )}
        </div>

        <aside className="grid content-start gap-4">
          <div className="rounded-3xl bg-white p-6 dark:bg-navy-2">
            <h2 className="font-heading text-lg font-bold">Before you write</h2>
            <p className="mt-2 text-sm text-mortar dark:text-white/70">
              Most questions about tickets, payments and entry are answered in the Help Center.
            </p>
            <Link
              to="/help"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:underline dark:text-aqua"
            >
              Visit the Help Center
              <Icon n="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-6 dark:bg-navy-2">
            <h2 className="font-heading text-lg font-bold">About an order?</h2>
            <p className="mt-2 text-sm text-mortar dark:text-white/70">
              Include your order reference. It starts with <span className="font-mono font-bold">BE-</span>{' '}
              and is shown on your ticket and in My Tickets.
            </p>
          </div>

          {channels.length > 0 && (
            <div className="rounded-3xl bg-navy p-6 text-white">
              <h2 className="font-heading text-lg font-bold">Other ways to reach us</h2>
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