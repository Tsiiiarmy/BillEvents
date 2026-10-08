import { Icon } from './Icon'

export function ThemeToggle({ theme, toggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <Icon n={isDark ? 'sun' : 'moon'} />
    </button>
  )
}