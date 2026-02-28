import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const serverTypes = ['All', 'JavaScript', 'Python', 'Ruby', 'Go'] as const
type ServerFilter = (typeof serverTypes)[number]

interface ServerItem {
  id: number
  name: string
  type: string
  framework: string
  port: number
  uptime: string
  status: 'running' | 'stopping'
  category: ServerFilter
}

const mockServers: ServerItem[] = [
  { id: 1, name: 'my-saas-app', type: 'Next.js', framework: 'React', port: 3000, uptime: '2h 14m', status: 'running', category: 'JavaScript' },
  { id: 2, name: 'api-gateway', type: 'Express', framework: 'Node.js', port: 4000, uptime: '1h 38m', status: 'running', category: 'JavaScript' },
  { id: 3, name: 'landing-page', type: 'Vite', framework: 'Vue', port: 5173, uptime: '45m', status: 'running', category: 'JavaScript' },
  { id: 4, name: 'docs', type: 'Astro', framework: 'SSG', port: 4321, uptime: '22m', status: 'running', category: 'JavaScript' },
  { id: 5, name: 'ml-service', type: 'FastAPI', framework: 'Python', port: 8000, uptime: '3h 05m', status: 'running', category: 'Python' },
  { id: 6, name: 'admin-panel', type: 'Django', framework: 'Python', port: 8080, uptime: '58m', status: 'running', category: 'Python' },
  { id: 7, name: 'blog', type: 'Rails', framework: 'Ruby', port: 3001, uptime: '1h 12m', status: 'running', category: 'Ruby' },
  { id: 8, name: 'microservice', type: 'Go', framework: 'Gin', port: 9090, uptime: '4h 30m', status: 'running', category: 'Go' },
]

const typeColorMap: Record<string, string> = {
  'Next.js': 'text-blue-400',
  'Express': 'text-gray-400',
  'Vite': 'text-purple-400',
  'Astro': 'text-orange-400',
  'FastAPI': 'text-teal-400',
  'Django': 'text-green-400',
  'Rails': 'text-red-400',
  'Go': 'text-cyan-400',
}

const expoCurve = [0.16, 1, 0.3, 1] as [number, number, number, number]

const ServerDemo = () => {
  const prefersReduced = useReducedMotion()
  const [activeId, setActiveId] = useState(1)
  const [activeTab, setActiveTab] = useState<ServerFilter>('All')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const activeServer = mockServers.find(s => s.id === activeId)!

  const filteredServers = activeTab === 'All'
    ? mockServers
    : mockServers.filter(s => s.category === activeTab)

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const ids = filteredServers.map(s => s.id)
    const currentIndex = ids.indexOf(activeId)
    if (e.key === 'ArrowDown' && currentIndex < ids.length - 1) {
      e.preventDefault()
      setActiveId(ids[currentIndex + 1])
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      e.preventDefault()
      setActiveId(ids[currentIndex - 1])
    }
  }, [filteredServers, activeId])

  const dur = prefersReduced ? 0.01 : undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: dur ?? 0.7, ease: expoCurve }}
      className="max-w-lg mx-auto"
    >
      <div
        className="liquid-glass-dark rounded-2xl overflow-hidden border border-white/10"
        role="listbox"
        aria-label="Dev server list"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <img src="/harbor-icon.png" alt="Harbor" className="w-5 h-5 rounded" />
            <span className="text-white/60 text-sm font-semibold">Harbor</span>
          </div>
          <span className="text-white/25 text-xs">{filteredServers.length} servers</span>
        </div>

        {/* Category tabs with sliding pill */}
        <div className="px-4 pb-2">
          <div className="flex items-center relative">
            {serverTypes.map((tab, i) => (
              <div key={tab} className="flex items-center">
                {i > 0 && <div className="w-px h-4 bg-white/10 mx-0.5" />}
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3 py-1.5 text-xs font-semibold transition-colors duration-150 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="server-tab-pill"
                      className="absolute inset-0 glass-tab-pill"
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                        duration: prefersReduced ? 0.01 : undefined,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Server items list */}
        <div className="divide-y divide-white/[0.03]">
          <AnimatePresence mode="popLayout">
            {filteredServers.map((server, index) => {
              const isActive = activeId === server.id
              const isHovered = hoveredId === server.id

              return (
                <motion.button
                  key={server.id}
                  layout
                  role="option"
                  aria-selected={isActive}
                  initial={prefersReduced ? false : { opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={prefersReduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(4px)', scale: 0.96 }}
                  transition={{
                    duration: dur ?? 0.4,
                    delay: prefersReduced ? 0 : index * 0.06,
                    ease: expoCurve,
                    layout: { type: 'spring', stiffness: 500, damping: 35 },
                  }}
                  onClick={() => setActiveId(server.id)}
                  onMouseEnter={() => setHoveredId(server.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  className={`flex items-center px-4 min-h-[48px] w-full text-left glass-row-hover relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 ${
                    isActive ? 'bg-white/[0.08]' : ''
                  }`}
                >
                  {/* Blue active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="server-active-indicator"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-blue-500"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}

                  {/* Status dot */}
                  <div className="w-6 flex-shrink-0 flex justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 py-3 ml-1">
                    <div className="flex items-center gap-2">
                      <p className="text-white/80 text-sm font-medium truncate">{server.name}</p>
                      <span className={`text-[10px] font-semibold ${typeColorMap[server.type] || 'text-gray-400'}`}>
                        {server.type}
                      </span>
                    </div>
                    <p className="text-white/25 text-xs mt-0.5">
                      :{server.port}&nbsp;&nbsp;{server.uptime}
                    </p>
                  </div>

                  {/* Action buttons — slide in on hover */}
                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <AnimatePresence>
                      {(isHovered || isActive) && (
                        <motion.div
                          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 8 }}
                          transition={{ duration: dur ?? 0.18, ease: expoCurve }}
                          className="flex items-center gap-0.5"
                        >
                          <button
                            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                            aria-label="Open in browser"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </button>
                          <button
                            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                            aria-label="Restart server"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M20.984 4.357v4.992" />
                            </svg>
                          </button>
                          <button
                            className="p-1.5 rounded-md hover:bg-red-500/20 transition-colors"
                            aria-label="Stop server"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-3.5 h-3.5 text-red-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                            </svg>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Detail pane */}
        <div className="border-t border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: dur ?? 0.15 }}
              className="px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${typeColorMap[activeServer.type] || 'text-gray-400'}`}>
                    {activeServer.type}
                  </span>
                  <span className="text-white/15">|</span>
                  <span className="text-white/30 text-xs font-mono">localhost:{activeServer.port}</span>
                </div>
                <span className="text-white/20 text-xs">
                  Uptime: {activeServer.uptime}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default ServerDemo
