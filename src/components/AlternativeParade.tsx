import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/* Mock server items for the Harbor panel */
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

// Phase timings in ms
const PHASE_TIMINGS = [700, 2800, 2800, 2800, 2800, 600]

const cardEnter = {
  initial: { x: 300, opacity: 0, rotateY: -15 },
  animate: { x: 0, opacity: 1, rotateY: 0 },
  exit: { x: -100, opacity: 0, scale: 0.92 },
}

const cardTransition = {
  enter: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
}

const implodeStartPositions = [
  { x: -180, y: -120, rotate: -12 },
  { x: 160, y: -100, rotate: 8 },
  { x: -150, y: 100, rotate: 15 },
  { x: 170, y: 110, rotate: -10 },
]

/* -- Alternative approaches cards -- */

function TerminalTabs() {
  return (
    <div className="rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-700 text-white w-full shadow-lg">
      <div className="flex items-center px-3 py-2 bg-[#2d2d2d] border-b border-gray-700 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex gap-0.5 flex-1 overflow-hidden ml-2">
          {['next dev', 'express', 'vite', 'flask', 'astro', '+'].map((tab, i) => (
            <div
              key={tab}
              className={`px-2 py-0.5 text-[9px] rounded-t ${
                i === 0 ? 'bg-[#1e1e1e] text-white' : 'bg-[#252525] text-gray-500'
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 font-mono text-[10px] leading-relaxed text-gray-400 min-h-[180px]">
        <p className="text-green-400">$ npm run dev</p>
        <p className="text-gray-500 mt-1">ready - started server on 0.0.0.0:3000</p>
        <p className="text-gray-500">event - compiled in 847ms</p>
        <p className="text-yellow-500 mt-2">warn - You have enabled experimental features</p>
        <p className="text-gray-500">event - compiled /_error in 123ms</p>
        <p className="text-gray-600 mt-2">// ...which tab was the API server in again?</p>
        <p className="text-red-400 mt-1">// wait, did I already stop that one?</p>
      </div>
    </div>
  )
}

function ActivityMonitor() {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-200 text-gray-700 w-full shadow-lg">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-200">
        <span className="text-xs font-semibold text-gray-600">Activity Monitor</span>
        <span className="text-[10px] text-gray-400">CPU | Memory | Energy | Disk | Network</span>
      </div>
      <div className="text-[10px]">
        <div className="grid grid-cols-4 gap-0 px-3 py-1.5 bg-gray-50 border-b border-gray-200 font-semibold text-gray-500">
          <span>Process</span><span>PID</span><span>CPU</span><span>Memory</span>
        </div>
        {[
          ['node', '41823', '4.2%', '198 MB'],
          ['node', '41901', '2.8%', '156 MB'],
          ['python3', '42100', '1.1%', '89 MB'],
          ['node', '42205', '0.9%', '142 MB'],
          ['ruby', '42310', '0.5%', '112 MB'],
          ['node', '42415', '3.1%', '201 MB'],
        ].map(([name, pid, cpu, mem], i) => (
          <div key={i} className="grid grid-cols-4 gap-0 px-3 py-1 border-b border-gray-100 text-gray-500">
            <span>{name}</span><span>{pid}</span><span>{cpu}</span><span>{mem}</span>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
        <p className="text-[9px] text-gray-400 text-center">Which node process is which server? Good luck.</p>
      </div>
    </div>
  )
}

function DockerDesktop() {
  return (
    <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-blue-500/30 text-white w-full shadow-lg">
      <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-white/10">
        <span className="text-xs font-semibold text-white/70">Docker Desktop</span>
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full">v4.28</span>
        </div>
      </div>
      <div className="p-3 min-h-[180px]">
        <div className="mb-2 px-2 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] text-amber-400 font-medium">
          Using 3.2 GB RAM for containers
        </div>
        {['api-container', 'db-postgres', 'redis-cache', 'nginx-proxy'].map((c, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5 border-b border-white/5">
            <div className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-green-400' : 'bg-gray-500'}`} />
            <span className="text-[11px] text-white/60">{c}</span>
            <span className="text-[9px] text-white/20 ml-auto">{i < 3 ? 'Running' : 'Exited'}</span>
          </div>
        ))}
        <p className="text-[9px] text-white/20 text-center mt-3">Overkill for local dev servers</p>
      </div>
    </div>
  )
}

function LsofTerminal() {
  return (
    <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-300 text-gray-600 w-full shadow-lg brightness-75 saturate-50">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-200 border-b border-gray-300">
        <span className="text-xs font-medium text-gray-500">Terminal</span>
        <span className="text-[10px] font-bold text-gray-500 bg-gray-300 px-2 py-0.5 rounded-full">Manual</span>
      </div>
      <div className="p-3 font-mono text-[10px] text-gray-500 min-h-[180px]">
        <p className="text-gray-700">$ lsof -iTCP -sTCP:LISTEN -P</p>
        <p className="text-gray-400 mt-1">node    41823 dev   23u IPv4 TCP *:3000</p>
        <p className="text-gray-400">node    41901 dev   24u IPv4 TCP *:4000</p>
        <p className="text-gray-400">python3 42100 dev   5u  IPv4 TCP *:8000</p>
        <p className="text-gray-400">node    42205 dev   22u IPv4 TCP *:5173</p>
        <p className="text-gray-500 mt-3">$ kill -9 41823</p>
        <p className="text-red-400 mt-1">// hope that was the right PID...</p>
      </div>
      <div className="px-3 py-2 border-t border-gray-300 bg-gray-200">
        <p className="text-[9px] text-gray-400 text-center">The power-user way. Also the slow way.</p>
      </div>
    </div>
  )
}

