import { motion } from 'framer-motion'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-6 py-16"
      >
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: February 28, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-600">
              Harbor is a dev server management utility for macOS developed by r:labs studio (Refactory Consulting Services Pty Ltd).
              We are committed to protecting your privacy. This policy explains how Harbor handles your data.
            </p>
            <p className="text-gray-600 mt-3 font-medium">
              The short version: Harbor runs entirely on your Mac. We collect no data, track nothing,
              and send nothing to any server.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Collection</h2>
            <p className="text-gray-600">
              Harbor collects <strong>no personal data</strong>. Specifically:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-3">
              <li>No analytics or telemetry</li>
              <li>No crash reporting to external services</li>
              <li>No advertising identifiers (IDFA)</li>
              <li>No user accounts or registration</li>
              <li>No network requests of any kind (the app has no backend)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Local Operation</h2>
            <p className="text-gray-600">
              Harbor operates entirely on your local machine:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-3">
              <li>Server detection uses local system commands (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">lsof</code> and <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">ps</code>) to identify running processes.</li>
              <li>No data about your servers, projects, or processes leaves your device.</li>
              <li>Process management (stop/restart) uses standard POSIX signals.</li>
              <li>Log output is stored in memory only and cleared when the app quits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Permissions</h2>
            <p className="text-gray-600">
              Harbor requires the following system access to function:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-3">
              <li><strong>Process inspection</strong> — to discover running dev servers via port scanning.</li>
              <li><strong>Process management</strong> — to stop and restart servers when requested by you.</li>
            </ul>
            <p className="text-gray-600 mt-3">
              No access to contacts, calendars, camera, microphone, location, or any other system resources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
            <p className="text-gray-600">
              Harbor uses <strong>no third-party SDKs, frameworks, or services</strong>. The app is built entirely
              with Apple's native frameworks (SwiftUI, Foundation). There are no analytics providers,
              ad networks, or external dependencies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Children's Privacy</h2>
            <p className="text-gray-600">
              Harbor does not collect any data from any users, including children. The app is suitable for all ages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
            <p className="text-gray-600">
              If we make changes to this privacy policy, we will update this page and the "Last updated" date above.
              Since Harbor collects no data, we do not anticipate material changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-gray-600">
              If you have questions about this privacy policy, contact us at:
            </p>
            <p className="text-gray-600 mt-2">
              <a href="mailto:harbor@refactory.co.za" className="text-black underline underline-offset-2 hover:text-blue-600 transition-colors">harbor@refactory.co.za</a>
            </p>
          </section>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} r:factory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default PrivacyPolicy
