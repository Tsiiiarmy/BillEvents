import { Icon } from './Icon'
import useLanguage from '../../hooks/useLanguage'

const box = (error) =>
  `flex items-center gap-2 rounded-xl border bg-white px-3.5 transition focus-within:ring-4 dark:bg-navy ${
    error
      ? 'border-red-500 focus-within:ring-red-500/20'
      : 'border-navy/15 focus-within:border-aqua focus-within:ring-aqua/30 dark:border-white/15'
  }`

function Label({ id, label, optional }) {
  const { t } = useLanguage()
  return (
    <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-bold">
      <span>{label}</span>
      {optional && <span className="text-xs font-normal text-mortar dark:text-white/50">{t('form.optional')}</span>}
    </label>
  )
}

function Message({ id, error, hint }) {
  if (error)
    return (
      <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
        {error}
      </p>
    )
  if (hint)
    return (
      <p id={`${id}-hint`} className="mt-1.5 text-xs text-mortar dark:text-white/55">
        {hint}
      </p>
    )
  return null
}

const describedBy = (id, error, hint) => (error ? `${id}-err` : hint ? `${id}-hint` : undefined)

export function Field({ id, label, icon, prefix, hint, optional, error, value, onChange, ...p }) {
  return (
    <div>
      <Label id={id} label={label} optional={optional} />
      <div className={box(error)}>
        {icon && <Icon n={icon} className="h-4 w-4 shrink-0 text-mortar dark:text-white/50" />}
        {prefix && (
          <span className="border-r border-navy/15 pr-2 text-sm font-bold text-mortar dark:border-white/15 dark:text-white/60">
            {prefix}
          </span>
        )}
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className="min-w-0 flex-1 bg-transparent py-3 outline-none placeholder:text-mortar/50 dark:placeholder:text-white/30"
          {...p}
        />
      </div>
      <Message id={id} error={error} hint={hint} />
    </div>
  )
}

export function SelectField({ id, label, hint, optional, error, value, onChange, options, placeholder }) {
  const { t } = useLanguage()
  return (
    <div>
      <Label id={id} label={label} optional={optional} />
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`w-full cursor-pointer rounded-xl border bg-white px-3 py-3 transition focus:ring-4 dark:bg-navy [&>option]:text-navy ${
          error
            ? 'border-red-500 focus:ring-red-500/20'
            : 'border-navy/15 focus:border-aqua focus:ring-aqua/30 dark:border-white/15'
        } ${value ? '' : 'text-mortar/60 dark:text-white/40'}`}
      >
        <option value="">{placeholder ?? t('form.select')}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Message id={id} error={error} hint={hint} />
    </div>
  )
}

export function TextareaField({ id, label, hint, optional, error, value, onChange, max = 600, rows = 5, ...p }) {
  return (
    <div>
      <Label id={id} label={label} optional={optional} />
      <div className={box(error)}>
        <textarea
          id={id}
          rows={rows}
          maxLength={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className="min-w-0 flex-1 resize-y bg-transparent py-3 outline-none placeholder:text-mortar/50 dark:placeholder:text-white/30"
          {...p}
        />
      </div>
      <div className="flex justify-between gap-3">
        <div className="flex-1">
          <Message id={id} error={error} hint={hint} />
        </div>
        <p className="mt-1.5 text-xs text-mortar dark:text-white/50" aria-hidden="true">
          {value.length}/{max}
        </p>
      </div>
    </div>
  )
}