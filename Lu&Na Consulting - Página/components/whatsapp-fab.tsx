"use client"

import { MessageCircle } from 'lucide-react'
import { motion } from "framer-motion"
import { CEO_PHONE_E164 } from "@/lib/phones"

export default function WhatsAppFAB() {
  return (
    <motion.a
      href={`https://wa.me/${CEO_PHONE_E164}`}
      target="_blank"
      className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-600/30 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.45)] backdrop-blur transition hover:bg-emerald-600/40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Abrir WhatsApp (CEO)"
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  )
}
