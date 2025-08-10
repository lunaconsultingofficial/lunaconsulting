import { ArrowUpRight, Phone } from 'lucide-react'
import { motion } from "framer-motion"
import BackBar from "@/components/ui/back-bar"
import { CRYPTO_DEPT_PHONE_E164 } from "@/lib/phones"

export default function ServicesIndex() {
  return (
    <section className="relative overflow-hidden bg-[#0e1915] py-16 text-white">
      {/* Decor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[140%] w-px -translate-x-1/2 bg-emerald-500/10" />
        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        <BackBar href="/" label="Volver al inicio" />

        <div className="mx-auto max-w-3xl text-center">
          <motion.h1 className="text-4xl font-extrabold tracking-tight md:text-6xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            Más Servicios
          </motion.h1>
          <motion.p className="mt-3 text-white/80" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Accede a nuestros servicios dedicados. Para consultas inmediatas de Crypto, llama directamente.
          </motion.p>

          {/* SOLO Dept. Crypto como botón de llamada */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:+${CRYPTO_DEPT_PHONE_E164}`}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-600 px-5 py-2.5 text-sm text-white shadow-[0_0_22px_rgba(16,185,129,0.25)_inset] hover:bg-emerald-500"
              aria-label={`Llamar +${CRYPTO_DEPT_PHONE_E164}`}
              title={`Llamar +${CRYPTO_DEPT_PHONE_E164}`}
            >
              <Phone className="h-4 w-4" />
              Llamar Dept. Crypto
              <span className="ml-2 rounded bg-black/30 px-1.5 py-0.5 text-[10px]">+{CRYPTO_DEPT_PHONE_E164}</span>
            </a>
            <a
              href="https://v0-hatimedit-7vgkqk.vercel.app"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm hover:bg-white/10"
            >
              Servicio de Edición <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Tarjetas hacia páginas dedicadas */}
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2">
          <a
            href="/services/trading"
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b1411]"
          >
            <div className="relative h-56 w-full">
              <img src="/trading-charts-dark-theme.png" alt="Trading" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-semibold">Trading</h3>
              <p className="mt-2 text-white/75">
                Estrategia, gestión del riesgo y ejecución. Conexión con partners y plan accionable.
              </p>
              <span className="mt-4 inline-block text-emerald-300 underline-offset-4 group-hover:underline">
                Ver servicio
              </span>
            </div>
          </a>

          <a
            href="/services/crypto"
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b1411]"
          >
            <div className="relative h-56 w-full">
              <img src="/crypto-otc-liquidity-dark-green.png" alt="Crypto" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-semibold">Crypto</h3>
              <p className="mt-2 text-white/75">
                Intermediación en criptoactivos: acceso a contrapartes, KYC/KYB y coordinación operativa.
              </p>
              <span className="mt-4 inline-block text-emerald-300 underline-offset-4 group-hover:underline">
                Ver servicio
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
