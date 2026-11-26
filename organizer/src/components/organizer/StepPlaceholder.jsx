import { Icon } from '../common/Icon'

export function StepPlaceholder({ title }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-navy/20 px-6 py-14 text-center dark:border-white/20">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-mist text-teal dark:bg-navy dark:text-aqua"><Icon n="clock" className="h-7 w-7" /></span>
      <p className="mt-4 font-heading text-lg font-bold">{title} is coming in the next stage</p>
      <p className="mt-1 max-w-sm text-sm text-mortar dark:text-white/65">You can keep clicking Continue to see how the full flow will feel.</p>
    </div>
  )
}