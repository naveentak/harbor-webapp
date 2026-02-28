import { motion } from 'framer-motion'

const BuiltByCare = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Built by people who care.
        </h2>

        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
          r:labs is a small, independent studio. We read every bug report and feature request personally. When you take the time to write to us, we commit to resolving it as quickly as possible. Your feedback doesn't disappear into a void — it directly shapes what we build next.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="/feedback?type=bug"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium text-sm hover:border-gray-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Report a Bug
          </motion.a>
          <motion.a
            href="/feedback?type=feature"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium text-sm hover:border-gray-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Request a Feature
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}

export default BuiltByCare
