import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import useTheme from './hooks/useTheme'
import { Navbar, Hero, Featured, Categories, HowItWorks, Organizers, AppSection, Trust, Footer } from './sections'
import AuthPage from './AuthPage'

function Landing({ theme, toggle }) {
  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded bg-aqua px-4 py-2 font-bold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
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
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname]) // start each page at the top

  return (
    <Routes>
      <Route path="/" element={<Landing theme={theme} toggle={toggleTheme} />} />
      <Route path="/signin" element={<AuthPage key="signin" mode="signin" theme={theme} toggle={toggleTheme} />} />
      <Route path="/signup" element={<AuthPage key="signup" mode="signup" theme={theme} toggle={toggleTheme} />} />
    </Routes>
  )
}