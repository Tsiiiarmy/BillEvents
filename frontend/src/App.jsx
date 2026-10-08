import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import useTheme from "./hooks/useTheme";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SkipLink } from "./components/common/SkipLink";

import { Hero } from "./components/landing/Hero";
import { Featured } from "./components/landing/Featured";
import { Categories } from "./components/landing/Categories";
import { HowItWorks } from "./components/landing/HowItWorks";
import { Organizers } from "./components/landing/Organizers";
import { AppSection } from "./components/landing/AppSection";
import { Trust } from "./components/landing/Trust";

import AuthPage from "./pages/Auth/AuthPage";
import DiscoverPage from "./pages/Discover/DiscoverPage";
import EventDetailPage from "./pages/EventDetail/EventDetailPage";

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
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { pathname, hash } = useLocation();

  // New page → scroll to top. Link with #section (e.g. /#how) → scroll to that section.
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Landing theme={theme} toggle={toggleTheme} />}
      />
      <Route
        path="/events"
        element={<DiscoverPage theme={theme} toggle={toggleTheme} />}
      />
      <Route
        path="/events/:id"
        element={<EventDetailPage theme={theme} toggle={toggleTheme} />}
      />
      <Route
        path="/signin"
        element={
          <AuthPage
            key="signin"
            mode="signin"
            theme={theme}
            toggle={toggleTheme}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <AuthPage
            key="signup"
            mode="signup"
            theme={theme}
            toggle={toggleTheme}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
