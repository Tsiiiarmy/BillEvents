import { Icon } from './Icon'
import { STATUS_META } from '../../data/organizer'

const tones = {
  neutral: 'bg-navy/10 text-navy dark:bg-white/10 dark:text-white',
  amber: 'bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200',
  orange: 'bg-orange-100 text-orange-900 dark:bg-orange-400/15 dark:text-orange-200',
  red: 'bg-red-100 text-red-900 dark:bg-red-400/15 dark:text-red-200',
  green: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-200',
}
const icons = { neutral: 'user', amber: 'clock', orange: 'file', red: 'x', green: 'check' }

export function StatusBadge({ status }) {
  const m = STATUS_META[status] ?? STATUS_META.none
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${tones[m.tone]}`}>
      <Icon n={icons[m.tone]} className="h-3.5 w-3.5" />
      {m.label}
    </span>
  )
}