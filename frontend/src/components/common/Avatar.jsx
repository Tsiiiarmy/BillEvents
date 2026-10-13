/** "Mikiyas Getachew" → "MG". Falls back to the email, then a dash. */
export function initials(user) {
  const name = (user?.name || '').trim()
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean)
    return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase()
  }
  if (user?.email) return user.email[0].toUpperCase()
  return '—'
}

export function Avatar({ user, className = 'h-9 w-9 text-sm' }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-navy font-heading font-bold text-white dark:bg-aqua dark:text-navy ${className}`}
    >
      {initials(user)}
    </span>
  )
}