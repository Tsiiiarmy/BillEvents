import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import useTheme from './hooks/useTheme'

import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { SkipLink } from './components/common/SkipLink'
// import { DevStatusSwitcher } from './components/common/DevStatusSwitcher'
import { DevUserSwitcher } from './components/common/DevUserSwitcher'

import { Hero } from './components/landing/Hero'
import { Featured } from './components/landing/Featured'
import { Categories } from './components/landing/Categories'
import { HowItWorks } from './components/landing/HowItWorks'
import { Organizers } from './components/landing/Organizers'
import { AppSection } from './components/landing/AppSection'
import { Trust } from './components/landing/Trust'

import AuthPage from './pages/Auth/AuthPage'
import DiscoverPage from './pages/Discover/DiscoverPage'
import EventDetailPage from './pages/EventDetail/EventDetailPage'
import CheckoutPage from './pages/Checkout/CheckoutPage'
import PaymentPage from './pages/Checkout/PaymentPage'
import OrganizerGate from './pages/Organizer/OrganizerGate'
import BecomeOrganizerPage from './pages/Organizer/BecomeOrganizerPage'
import StatusPage from './pages/Organizer/StatusPage'
import ComingSoon from './pages/Organizer/ComingSoon'
import RegisterPage from './pages/Organizer/RegisterPage'
import SubmittedPage from './pages/Organizer/SubmittedPage'

function Landing({ theme, toggle }) {
  return (
    <>
      <SkipLink />
      <Navbar theme={theme} toggle={toggle} />
      <main id="main">
        <Hero />
        <Featured />
        <Categories />
        <HowItWorks />
        <Organizers />
        <AppSection />
        <Trust />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { pathname, hash } = useLocation()
  const t = { theme, toggle: toggleTheme }

  // New page → scroll to top. Link with #section (e.g. /#how) → scroll to that section.
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing {...t} />} />
        <Route path="/events" element={<DiscoverPage {...t} />} />
        <Route path="/events/:id" element={<EventDetailPage {...t} />} />
        <Route path="/signin" element={<AuthPage key="signin" mode="signin" {...t} />} />
        <Route path="/signup" element={<AuthPage key="signup" mode="signup" {...t} />} />
        {/* Customer ticketing journey */}
        <Route path="/checkout" element={<CheckoutPage {...t} />} />
        <Route path="/checkout/payment" element={<PaymentPage {...t} />} />

        {/* Organizer journey */}
        <Route path="/organizer" element={<OrganizerGate />} />
        <Route path="/organizer/apply" element={<BecomeOrganizerPage {...t} />} />
        <Route path="/organizer/register" element={<RegisterPage {...t} />} />
        <Route path="/organizer/submitted" element={<SubmittedPage {...t} />} />
        <Route path="/organizer/status" element={<StatusPage {...t} />} />
        <Route path="/organizer/dashboard" element={<ComingSoon {...t} title="Organizer dashboard" text="Your dashboard and the Create Event button are built in Stage 6." />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <DevStatusSwitcher /> */}
      <DevUserSwitcher />
    </>
  )
}