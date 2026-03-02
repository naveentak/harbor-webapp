import { motion, useReducedMotion } from 'framer-motion'

const LearnMoreDivider = () => {
  const shouldReduceMotion = useReducedMotion()

  const handleClick = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-[#111111] py-16">
      <button
        onClick={handleClick}
        className="flex flex-col items-center gap-3 mx-auto group cursor-pointer"
        aria-label="Scroll to learn more"
      >
        <span className="text-sm text-white/20 group-hover:text-white/40 transition-colors">
          Learn more
        </span>
        <motion.svg
          className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </motion.svg>
      </button>
    </div>
  )
}

export default LearnMoreDivider
