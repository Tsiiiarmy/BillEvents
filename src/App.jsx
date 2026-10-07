import useTheme from './hooks/useTheme'
import { Navbar, Hero, Featured, Categories, HowItWorks, Organizers, AppSection, Trust, Footer } from './sections'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded bg-aqua px-4 py-2 font-bold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Navbar theme={theme} toggle={toggleTheme} />
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