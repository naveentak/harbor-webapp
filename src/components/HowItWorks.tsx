import { motion } from 'framer-motion'

const steps = [
  {
    step: '1',
    title: 'Start your servers',
    description: 'Just run your dev servers as usual — npm run dev, python manage.py runserver, rails s. Harbor detects them automatically in the background.',
    kbd: null,
  },
  {
    step: '2',
    title: 'Click the menubar',
    description: 'Harbor lives in your macOS menubar showing a server count badge. Click to see all your running servers at a glance.',
    kbd: null,
  },
  {
    step: '3',
    title: 'Stop, restart, or open',
    description: 'One click to open a server in your browser, restart it, or stop it cleanly. View logs, copy ports, and manage everything from one place.',
    kbd: '\u2318 R',
  },
]

const HowItWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <span className="text-blue-600 font-semibold tracking-tight uppercase text-sm mb-4 block">
          How It Works
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Three steps. Zero config.
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Harbor integrates seamlessly into your macOS workflow. No setup needed — just install and go.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {steps.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative"
          >
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-gray-200 to-transparent" />
            )}

            <motion.div
              whileHover={{ scale: 1.08, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="w-24 h-24 mx-auto mb-8 bg-[#F5F5F7] rounded-[2rem] flex items-center justify-center relative"
            >
              <span className="text-4xl font-black text-gray-300">{item.step}</span>
            </motion.div>

            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed max-w-sm mx-auto mb-4">
              {item.description}
            </p>

            {item.kbd && (
              <motion.kbd
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.15 }}
                className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-mono font-bold border border-gray-200"
              >
                {item.kbd}
              </motion.kbd>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks
