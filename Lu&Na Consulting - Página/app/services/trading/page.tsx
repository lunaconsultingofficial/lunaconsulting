import { motion } from "framer-motion"
import WhatsAppPanel from "@/components/whatsapp-panel"
import LetterboxImage from "@/components/ui/letterbox-image"
import BackBar from "@/components/ui/back-bar"
import { CEO_PHONE_E164, CRYPTO_DEPT_PHONE_E164 } from "@/lib/phones"

const STACK = ["TradingView", "MetaTrader", "cTrader", "Sheets/Excel", "Notion", "Python"]

export default function TradingPage() {
  const phones = [
    { label: "Dept. Crypto", number: CRYPTO_DEPT_PHONE_E164, hint: "Trading/Crypto" },
    { label: "CEO", number: CEO_PHONE_E164, hint: "Principal" },
  ]

  return (
    <section className="relative overflow-hidden bg-[#0e1915] py-16 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[140%] w-px -translate-x-1/2 bg-emerald-500/10" />
        <div className="absolute -left-16 top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        <BackBar href="/services" label="Volver a Más Servicios" />

        <div className="mx-auto max-w-4xl text-center">
          <motion.h1 className="text-4xl font-extrabold tracking-tight md:text-6xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            Trading
          </motion.h1>
          <motion.p className="mt-3 text-white/80" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Resultados medibles con estrategia, riesgo y ejecución. Conexión con los partners adecuados.
          </motion.p>
        </div>

        {/* Esquema visual con glow */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            { title: "Diagnóstico", desc: "Análisis de situación, objetivos y métricas." },
            { title: "Estrategia", desc: "Marco operativo, gestión del riesgo, playbook." },
            { title: "Ejecución", desc: "Rutina, checklist y revisión semanal." },
          ].map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45, delay: 0.05 * i }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1411] p-5"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-emerald-400/20" />
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-white/75">{b.desc}</p>
              <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400/70 to-emerald-400/0" />
            </motion.div>
          ))}
        </div>

        {/* Stack que usamos */}
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="text-sm uppercase tracking-wide text-white/60">Stack que usamos</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span key={s} className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Galería 16:9 */}
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/trading-desk-dark.png", alt: "Mesa de trading" },
            { src: "/green-candle-charts.png", alt: "Gráficos y velas" },
            { src: "/risk-management-dashboard.png", alt: "Gestión del riesgo" },
          ].map((img) => (
            <LetterboxImage key={img.alt} src={img.src} alt={img.alt} aspect="16/9" cover />
          ))}
        </div>

        {/* Panel de WhatsApp con números destacados */}
        <div className="mx-auto mt-12 max-w-5xl">
          <WhatsAppPanel itemTitle="Servicio de Trading" context="Servicios" phones={phones} defaultIndex={0} />
        </div>
      </div>
    </section>
  )
}
