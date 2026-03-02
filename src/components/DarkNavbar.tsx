import { motion, useReducedMotion } from 'framer-motion'

const dmgUrl = import.meta.env.VITE_DMG_DOWNLOAD_URL || '/downloads/Harbor.dmg'

interface DarkNavbarProps {
  scrolled: boolean
}

const DarkNavbar = ({ scrolled }: DarkNavbarProps) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.nav
      initial={shouldReduceMotion ? { opacity: 1 } : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'dark-glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src="/harbor-icon.png" alt="Harbor" className="w-5 h-5 rounded" />
          <span className="text-white/80 text-sm font-semibold">Harbor</span>
        </a>

        <a
          href={dmgUrl}
          download
          className="px-4 py-1.5 rounded-full border border-white/10 text-white/80 text-sm font-medium hover:border-white/20 hover:text-white transition-all"
        >
          Download
        </a>
      </div>
    </motion.nav>
  )
}

export default DarkNavbar
