import { Icon } from '../common/Icon'

export function ProgressStepper({ steps, current, onGo }) {
  return (
    <>
      {/* Mobile: compact */}
      <div className="sm:hidden">
        <p className="text-xs font-bold text-teal dark:text-aqua">Step {current + 1} of {steps.length}</p>
        <p className="font-heading text-lg font-bold">{steps[current].title}</p>
        <div role="progressbar" aria-label="Application progress" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={current + 1}
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy/10 dark:bg-white/15">
          <div className="h-full rounded-full bg-aqua transition-all duration-500" style={{ width: `${((current + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      {/* Tablet and desktop: numbered steps */}
      <ol aria-label="Application progress" className="hidden items-start sm:flex">
        {steps.map((s, i) => {
          const done = i < current
          const on = i === current
          return (
            <li key={s.n} className="relative flex-1 text-center">
              {i > 0 && <span aria-hidden="true" className={`absolute -left-1/2 top-5 h-0.5 w-full transition-colors duration-500 ${i <= current ? 'bg-aqua' : 'bg-navy/15 dark:bg-white/15'}`} />}
              <button type="button" disabled={i > current} onClick={() => onGo(i)} aria-current={on ? 'step' : undefined}
                aria-label={`${s.title}${done ? ' (completed)' : on ? ' (current step)' : ''}`}
                className="group relative z-10 mx-auto grid justify-items-center gap-2 disabled:cursor-default">
                <span className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition duration-300 ${
                  done ? 'bg-aqua text-navy group-hover:scale-105'
                  : on ? 'bg-navy text-white ring-4 ring-aqua/40 dark:bg-aqua dark:text-navy'
                  : 'bg-mist text-mortar dark:bg-navy dark:text-white/50'}`}>
                  {done ? <Icon n="check" className="h-5 w-5" /> : s.n}
                </span>
                <span className={`text-xs font-bold ${on ? '' : 'text-mortar dark:text-white/55'}`}>{s.title}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </>
  )
}