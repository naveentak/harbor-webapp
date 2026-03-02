import { motion, useReducedMotion } from 'framer-motion'
import ProductShowcase from './ProductShowcase'

const dmgUrl = import.meta.env.VITE_DMG_DOWNLOAD_URL || '/downloads/Harbor.dmg'
const expoCurve = [0.16, 1, 0.3, 1] as [number, number, number, number]

const MinimalHero = () => {
  const shouldReduceMotion = useReducedMotion()

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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full py-32">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-12">
          {/* Left — Text content */}
          <div className="flex-1 text-center md:text-left">
            {/* App icon */}
            <motion.div {...fadeUp(0.1)} className="mb-6">
              <img
                src="/harbor-icon.png"
                alt="Harbor"
                className="w-16 h-16 rounded-2xl mx-auto md:mx-0"
              />
            </motion.div>

            {/* App name */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-5xl font-bold tracking-tight text-white mb-4"
            >
              Harbor
            </motion.h1>

            {/* Tagline */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-xl text-white/60 mb-4"
            >
              Your dev servers, under control.
            </motion.p>

            {/* Description */}
            <motion.p
              {...fadeUp(0.4)}
              className="text-base text-white/40 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed"
            >
              A lightweight macOS menubar utility that auto-detects every local dev server. One click instead of six terminal tabs.
            </motion.p>

            {/* Download button */}
            <motion.div {...fadeUp(0.5)}>
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
                Download for macOS
              </motion.a>
            </motion.div>

            {/* Version info */}
            <motion.p
              {...fadeOnly(0.6)}
              className="text-xs text-white/20 mt-4"
            >
              v0.1.0 · macOS 14+
            </motion.p>
          </div>

          {/* Right — Product Showcase */}
          <div className="flex-1 w-full max-w-md">
            <ProductShowcase />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MinimalHero
