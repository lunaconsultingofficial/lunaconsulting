"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete?: () => void
  duration?: number
}

export default function LoadingScreen({ onComplete, duration = 2000 }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true)
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  if (isComplete) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Logo or brand */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Lu&Na
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Consulting
          </p>
        </motion.div>

        {/* Loading animation */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {/* Main loading circle */}
          <div className="w-16 h-16 mx-auto relative">
            <motion.div
              className="absolute inset-0 border-4 border-white/20 rounded-full"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-transparent border-t-white rounded-full"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="mt-6 text-gray-400 text-sm tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            Cargando stock exclusivo...
          </motion.p>

          {/* Progress dots */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-white rounded-full"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
