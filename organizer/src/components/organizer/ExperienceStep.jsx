import { Icon } from '../common/Icon'
import { Field, TextareaField } from '../common/FormField'
import { categories } from '../../data'
import { FREQUENCIES } from '../../data/organizer'

const TYPES = [...categories, { name: 'Other', icon: 'plus' }]

export function validateExperience(d) {
  const x = {}
  if (!d.eventTypes.length) x.eventTypes = 'Select at least one type of event.'
  if (d.eventTypes.includes('Other') && d.otherType.trim().length < 2) x.otherType = 'Tell us what other type of event you organize.'
  if (!d.frequency) x.frequency = 'Please choose how often you organize events.'
  return x
}

export function ExperienceStep({ data, set, errors }) {
  const toggle = (name) =>
    set('eventTypes')(data.eventTypes.includes(name) ? data.eventTypes.filter((t) => t !== name) : [...data.eventTypes, name])

  return (
    <div className="grid gap-9">
      <fieldset>
        <legend className="text-sm font-bold">What types of events do you organize?</legend>
        <p className="mb-3 mt-0.5 text-sm text-mortar dark:text-white/65">Select all that apply.</p>
        <div className="flex flex-wrap gap-2.5">
          {TYPES.map((t) => {
            const on = data.eventTypes.includes(t.name)
            return (
              <label key={t.name} className="cursor-pointer">
                <input type="checkbox" checked={on} onChange={() => toggle(t.name)} aria-invalid={errors.eventTypes ? true : undefined} className="peer sr-only" />
                <span className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition peer-focus-visible:ring-4 peer-focus-visible:ring-aqua/40 ${
                  on ? 'border-transparent bg-navy text-white dark:bg-aqua dark:text-navy' : 'border-navy/15 hover:border-aqua hover:bg-aqua/15 dark:border-white/20'}`}>
                  <Icon n={on ? 'check' : t.icon} className="h-4 w-4" />{t.name}
                </span>
              </label>
            )
          })}
        </div>
        {errors.eventTypes && <p role="alert" className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.eventTypes}</p>}
        {data.eventTypes.includes('Other') && (
          <div className="animate-up mt-4 max-w-sm">
            <Field id="otherType" label="What other type of event?" placeholder="e.g. Conference, Sports tournament" value={data.otherType} onChange={set('otherType')} error={errors.otherType} />
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend className="text-sm font-bold">How often do you organize events?</legend>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {FREQUENCIES.map((f) => {
            const on = data.frequency === f.id
            return (
              <label key={f.id} className="cursor-pointer">
                <input type="radio" name="frequency" value={f.id} checked={on} onChange={() => set('frequency')(f.id)} aria-invalid={errors.frequency ? true : undefined} className="peer sr-only" />
                <span className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-bold transition peer-focus-visible:ring-4 peer-focus-visible:ring-aqua/40 ${
                  on ? 'border-aqua bg-aqua/10' : errors.frequency ? 'border-red-500' : 'border-navy/10 hover:border-aqua/60 dark:border-white/15'}`}>
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${on ? 'border-aqua bg-aqua text-navy' : 'border-navy/30 dark:border-white/40'}`}>
                    {on && <Icon n="check" className="h-3 w-3" />}
                  </span>
                  {f.label}
                </span>
              </label>
            )
          })}
        </div>
        {errors.frequency && <p role="alert" className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.frequency}</p>}
      </fieldset>

      <TextareaField id="experience" label="Tell us a little about your experience organizing events." optional
        hint="This helps our team during review." placeholder="Events you’ve organized, venues you’ve worked with, anything you’d like us to know…"
        value={data.experience} onChange={set('experience')} error={errors.experience} />
    </div>
  )
}