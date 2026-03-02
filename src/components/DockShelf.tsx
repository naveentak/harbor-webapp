import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const expoCurve = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface DockShelfProps {
  onUnlock: () => void
}

const DockShelf = ({ onUnlock }: DockShelfProps) => {
  const prefersReduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), prefersReduced ? 0 : 2000)
    return () => clearTimeout(timer)
  }, [prefersReduced])

  const handleUnlock = useCallback(() => {
    setDismissed(true)
    onUnlock()
    requestAnimationFrame(() => {
      document.getElementById('story')?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
    })
  }, [onUnlock, prefersReduced])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleUnlock()
    }
  }, [handleUnlock])

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: prefersReduced ? 0 : 0.3, ease: expoCurve }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <button
            onClick={handleUnlock}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            aria-label="Explore Harbor — unlock scrolling"
            className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-full"
          >
            <motion.div
              animate={{
                width: hovered ? 240 : 200,
                height: hovered ? 36 : 2,
                y: hovered ? -4 : 0,
              }}
              transition={{
                duration: prefersReduced ? 0 : 0.2,
                ease: expoCurve,
              }}
              className="dock-shelf-glass rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
            >
              <AnimatePresence>
                {hovered && (
                  <motion.span
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReduced ? 0 : 0.15 }}
                    className="text-white/60 text-xs font-medium whitespace-nowrap flex items-center gap-1.5"
                  >
                    Explore Harbor
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DockShelf