/* -- Harbor Panel -- */

function HarborPanel() {
  return (
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
              item.num === 1 ? 'bg-white/[0.08]' : 'hover:bg-white/[0.03]'
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
        <button className="text-white/30 text-[10px] hover:text-white/50 transition-colors">
          Preferences
        </button>
      </div>
    </div>
  )
}

/* -- Competitor Thumbnails for Implode Phase -- */

const altNames = ['Terminal Tabs', 'Activity Monitor', 'Docker Desktop', 'lsof + kill']
const altColors = ['bg-[#2d2d2d] border-gray-700', 'bg-white border-gray-200', 'bg-[#0d1117] border-blue-500/30', 'bg-gray-200 border-gray-300']
const altTextColors = ['text-gray-300', 'text-gray-500', 'text-blue-300', 'text-gray-500']

/* -- Main Component -- */

const AlternativeParade = () => {
  const shouldReduceMotion = useReducedMotion()
  const [phase, setPhase] = useState(shouldReduceMotion ? 6 : 0)

  useEffect(() => {
    if (shouldReduceMotion) return

    let timeout: ReturnType<typeof setTimeout>
    let currentPhase = 0

    const advance = () => {
      if (currentPhase >= PHASE_TIMINGS.length) return
      timeout = setTimeout(() => {
        currentPhase++
        setPhase(currentPhase)
        if (currentPhase < PHASE_TIMINGS.length) {
          advance()
        }
      }, PHASE_TIMINGS[currentPhase])
    }

    advance()
    return () => clearTimeout(timeout)
  }, [shouldReduceMotion])

  const altCards = [TerminalTabs, ActivityMonitor, DockerDesktop, LsofTerminal]

  return (
    <div className="mt-20 relative w-full max-w-lg mx-auto h-[520px]" style={{ perspective: '1200px' }}>
      {/* Wrapper 1: Alternative cards (phases 1-4) */}
      <AnimatePresence mode="wait">
        {phase >= 1 && phase <= 4 && (() => {
          const Card = altCards[phase - 1]
          return (
            <motion.div
              key={`alt-${phase}`}
              initial={cardEnter.initial}
              animate={cardEnter.animate}
              exit={cardEnter.exit}
              transition={cardTransition.enter}
              className="absolute inset-x-0 top-0 z-10 p-4"
            >
              <Card />
            </motion.div>
          )
        })()}
      </AnimatePresence>

      {/* Wrapper 2: Implode phase (5) */}
      <AnimatePresence>
        {phase === 5 && (
          <motion.div
            key="implode"
            className="absolute inset-0 z-10 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {altNames.map((name, i) => (
              <motion.div
                key={name}
                initial={{
                  x: implodeStartPositions[i].x,
                  y: implodeStartPositions[i].y,
                  scale: 0.5,
                  opacity: 0.8,
                  rotate: implodeStartPositions[i].rotate,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0,
                  rotate: 0,
                }}
                transition={{ duration: 0.55, ease: [0.55, 0, 1, 0.45] }}
                className={`absolute w-32 h-20 rounded-lg border ${altColors[i]} flex items-center justify-center`}
              >
                <span className={`text-[8px] font-bold ${altTextColors[i]}`}>{name}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wrapper 3: Harbor reveal (phase 6) */}
      <AnimatePresence>
        {phase >= 6 && (
          <motion.div
            key="harbor"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.1 }}
            className="absolute inset-x-0 top-0 z-10"
          >
            {/* Bloom light pulse */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full -z-5 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, rgba(96, 165, 250, 0) 70%)' }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.5, 2.0],
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  times: [0, 0.3, 1],
                  ease: 'easeOut',
                }}
              />
            )}

            {/* Harbor panel with two-stage reveal */}
            <motion.div
              initial={shouldReduceMotion
                ? { scale: 1, filter: 'blur(0px)', y: 0 }
                : { scale: 0.85, filter: 'blur(12px)', y: 10 }
              }
              animate={{
                scale: shouldReduceMotion ? 1 : [0.85, 1.04, 1.0],
                filter: shouldReduceMotion ? 'blur(0px)' : ['blur(12px)', 'blur(1px)', 'blur(0px)'],
                y: shouldReduceMotion ? 0 : [10, -2, 0],
              }}
              transition={shouldReduceMotion ? { duration: 0 } : {
                duration: 0.9,
                delay: 0.15,
                times: [0, 0.6, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <HarborPanel />
            </motion.div>

            {/* Background glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/30 blur-[100px] rounded-full -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : {
                duration: 1.2,
                delay: 0.3,
                ease: 'easeOut',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AlternativeParade
