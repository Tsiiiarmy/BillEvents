import { Link } from 'react-router-dom'
import { Navbar } from '../../components/layout/NavBar'
import { SkipLink } from '../../components/common/SkipLink'
import { StatusBadge } from '../../components/common/StatusBadge'
import { Btn } from '../../components/common/Btn'
import useOrganizer from '../../hooks/useOrganizer'

export default function ComingSoon({ theme, toggle, title, text }) {
  const { status } = useOrganizer()
  return (
    <>
      <SkipLink />
      <Navbar theme={theme} toggle={toggle} />
      <main id="main" className="wrap grid min-h-[60vh] place-items-center py-20 text-center">
        <div className="max-w-md">
          <StatusBadge status={status} />
          <h1 className="mt-5 font-heading text-3xl font-bold">{title}</h1>
          <p className="mt-3 text-mortar dark:text-white/70">{text}</p>
          <Btn as={Link} to="/" variant="dark" className="mt-8">Back to home</Btn>
        </div>
      </main>
    </>
  )
}