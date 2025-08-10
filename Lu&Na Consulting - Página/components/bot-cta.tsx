"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MessageCircle } from 'lucide-react'

export default function BotCTA() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="container px-6 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto mb-10 aspect-square w-[min(80vw,420px)]"
          >
            {/* Núcleo del “bot” */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 via-emerald-400/20 to-emerald-500/10 blur-2xl" />
            <motion.div
              className="absolute inset-[14%] rounded-full bg-[#0f1a16] shadow-[0_0_40px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400/30"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(16,185,129,.35)",
                  "0 0 60px rgba(16,185,129,.55)",
                  "0 0 40px rgba(16,185,129,.35)",
                ],
              }}
              transition={{ duration: 3.2, repeat: Infinity }}
            />
            {/* “Gotas de agua” */}
            {[...Array(7)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/25 blur-[2px]"
                style={{ filter: "drop-shadow(0 0 12px rgba(16,185,129,.6))" }}
                animate={{
                  x: [0, Math.cos(i) * 120, 0],
                  y: [0, Math.sin(i) * 120, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.6, 1.2, 0.6],
                }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
              />
            ))}
            {/* Carita/ícono */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 p-6 ring-1 ring-emerald-400/30"
              initial={{ scale: 0.9 }}
              animate={{ scale: [0.95, 1.02, 0.95] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <MessageCircle className="h-16 w-16 text-emerald-300" />
            </motion.div>
          </motion.div>

          <h2 className="text-3xl font-bold md:text-4xl">Habla con nuestro bot</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Cuéntanos qué necesitas comprar o vender. Te guiamos y conectamos con la contraparte adecuada.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.25)_inset] transition hover:bg-emerald-500/15 hover:text-emerald-100"
            >
              <span className="relative z-10">Iniciar conversación</span>
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-emerald-400/30" />
              <span className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/20 opacity-0 transition-all duration-500 group-active:h-[220%] group-active:w-[220%] group-active:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
