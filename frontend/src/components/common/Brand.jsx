import logoLight from '../../assets/logo/billevents-logo.svg'
import logoDark from '../../assets/logo/billevents-logo-reverse.svg'
import payLight from '../../assets/logo/billpay-logo.svg'
import payDark from '../../assets/logo/billpay-logo-reverse.svg'

export function Logo({ theme = 'light', className = 'h-8 w-auto' }) {
  return (
    <img
      src={theme === 'dark' ? logoDark : logoLight}
      alt="BillEvents"
      className={className}
    />
  )
}

export function BillPay({ theme = 'light', fixedDark = false, className = 'h-6 w-auto' }) {
  const src = fixedDark
    ? payDark
    : theme === 'dark'
      ? payDark
      : payLight

  return (
    <img
      src={src}
      alt="BillPay"
      className={className}
    />
  )
}