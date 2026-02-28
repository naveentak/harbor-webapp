import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-[#FBFBFD] py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-0 max-w-sm"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">arbor</span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-4">
              The dev server control center for macOS. Part of the r:labs suite by r:factory.
            </p>
            <p className="text-gray-400 text-xs mb-6">
              An <a href="https://refactory.co.za" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors underline underline-offset-2">r:factory</a> product
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-12"
          >
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-400">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#hero" className="text-gray-600 hover:text-black transition-colors">Overview</a></li>
                <li><a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a></li>
                <li><a href="#download" className="text-gray-600 hover:text-black transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-400">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="mailto:harbor@refactory.co.za?subject=Bug Report" className="text-gray-600 hover:text-black transition-colors">Report a Bug</a></li>
                <li><a href="mailto:harbor@refactory.co.za?subject=Feature Request" className="text-gray-600 hover:text-black transition-colors">Request a Feature</a></li>
                <li><a href="/privacy" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-400">Supported</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400" /> Next.js</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400" /> Vite</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400" /> Django</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400" /> Rails</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-400" /> +20 more</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} r:factory. All rights reserved. macOS is a trademark of Apple Inc.</p>
          <p className="mt-4 md:mt-0">Designed in South Africa. Built for the world.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
