"use client"

import { motion } from "framer-motion"
import { MessageCircle, ArrowUpRight } from 'lucide-react'

export default function TradingSection() {
  return (
    <section id="trading" className="relative border-t border-white/10 bg-[#0e1915] py-20 text-white">
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
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Trading</h2>
              <p className="mt-3 text-white/75">
                Soporte en estrategias, gestión del riesgo y ejecución. Te conectamos con los perfiles adecuados para
                acelerar tu operativa y validar decisiones clave.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-white/80">
                <li>Revisión de estrategia y plan de riesgo</li>
                <li>Optimización de ejecución y herramientas</li>
                <li>Conexión con partners y mesas</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/34642040091?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20servicio%20de%20Trading"
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

            <div className="rounded-2xl border border-white/10 bg-[#0b1411] p-6">
              <h3 className="text-lg font-semibold">¿Qué entregamos?</h3>
              <p className="mt-2 text-white/75">
                Un plan accionable y conexiones prácticas. Nos enfocamos en resultados medibles y velocidad de
                implementación.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-[#0e1915] p-4">
                  <div className="text-sm text-white/60">Duración típica</div>
                  <div className="font-medium">2-6 semanas</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#0e1915] p-4">
                  <div className="text-sm text-white/60">Formato</div>
                  <div className="font-medium">Remoto / Híbrido</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
