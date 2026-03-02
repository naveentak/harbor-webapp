import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ServerDemo from './ServerDemo'

const dmgUrl = import.meta.env.VITE_DMG_DOWNLOAD_URL || '/downloads/Harbor.dmg'
const expoCurve = [0.16, 1, 0.3, 1] as [number, number, number, number]

const MinimalHero = () => {
  const shouldReduceMotion = useReducedMotion()
  const [showDemo, setShowDemo] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const demoRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLButtonElement>(null)

  // Show "Click to preview" hint after 3s if demo hasn't been opened
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Escape key dismissal
  useEffect(() => {
    if (!showDemo) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowDemo(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showDemo])

  // Click-outside dismissal
  useEffect(() => {
    if (!showDemo) return
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        demoRef.current && !demoRef.current.contains(target) &&
        logoRef.current && !logoRef.current.contains(target)
      ) {
        setShowDemo(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [showDemo])

  const toggleDemo = useCallback(() => {
    setShowDemo(prev => !prev)
    setShowHint(false)
  }, [])

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: expoCurve },
        }

  const fadeOnly = (delay: number) =>
    shouldReduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, delay, ease: expoCurve },
        }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Centered animated logo — hero focal point */}
      <div className="pt-28 pb-8 flex flex-col items-center">
        <motion.div {...fadeUp(0)}>
          <motion.button
            ref={logoRef}
            onClick={toggleDemo}
            aria-label="Toggle server demo preview"
            aria-expanded={showDemo}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-2xl"
          >
            {/* Breathing glow behind logo */}
            <motion.div
              className="absolute inset-0 bg-blue-500/20 blur-[40px] rounded-full -z-10"
              animate={shouldReduceMotion ? {} : {
                opacity: [0.3, 0.6, 0.3],
                scale: [1.2, 1.6, 1.2],
              }}
              transition={shouldReduceMotion ? { duration: 0 } : {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Gentle float */}
            <motion.img
              src="/harbor-icon.png"
              alt="Harbor"
              className="w-16 h-16 rounded-2xl"
              animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
              transition={shouldReduceMotion ? { duration: 0 } : {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.button>
        </motion.div>

        {/* "Click to preview" hint */}
        <AnimatePresence>
          {showHint && !showDemo && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 text-[10px] text-white/30"
            >
              Click to preview
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Left-aligned text content — on navbar grid rail */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-lg">
          {/* App name */}
          <motion.h1
            {...fadeUp(0.15)}
            className="text-5xl font-bold tracking-tight text-white mb-4"
          >
            Harbor
          </motion.h1>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.5)}
            className="text-xl text-white/60 mb-4"
          >
            Your dev servers, under control.
          </motion.p>

          {/* Description */}
          <motion.p
            {...fadeUp(0.65)}
            className="text-base text-white/40 mb-8 leading-relaxed"
          >
            A lightweight macOS menubar utility that auto-detects every local dev server. One click instead of six terminal tabs. Free forever — because devs have enough subscriptions.
          </motion.p>

          {/* Download button */}
          <motion.div {...fadeUp(0.8)}>
            <motion.a
              href={dmgUrl}
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black rounded-full font-semibold text-base hover:bg-gray-100 transition-colors shadow-lg shadow-white/5"
            >
              <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Download for macOS — it's free
            </motion.a>
          </motion.div>

          {/* Version info */}
          <motion.p
            {...fadeOnly(0.95)}
            className="text-xs text-white/20 mt-4"
          >
            v0.1.0 · macOS 14+ · $0 forever
          </motion.p>
        </div>
      </div>

      {/* ServerDemo pop-out — centered below logo */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            ref={demoRef}
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.35, ease: expoCurve }}
            style={{ transformOrigin: 'top center' }}
            className="flex justify-center mt-8 px-6"
          >
            <div className="max-h-[50vh] overflow-y-auto">
              <ServerDemo />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MinimalHero
