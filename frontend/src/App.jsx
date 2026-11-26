import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import useRouteTitle from "./hooks/useRouteTitle";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SkipLink } from "./components/common/SkipLink";
import { DevUserSwitcher } from "./components/common/DevUserSwitcher";
import { OrganizerRedirect } from "./components/common/OrganizerRedirect";

// The landing page loads straight away…
import { Hero } from "./components/landing/Hero";
import { Featured } from "./components/landing/Featured";
import { Categories } from "./components/landing/Categories";
import { HowItWorks } from "./components/landing/HowItWorks";
import { PlanPicker } from "./components/landing/PlanPicker";
import { Organizers } from "./components/landing/Organizers";
import { AppSection } from "./components/landing/AppSection";
import { Trust } from "./components/landing/Trust";

// …every other page downloads only when someone opens it.
const AuthPage = lazy(() => import("./pages/Auth/AuthPage"));
const DiscoverPage = lazy(() => import("./pages/Discover/DiscoverPage"));
const EventDetailPage = lazy(() => import("./pages/EventDetail/EventDetailPage"));
const CheckoutPage = lazy(() => import("./pages/Checkout/CheckoutPage"));
const PaymentPage = lazy(() => import("./pages/Checkout/PaymentPage"));
const SuccessPage = lazy(() => import("./pages/Checkout/SuccessPage"));
const MyTicketsPage = lazy(() => import("./pages/Account/MyTicketsPage"));
const TicketViewPage = lazy(() => import("./pages/Account/TicketViewPage"));
const SavedPage = lazy(() => import("./pages/Account/SavedPage"));
const SettingsPage = lazy(() => import("./pages/Account/SettingsPage"));
const EntryPage = lazy(() => import("./pages/Entry/EntryPage"));
const HelpPage = lazy(() => import("./pages/Info/HelpPage"));
const ContactPage = lazy(() => import("./pages/Info/ContactPage"));
const LegalPage = lazy(() => import("./pages/Info/LegalPage"));
const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));

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

/** Shown for a moment while a page's code downloads. */
function PageLoading() {
  return (
    <div role="status" className="grid min-h-[70vh] place-items-center">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-navy/15 border-t-navy dark:border-white/15 dark:border-t-white" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { pathname, hash } = useLocation();
  const t = { theme, toggle: toggleTheme };

  useRouteTitle();

  // New page → scroll to top. Link with #section (e.g. /#how) → scroll to that section.
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return (
    <>
      <Suspense fallback={<PageLoading />}>
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

          <Route path="*" element={<NotFoundPage {...t} />} />
        </Routes>
      </Suspense>
      <DevUserSwitcher />
    </>
  );
}