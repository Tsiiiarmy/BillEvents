import { Icon } from './Icon'
import useSaved from '../../hooks/useSaved'

/**
 * The heart. Works anywhere, including inside a card that is wrapped in a
 * Link — the click is stopped so saving never navigates.
 *
 * tone 'overlay' sits on a photo or gradient; 'plain' sits on a page.
 */
export function SaveButton({ event, tone = 'overlay', size = 'h-10 w-10', className = '' }) {
  const { saved, toggleSaved } = useSaved()
  const on = saved.includes(String(event.id))

  const press = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSaved(event.id)
  }

  const tones = {
    overlay: 'bg-white/90 text-navy backdrop-blur hover:bg-white',
    plain:
      'border border-navy/15 bg-white text-navy hover:bg-mist dark:border-white/20 dark:bg-navy-2 dark:text-white dark:hover:bg-white/10',
  }

  return (
    <button
      type="button"
      onClick={press}
      aria-pressed={on}
      aria-label={on ? `Remove ${event.title} from saved events` : `Save ${event.title}`}
      title={on ? 'Saved' : 'Save for later'}
      className={`grid shrink-0 place-items-center rounded-full transition hover:scale-110 active:scale-90 motion-reduce:hover:scale-100 focus-visible:ring-4 focus-visible:ring-aqua/40 ${size} ${tones[tone] || tones.overlay} ${className}`}
    >
      <Icon
        n="heart"
        className={`h-5 w-5 transition ${on ? 'scale-110 fill-red-500 text-red-500 motion-reduce:scale-100' : ''}`}
      />
    </button>
  )
}