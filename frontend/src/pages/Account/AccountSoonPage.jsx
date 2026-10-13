import { useEffect } from 'react'

import { AccountLayout } from '../../components/account/AccountLayout'
import { Icon } from '../../components/common/Icon'

/** Placeholder for Saved Events and Settings until their stages land. */
export default function AccountSoonPage({ theme, toggle, title, icon = 'clock', text }) {
  useEffect(() => {
    document.title = `${title} — BillEvents`
  }, [title])

  return (
    <AccountLayout theme={theme} toggle={toggle} title={title}>
      <div className="rounded-3xl bg-white p-10 text-center dark:bg-navy-2">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-teal dark:bg-navy dark:text-aqua">
          <Icon n={icon} className="h-7 w-7" />
        </span>
        <h2 className="mt-5 font-heading text-xl font-bold">Coming in the next stage</h2>
        <p className="mx-auto mt-2 max-w-sm text-mortar dark:text-white/65">{text}</p>
      </div>
    </AccountLayout>
  )
}