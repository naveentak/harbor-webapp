import { motion, useReducedMotion } from 'framer-motion'

const panelItems = [
  { num: 1, name: 'my-app', type: 'Next.js', port: 3000, time: '2h 14m', status: 'running' },
  { num: 2, name: 'api-service', type: 'Express', port: 4000, time: '1h 38m', status: 'running' },
  { num: 3, name: 'dashboard', type: 'Vite', port: 5173, time: '45m', status: 'running' },
  { num: 4, name: 'docs-site', type: 'Astro', port: 4321, time: '22m', status: 'running' },
  { num: 5, name: 'mobile-api', type: 'FastAPI', port: 8000, time: '3h 05m', status: 'running' },
]

const typeColors: Record<string, string> = {
  'Next.js': 'text-blue-400',
  'Express': 'text-gray-400',
  'Vite': 'text-purple-400',
  'Astro': 'text-orange-400',
  'FastAPI': 'text-teal-400',
}

const expoCurve = [0.16, 1, 0.3, 1] as [number, number, number, number]

const ProductShowcase = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4, ease: expoCurve }}
      className="relative"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[80px] rounded-full -z-10"
        animate={shouldReduceMotion ? {} : { opacity: [0.3, 0.6, 0.3] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Harbor Panel */}
      <div className="relative z-10 rounded-2xl overflow-hidden liquid-glass-dark border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <img src="/harbor-icon.png" alt="Harbor" className="w-5 h-5 rounded" />
            <span className="text-white/60 text-sm font-semibold">Harbor</span>
          </div>
          <span className="text-white/25 text-xs">{panelItems.length} servers</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Server items list */}
        <div className="divide-y divide-white/[0.03]">
          {panelItems.map((item) => (
            <div
              key={item.num}
              className={`flex items-center px-4 py-3 ${
                item.num === 1 ? 'bg-white/[0.08]' : ''
              }`}
            >
              {/* Status dot */}
              <div className="w-6 flex-shrink-0 flex justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-[status-pulse_2s_ease-in-out_infinite]" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 ml-2">
                <div className="flex items-center gap-2">
                  <p className="text-white/80 text-sm font-medium truncate">{item.name}</p>
                  <span className={`text-[10px] font-semibold ${typeColors[item.type] || 'text-gray-400'}`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-white/25 text-xs mt-0.5">
                  :{item.port}&nbsp;&nbsp;{item.time}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                <button className="p-1.5 rounded-md hover:bg-white/10 transition-colors" aria-label="Open in browser">
                  <svg className="w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </button>
                <button className="p-1.5 rounded-md hover:bg-white/10 transition-colors" aria-label="Stop server">
                  <svg className="w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 px-4 py-2.5 flex items-center justify-between">
          <span className="text-white/20 text-[10px]">Auto-scanning every 4s</span>
          <span className="text-white/30 text-[10px]">Preferences</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductShowcase
