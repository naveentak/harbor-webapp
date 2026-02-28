import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type FeedbackType = 'bug' | 'feature'
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface TokenParams {
  did: string
  ts: string
  sig: string
  app: string
  type: FeedbackType
  v: string
  os: string
}

function parseTokenParams(): TokenParams | null {
  const params = new URLSearchParams(window.location.search)
  const did = params.get('did')
  const ts = params.get('ts')
  const sig = params.get('sig')
  const app = params.get('app')
  const type = params.get('type')
  const v = params.get('v')
  const os = params.get('os')

  if (!did || !ts || !sig || !app || !type) return null
  if (type !== 'bug' && type !== 'feature') return null

  return { did, ts, sig, app, type, v: v || 'unknown', os: os || 'unknown' }
}

const FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL

const FeedbackForm = () => {
  const [token, setToken] = useState<TokenParams | null>(null)
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('bug')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const parsed = parseTokenParams()
    setToken(parsed)
    if (parsed) setFeedbackType(parsed.type)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId: token.did,
          timestamp: token.ts,
          signature: token.sig,
          appId: token.app,
          type: feedbackType,
          title,
          description,
          email: email || undefined,
          appVersion: token.v,
          osVersion: token.os,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  // No valid token — show friendly message
  if (!token) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto px-6 py-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Submit Feedback from the App</h1>
          <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
            To submit feedback, use the <strong>"Report a Bug"</strong> or <strong>"Request a Feature"</strong> button
            inside the Harbor app's Preferences.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </a>
        </motion.main>
        <PageFooter />
      </div>
    )
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto px-6 py-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6"
          >
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">We're on it.</h1>
          <p className="text-gray-500 text-lg mb-3 max-w-lg mx-auto">
            Your {feedbackType === 'bug' ? 'bug report' : 'feature request'} has been received.
          </p>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            The r:labs team reviews every submission personally. We're committed to getting back to you
            and shipping a resolution as fast as we can. Thank you for helping make Harbor better.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </a>
        </motion.main>
        <PageFooter />
      </div>
    )
  }

  // Form
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-6 py-16"
      >
        <h1 className="text-4xl font-bold mb-2">
          {feedbackType === 'bug' ? 'Report a Bug' : 'Request a Feature'}
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          Your voice shapes Harbor. Every report is read by our team — we're building this together.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          {/* Type toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFeedbackType('bug')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  feedbackType === 'bug'
                    ? 'bg-red-50 text-red-700 ring-1 ring-red-200'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                Bug Report
              </button>
              <button
                type="button"
                onClick={() => setFeedbackType('feature')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  feedbackType === 'feature'
                    ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                Feature Request
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={feedbackType === 'bug' ? 'e.g. Server not detected after restart' : 'e.g. Add log filtering by severity'}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[15px] transition-all duration-200 outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 placeholder:text-gray-300"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                feedbackType === 'bug'
                  ? 'What happened? What did you expect to happen? Steps to reproduce...'
                  : 'Describe the feature you\'d like and how it would help your workflow...'
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[15px] transition-all duration-200 outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 placeholder:text-gray-300 resize-y"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-gray-300 font-normal">(optional, for follow-up)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[15px] transition-all duration-200 outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 placeholder:text-gray-300"
            />
          </div>

          {/* App info badges */}
          <div className="flex gap-3 flex-wrap">
            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-50 text-xs text-gray-500 font-mono">
              Harbor v{token.v}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-50 text-xs text-gray-500 font-mono">
              {token.os}
            </span>
          </div>

          {/* Error message */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-red-50 text-red-700 text-sm"
            >
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </>
            ) : (
              `Submit ${feedbackType === 'bug' ? 'Bug Report' : 'Feature Request'}`
            )}
          </button>
        </form>

        {/* Community commitment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 max-w-2xl border-t border-gray-100 pt-10"
        >
          <div className="flex items-start gap-4">
            <img src="/harbor-icon.png" alt="Harbor" className="w-10 h-10 rounded-xl flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Built by people who care</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                r:labs is a small, independent studio. We read every bug report and feature request personally.
                When you take the time to write to us, we commit to resolving it as quickly as possible.
                Your feedback doesn't disappear into a void — it directly shapes what we build next.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24h</div>
              <div className="text-xs text-gray-400 mt-1">Typical first response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-xs text-gray-400 mt-1">Reports reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">You</div>
              <div className="text-xs text-gray-400 mt-1">Shape the roadmap</div>
            </div>
          </div>
        </motion.div>
      </motion.main>
      <PageFooter />
    </div>
  )
}

const Header = () => (
  <header className="border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
    <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="/" className="flex items-center space-x-2">
        <img src="/harbor-icon.png" alt="Harbor" className="w-8 h-8 rounded-lg" />
        <span className="text-lg font-bold tracking-tight">Harbor</span>
      </a>
      <a href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
        &larr; Back to Home
      </a>
    </div>
  </header>
)

const PageFooter = () => (
  <footer className="border-t border-gray-100 py-8">
    <div className="max-w-4xl mx-auto px-6 text-center text-xs text-gray-400">
      <p>&copy; {new Date().getFullYear()} r:factory. All rights reserved.</p>
    </div>
  </footer>
)

export default FeedbackForm
