import { Icon } from '../common/Icon'

export function OptionCard({ name, value, checked, onChange, icon, title, text, error }) {
  return (
    <label className="block cursor-pointer">
      <input type="radio" id={`${name}-${value}`} name={name} value={value} checked={checked} onChange={() => onChange(value)}
        aria-invalid={error ? true : undefined} className="peer sr-only" />
      <div className={`h-full rounded-2xl border-2 p-5 transition duration-300 peer-focus-visible:ring-4 peer-focus-visible:ring-aqua/40 ${
        checked ? 'border-aqua bg-aqua/10' : error ? 'border-red-500' : 'border-navy/10 hover:-translate-y-0.5 hover:border-aqua/60 dark:border-white/15'}`}>
        <div className="flex items-start justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-mist text-teal dark:bg-navy dark:text-aqua"><Icon n={icon} /></span>
          <span className={`grid h-6 w-6 place-items-center rounded-full border-2 transition ${checked ? 'border-aqua bg-aqua text-navy' : 'border-navy/25 dark:border-white/30'}`}>
            {checked && <Icon n="check" className="h-3.5 w-3.5" />}
          </span>
        </div>
        <p className="mt-4 font-heading text-lg font-bold">{title}</p>
        <p className="mt-1 text-sm text-mortar dark:text-white/65">{text}</p>
      </div>
    </label>
  )
}