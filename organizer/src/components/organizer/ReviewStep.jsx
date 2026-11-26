import { ApplicationSummary } from './ApplicationSummary'
import { buildApplicationSummary } from '../../utils/applicationSummary'

export function ReviewStep({ data, uploads, onEdit, issues }) {
  return (
    <div className="grid gap-5">
      {issues.length > 0 && (
        <div id="review-issues" role="alert" className="rounded-2xl border border-red-500/60 bg-red-50 p-4 text-sm dark:bg-red-500/10">
          <p className="font-bold text-red-800 dark:text-red-300">A few things need your attention before you can submit:</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {issues.map((i) => (
              <li key={i.step}><button type="button" onClick={() => onEdit(i.step)} className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-navy ring-1 ring-red-500/40 transition hover:bg-red-100">Fix {i.title}</button></li>
            ))}
          </ul>
        </div>
      )}
      <ApplicationSummary sections={buildApplicationSummary(data, uploads.docs)} onEdit={onEdit} />
    </div>
  )
}