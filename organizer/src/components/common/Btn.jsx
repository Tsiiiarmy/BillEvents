/**
 * `as` can be any element name or component: 'button', 'a', or a router
 * <Link>. Whatever you pass is what renders, and every extra prop
 * (to, href, onClick, disabled, type, form) goes straight through to it.
 */
export function Btn({ children, as: As = 'button', variant = 'primary', className = '', ...props }) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0'

  const variants = {
    primary: 'bg-aqua text-navy hover:shadow-lg hover:shadow-aqua/25',
    dark: 'bg-navy text-white hover:bg-navy-2 dark:bg-white dark:text-navy',
    ghost: 'border border-white/30 text-white hover:border-aqua hover:bg-aqua hover:text-navy',
  }

  const classes = `${base} ${variants[variant] || variants.primary} ${className}`

  // A <button> with no type inside a <form> submits it by accident.
  // Links and anchors must not get a type attribute at all.
  const typeProp = As === 'button' && props.type === undefined ? { type: 'button' } : {}

  return (
    <As className={classes} {...typeProp} {...props}>
      {children}
    </As>
  )
}