import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import DarkNavbar from './components/DarkNavbar'
import MinimalHero from './components/MinimalHero'
import DockShelf from './components/DockShelf'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import DownloadCTA from './components/DownloadCTA'
import BuiltByCare from './components/BuiltByCare'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import FeedbackForm from './components/FeedbackForm'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollLocked, setScrollLocked] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleUnlock = useCallback(() => {
    setScrollLocked(false)
  }, [])

  if (window.location.pathname === '/privacy') {
    return (
      <>
        <Navbar scrolled={scrollY > 20} />
        <PrivacyPolicy />
      </>
    )
  }

  if (window.location.pathname === '/feedback') {
    return (
      <>
        <Navbar scrolled={scrollY > 20} />
        <FeedbackForm />
      </>
    )
  }

  return (
    <div className={`min-h-screen relative bg-[#0a0a0a] ${scrollLocked ? 'h-screen overflow-hidden' : ''}`}>
      <DarkNavbar scrolled={scrollY > 20} />

      <main>
        <section id="hero">
          <MinimalHero />
        </section>

        {scrollLocked && <DockShelf onUnlock={handleUnlock} />}

        <section id="story">
          <section id="features" className="py-24 bg-[#111111]">
            <Features />
          </section>

          <section id="how-it-works" className="py-24 bg-[#0d0d0d]">
            <HowItWorks />
          </section>

          <section id="download" className="py-24 bg-black text-white">
            <DownloadCTA />
          </section>

          <section className="py-24 bg-[#0a0a0a]">
            <BuiltByCare />
          </section>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
