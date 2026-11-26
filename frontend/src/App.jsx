import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import useTheme from "./hooks/useTheme";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SkipLink } from "./components/common/SkipLink";
import { DevUserSwitcher } from "./components/common/DevUserSwitcher";
import { OrganizerRedirect } from "./components/common/OrganizerRedirect";

import { Hero } from "./components/landing/Hero";
import { Featured } from "./components/landing/Featured";
import { Categories } from "./components/landing/Categories";
import { HowItWorks } from "./components/landing/HowItWorks";
import { Organizers } from "./components/landing/Organizers";
import { AppSection } from "./components/landing/AppSection";
import { Trust } from "./components/landing/Trust";
import { PlanPicker } from "./components/landing/PlanPicker";

import AuthPage from "./pages/Auth/AuthPage";
import DiscoverPage from "./pages/Discover/DiscoverPage";
import EventDetailPage from "./pages/EventDetail/EventDetailPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import PaymentPage from "./pages/Checkout/PaymentPage";
import SuccessPage from "./pages/Checkout/SuccessPage";
import MyTicketsPage from "./pages/Account/MyTicketsPage";
import TicketViewPage from "./pages/Account/TicketViewPage";
import SavedPage from "./pages/Account/SavedPage";
import SettingsPage from "./pages/Account/SettingsPage";
import EntryPage from "./pages/Entry/EntryPage";
import HelpPage from "./pages/Info/HelpPage";
import ContactPage from "./pages/Info/ContactPage";
import LegalPage from "./pages/Info/LegalPage";

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
        <PlanPicker />
        <Organizers />
        <AppSection />
        <Trust />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { pathname, hash } = useLocation();
  const t = { theme, toggle: toggleTheme };

  // New page → scroll to top. Link with #section (e.g. /#how) → scroll to that section.
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

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
        <Route path="/account/saved" element={<SavedPage {...t} />} />
        <Route path="/account/settings" element={<SettingsPage {...t} />} />

        {/* Support */}
        <Route path="/help" element={<HelpPage {...t} />} />
        <Route path="/contact" element={<ContactPage {...t} />} />
        <Route path="/terms" element={<LegalPage key="terms" doc="terms" {...t} />} />
        <Route path="/privacy" element={<LegalPage key="privacy" doc="privacy" {...t} />} />

        {/* Gate staff. Its own surface — always dark, no site navigation. */}
        <Route path="/entry" element={<EntryPage />} />

        {/* The organizer portal is a separate app now. Old links forward there. */}
        <Route path="/organizer/*" element={<OrganizerRedirect />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <DevUserSwitcher />
    </>
  );
}