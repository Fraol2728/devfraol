import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8">
      <motion.div
        className="relative w-24 h-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="absolute inset-0 rounded-full border-4 border-white/20" />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-white"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-white/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      <motion.div
        className="space-y-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-2xl font-bold text-white"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Loading...
        </motion.div>
        <motion.div className="text-sm text-white/50">
          Please wait while we set things up
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Loading
