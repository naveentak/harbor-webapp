import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServerDemo from './components/ServerDemo'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import DownloadCTA from './components/DownloadCTA'
import BuiltByCare from './components/BuiltByCare'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import FeedbackForm from './components/FeedbackForm'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (window.location.pathname === '/privacy') {
    return <PrivacyPolicy />
  }

  if (window.location.pathname === '/feedback') {
    return <FeedbackForm />
  }

  return (
    <div className="min-h-screen relative">
      <Navbar scrolled={scrollY > 20} />

      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="demo" className="py-24 glass-showcase-bg overflow-hidden relative">
          {/* Floating animated orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-[15%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-[float-up_8s_ease-in-out_infinite_alternate]" />
            <div className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-purple-500/8 rounded-full blur-[120px] animate-[float-up_10s_ease-in-out_2s_infinite_alternate-reverse]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyan-500/6 rounded-full blur-[110px] animate-[float-up_12s_ease-in-out_4s_infinite_alternate]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-blue-400 font-semibold tracking-tight uppercase text-sm mb-4 block">
                See It In Action
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Your servers, at a glance.
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto">
                Harbor lives in your menubar and auto-discovers every dev server running on your machine. Stop, restart, or open any server in one click.
              </p>
            </div>
            <ServerDemo />
          </div>
        </section>

        <section id="features" className="py-24 bg-[#F5F5F7]">
          <Features />
        </section>

        <section id="how-it-works" className="py-24 bg-white">
          <HowItWorks />
        </section>

        <section id="download" className="py-24 bg-black text-white">
          <DownloadCTA />
        </section>

        <section className="py-24 bg-[#FBFBFD]">
          <BuiltByCare />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
