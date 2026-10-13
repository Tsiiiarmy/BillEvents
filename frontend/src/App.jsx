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
import SuccessPage from './pages/Checkout/SuccessPage'
import MyTicketsPage from './pages/Account/MyTicketsPage'
import TicketViewPage from './pages/Account/TicketViewPage'
import AccountSoonPage from './pages/Account/AccountSoonPage'
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
        <Route path="/checkout/success/:ref" element={<SuccessPage {...t} />} />

        {/* Account */}
        <Route path="/account" element={<Navigate to="/account/tickets" replace />} />
        <Route path="/account/tickets" element={<MyTicketsPage {...t} />} />
        <Route path="/account/tickets/:ref" element={<TicketViewPage {...t} />} />
        <Route
          path="/account/saved"
          element={
            <AccountSoonPage
              {...t}
              title="Saved Events"
              icon="heart"
              text="The heart button on an event will save it here. That's the next stage."
            />
          }
        />
        <Route
          path="/account/settings"
          element={
            <AccountSoonPage
              {...t}
              title="Settings"
              icon="settings"
              text="Your name, contact details and preferences will be editable here."
            />
          }
        />

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