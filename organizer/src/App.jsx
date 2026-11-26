import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import useTheme from './hooks/useTheme'

import { DevStatusSwitcher } from './components/common/DevStatusSwitcher'
import OrganizerGate from './pages/Organizer/OrganizerGate'
import BecomeOrganizerPage from './pages/Organizer/BecomeOrganizerPage'
import RegisterPage from './pages/Organizer/RegisterPage'
import SubmittedPage from './pages/Organizer/SubmittedPage'
import StatusPage from './pages/Organizer/StatusPage'
import ComingSoon from './pages/Organizer/ComingSoon'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { pathname, hash } = useLocation()
  const t = { theme, toggle: toggleTheme }

  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/organizer" replace />} />
        <Route path="/organizer" element={<OrganizerGate />} />
        <Route path="/organizer/apply" element={<BecomeOrganizerPage {...t} />} />
        <Route path="/organizer/register" element={<RegisterPage {...t} />} />
        <Route path="/organizer/submitted" element={<SubmittedPage {...t} />} />
        <Route path="/organizer/status" element={<StatusPage {...t} />} />
        <Route
          path="/organizer/dashboard"
          element={
            <ComingSoon
              {...t}
              title="Organizer dashboard"
              text="Your dashboard and the Create Event button are built in Stage 6."
            />
          }
        />
        <Route path="*" element={<Navigate to="/organizer" replace />} />
      </Routes>
      {import.meta.env.DEV && <DevStatusSwitcher />}
    </>
  )
}