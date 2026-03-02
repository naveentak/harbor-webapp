import { motion } from 'framer-motion'

const dmgUrl = import.meta.env.VITE_DMG_DOWNLOAD_URL || '/downloads/Harbor.dmg'

const DownloadCTA = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, rotate: -8 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-8 bg-white/10 rounded-[1.5rem] flex items-center justify-center border border-white/10"
        >
          <img src="/harbor-icon.png" alt="Harbor" className="w-12 h-12 rounded-xl" />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Totally, completely,
          <br />
          <span className="text-green-400">ridiculously free.</span>
        </h2>

        <p className="text-gray-400 text-lg mb-6 max-w-xl mx-auto leading-relaxed">
          Not free-with-an-asterisk. Not free-for-14-days. Not "free" but you need to enter a credit card.
          Just free. Like, download-it-and-it-works free. We built this because we needed it — and you probably do too.
        </p>
      </motion.div>

      {/* Pricing card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md mx-auto relative"
      >
        {/* Glow ring */}
        <div className="absolute -inset-1 bg-gradient-to-b from-green-500/20 via-transparent to-green-500/10 rounded-[2.5rem] blur-sm" />

        <div className="relative bg-[#1C1C1E] rounded-[2rem] border border-white/10 p-10 text-center overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-green-600/8 blur-[80px] rounded-full" />

          <div className="relative">
            <p className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-6">The Entire App</p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
              className="mb-2"
            >
              <span className="text-7xl font-black text-white tracking-tight">$0</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-white/30 text-sm mb-8"
            >
              Not $0/month. Not $0 for the first year. Just $0. Forever.
            </motion.p>

            {/* Perks */}
            <div className="space-y-3 mb-10 text-left max-w-xs mx-auto">
              {[
                'Auto-detects 25+ server types',
                'Stop, restart, open in one click',
                'Real-time logs for every server',
                'All future updates included',
                '100% local — no accounts, no cloud',
                'No telemetry, no tracking, no nonsense',
              ].map((perk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
                  className="flex items-start space-x-3"
                >
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/60 text-sm">{perk}</span>
                </motion.div>
              ))}
            </div>

            {/* Download CTA */}
            <motion.a
              href={dmgUrl}
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center w-full px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg shadow-white/10"
            >
              <svg className="w-5 h-5 mr-2.5" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Download for macOS — free forever
            </motion.a>

            <p className="text-white/20 text-xs mt-4">Requires macOS 14 Sonoma or later</p>
          </div>
        </div>
      </motion.div>

      {/* Trust signals */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-16 text-sm text-gray-500"
      >
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Apple Silicon Native</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>No Account Required</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Built With Love</span>
        </div>
      </motion.div>
    </div>
  )
}

export default DownloadCTA
