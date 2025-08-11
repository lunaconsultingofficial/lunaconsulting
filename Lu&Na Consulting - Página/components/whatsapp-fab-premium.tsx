"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { MessageCircle, X, Phone, User, Building } from "lucide-react"
import { CEO_PHONE_E164, CARS_DEPT_PHONE_E164 } from "@/lib/phones"

const contacts = [
  {
    id: "ceo",
    icon: User,
    label: "CEO Direct Line",
    description: "Private wealth consultation",
    phone: CEO_PHONE_E164,
    color: "emerald"
  },
  {
    id: "cars",
    icon: Building,
    label: "Luxury Assets",
    description: "Vehicle & asset specialists",
    phone: CARS_DEPT_PHONE_E164,
    color: "blue"
  }
]

export default function WhatsAppFABPremium() {
  const [isOpen, setIsOpen] = useState(false)

  const handleContactClick = (phone: string) => {
    const message = encodeURIComponent("Hello, I'm interested in your exclusive private wealth services.")
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 space-y-3"
          >
            {contacts.map((contact, index) => (
              <motion.button
                key={contact.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleContactClick(contact.phone)}
                className="group flex w-80 items-center gap-4 rounded-2xl border border-emerald-500/20 bg-slate-900/95 p-4 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                  <contact.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {contact.label}
                  </div>
                  <div className="text-sm text-slate-400">
                    {contact.description}
                  </div>
                </div>
                <div className="text-emerald-400">
                  <Phone className="h-5 w-5" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-2xl shadow-emerald-500/50 transition-all duration-300 hover:shadow-emerald-500/70"
      >
        {/* Animated Background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/30 to-transparent"
        />
        
        {/* Pulse Effect */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-emerald-500/50"
        />

        {/* Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {isOpen ? (
            <X className="h-7 w-7 text-white" />
          ) : (
            <MessageCircle className="h-7 w-7 text-white" />
          )}
        </motion.div>

        {/* Notification Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.3 }}
          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
        >
          2
        </motion.div>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 1 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 px-3 py-2 text-sm text-white backdrop-blur-sm"
          >
            Private Client Services
            <div className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 translate-x-full border-l-4 border-r-0 border-t-4 border-b-4 border-l-slate-900/95 border-r-transparent border-t-transparent border-b-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
