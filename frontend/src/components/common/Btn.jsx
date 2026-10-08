export function Btn({
  children,
  as = 'button',
  href,
  variant = 'primary',
  className = '',
  ...props
}) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition duration-200 hover:-translate-y-0.5 active:translate-y-0'

  const variants = {
    primary: 'bg-aqua text-navy hover:shadow-lg hover:shadow-aqua/25',
    dark: 'bg-navy text-white hover:bg-navy-2 dark:bg-white dark:text-navy',
    ghost:
      'border border-white/30 text-white hover:border-aqua hover:bg-aqua hover:text-navy',
  }

  const classes = `${base} ${variants[variant] || variants.primary} ${className}`

  if (as === 'a') {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}