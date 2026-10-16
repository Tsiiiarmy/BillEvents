import { Icon } from './Icon'
import useLanguage from '../../hooks/useLanguage'

export function ThemeToggle({ theme, toggle }) {
  const { t } = useLanguage()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={t(isDark ? 'theme.toLight' : 'theme.toDark')}
      title={t(isDark ? 'theme.light' : 'theme.dark')}
    >
      <Icon n={isDark ? 'sun' : 'moon'} />
    </button>
  )
}