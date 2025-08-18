"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
  onComplete?: () => void
  duration?: number
}

export default function LoadingScreen({ onComplete, duration = 800 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onComplete?.(), 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b1411]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Loader2 className="h-8 w-8 text-emerald-400 mx-auto" />
            </motion.div>
            <motion.p
              className="mt-4 text-sm text-emerald-300/80 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Lu&Na Consulting
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
