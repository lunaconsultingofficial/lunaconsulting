"use client"

import { motion } from "framer-motion"
import { type PropsWithChildren } from "react"

export default function AnimatedSection({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
