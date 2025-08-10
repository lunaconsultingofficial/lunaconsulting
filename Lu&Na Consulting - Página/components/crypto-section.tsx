"use client"

import { motion } from "framer-motion"
import { MessageCircle, ArrowUpRight } from 'lucide-react'

export default function CryptoSection() {
  return (
    <section id="crypto" className="relative border-t border-white/10 bg-[#0b1411] py-20 text-white">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl"
        >
          <div className="grid items-start gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Crypto</h2>
              <p className="mt-3 text-white/75">
                Intermediación y soporte en criptoactivos: acceso a contrapartes, cumplimiento básico y coordinación
                operativa con partners especializados.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-white/80">
                <li>Conexión con OTCs y liquidez</li>
                <li>Revisión KYC/KYB inicial</li>
                <li>Coordinación de cierres y documentación</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/34642040091?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20servicio%20de%20Crypto"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-600 px-5 py-2.5 text-sm text-white hover:bg-emerald-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="https://v0-hatimedit-7vgkqk.vercel.app"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white/90 transition hover:bg-white/10"
                >
                  Servicio de Edición
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0e1915] p-6">
              <h3 className="text-lg font-semibold">Alcance</h3>
              <p className="mt-2 text-white/75">
                Nos enfocamos en cerrar operaciones seguras y rápidas. No custodiamos fondos ni gestionamos inversiones.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-[#0b1411] p-4">
                  <div className="text-sm text-white/60">Tiempo de cierre</div>
                  <div className="font-medium">Variable según contraparte</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#0b1411] p-4">
                  <div className="text-sm text-white/60">Canales</div>
                  <div className="font-medium">OTC / Exchange / Custodia</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
