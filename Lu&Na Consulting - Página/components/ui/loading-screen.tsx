"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
  onComplete?: () => void
  duration?: number
}

export default function LoadingScreen({ onComplete, duration = 1200 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onComplete?.(), 400)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(16, 185, 129, 0.2) 0%,
                rgba(59, 130, 246, 0.2) 25%,
                rgba(168, 85, 247, 0.2) 50%,
                rgba(236, 72, 153, 0.2) 75%,
                rgba(251, 146, 60, 0.2) 100%
              ),
              #0a0f1c
            `
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Floating glass orbs */}
          <motion.div
            className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute right-1/4 bottom-1/4 h-24 w-24 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
            animate={{
              y: [0, 15, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Main content */}
          <motion.div
            className="text-center p-8 rounded-3xl"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 24px 96px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="mb-6"
            >
              <div
                className="h-12 w-12 mx-auto rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(59, 130, 246, 0.8))",
                  boxShadow: "0 8px 32px rgba(16, 185, 129, 0.4)"
                }}
              >
                <Loader2 className="h-6 w-6 text-white" />
              </div>
            </motion.div>

            <motion.h2
              className="text-2xl font-bold mb-2"
              style={{
                background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: "0 0 20px rgba(16,185,129,.4)"
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Lu&Na Consulting
            </motion.h2>

            <motion.p
              className="text-sm text-white/70 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Cargando experiencia premium...
            </motion.p>

            {/* Loading progress dots */}
            <div className="flex justify-center items-center mt-6 space-x-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #3b82f6)"
                  }}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
