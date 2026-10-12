import { Icon } from '../common/Icon'

export function ApplicationSummary({ sections, onEdit }) {
  return (
    <div className="grid gap-5">
      {sections.map((s) => (
        <section key={s.title} aria-labelledby={`rev-${s.step}`} className="rounded-2xl border border-navy/10 p-5 text-left dark:border-white/15">
          <div className="flex items-center justify-between gap-3">
            <h2 id={`rev-${s.step}`} className="font-heading text-lg font-bold">{s.title}</h2>
            {onEdit && (
              <button type="button" onClick={() => onEdit(s.step)} aria-label={`Edit ${s.title}`}
                className="rounded-full border border-navy/20 px-4 py-1.5 text-xs font-bold transition hover:bg-navy/5 dark:border-white/25 dark:hover:bg-white/10">Edit</button>
            )}
          </div>
          <dl className="mt-3 divide-y divide-navy/10 dark:divide-white/10">
            {s.rows.map(([label, value, ok]) => (
              <div key={label} className="grid gap-0.5 py-2.5 sm:grid-cols-[12rem_1fr] sm:gap-4">
                <dt className="text-sm text-mortar dark:text-white/60">{label}</dt>
                <dd className={`flex items-start gap-2 break-words text-sm font-bold ${ok === false ? 'text-red-700 dark:text-red-300' : ''}`}>
                  {ok === true && <Icon n="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal dark:text-aqua" />}
                  {ok === false && <Icon n="x" className="mt-0.5 h-4 w-4 shrink-0" />}
                  <span className="min-w-0 whitespace-pre-line">{value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}