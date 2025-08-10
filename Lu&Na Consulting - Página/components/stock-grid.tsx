"use client"

import { useMemo, useState } from "react"
import { stocks as baseStocks, type StockCategory } from "@/data/stocks"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import LetterboxImage from "@/components/ui/letterbox-image"
import Link from "next/link"
import { formatPrice } from "@/lib/format"
import { motion } from "framer-motion"
import BackBar from "@/components/ui/back-bar"
import { CARS_DEPT_PHONE_E164, CEO_PHONE_E164 } from "@/lib/phones"
import PriceBadge from "@/components/ui/price-badge"
import QuickWAButton from "@/components/quick-wa-button"
import { buildProductMessage } from "@/lib/wa"
import { Eye } from "lucide-react"
import { useImportedStocks } from "@/hooks/use-imported-stocks"

const HIDDEN: StockCategory[] = ["Aircraft", "Commodities"]

function isVideo(src?: string) {
  return !!src && /\.(mp4|webm|mov|m4v)$/i.test(src)
}

export default function StockGrid() {
  const { items: imported, loading } = useImportedStocks()

  const merged = useMemo(() => {
    const map = new Map<string, any>()
    ;(imported || []).forEach((s) => map.set(s.slug, s))
    // Si se eligió SOLO importados, no añadimos locales; si no hay importados, caemos a locales.
    if (!imported || imported.length === 0) baseStocks.forEach((s) => map.set(s.slug, s))
    return Array.from(map.values())
  }, [imported])

  const ALL_VISIBLE = useMemo(() => merged.filter((s) => !HIDDEN.includes(s.category)), [merged])

  const CATEGORIES = useMemo(
    () => ["Todos", ...Array.from(new Set(ALL_VISIBLE.map((s) => s.category)))] as const,
    [ALL_VISIBLE],
  )

  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("Todos")

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const s of ALL_VISIBLE) map.set(s.category, (map.get(s.category) || 0) + 1)
    return map
  }, [ALL_VISIBLE])

  const list = useMemo(
    () => (active === "Todos" ? ALL_VISIBLE : ALL_VISIBLE.filter((s) => s.category === active)),
    [active, ALL_VISIBLE],
  )

  return (
    <section id="stocks" className="relative overflow-hidden bg-[#0e1915] py-16 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[140%] w-px -translate-x-1/2 bg-emerald-500/10" />
        <div className="absolute left-8 top-10 h-px w-[calc(100%-4rem)] bg-emerald-500/10" />
        <div className="absolute bottom-8 right-8 h-px w-[calc(100%-4rem)] bg-emerald-500/10" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <BackBar href="/" label="Volver al inicio" />

        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
            style={{ textShadow: "0 0 14px rgba(16,185,129,.28), 0 0 26px rgba(16,185,129,.18)" }}
          >
            <span className="bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              Stocks
            </span>
          </h1>
          <p className="mt-4 text-white/80">
            {loading ? "Importando catálogo..." : "Todos los medios vinculados y la descripción completa en la ficha."}
          </p>
        </div>

        {/* Filtros */}
        <div className="mx-auto mt-10 flex max-w-full flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                active === c
                  ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-100"
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {c}{" "}
              <span className="ml-1 text-white/50">
                ({c === "Todos" ? ALL_VISIBLE.length : counts.get(c as string) || 0})
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => {
            // Portada garantizada como imagen
            const cover = item.images.find((m: { src: string }) => !isVideo(m.src)) || item.images[0]
            const isCars = item.category === "Luxury cars"

            const origin = typeof window !== "undefined" ? window.location.origin : "https://lunaconsulting.example"
            const detailsUrl = `${origin}/stocks/${item.slug}`
            const quickMsg = buildProductMessage({
              title: item.title,
              category: item.category,
              url: detailsUrl,
              intent: "consulta",
            })
            const quickPhone = isCars ? CARS_DEPT_PHONE_E164 : CEO_PHONE_E164
            const quickLabel = isCars ? "WhatsApp (Dept. Coches)" : "WhatsApp (CEO)"

            return (
              <motion.div
                key={`${item.slug}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              >
                <Card className="overflow-hidden border border-white/10 bg-[#0b1411]">
                  <CardHeader className="relative p-0">
                    <LetterboxImage
                      src={cover?.src || "/placeholder.svg?height=720&width=1280&query=stock-image"}
                      alt={cover?.alt || item.title}
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      aspect="16/9"
                      cover
                    />
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      <Badge className="bg-emerald-600 text-white">{item.category}</Badge>
                      <PriceBadge value={formatPrice(item.price, item.currency)} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4">
                    <h3 className="line-clamp-2">
                      <span
                        className="text-[1.25rem] font-extrabold leading-snug tracking-tight md:text-[1.5rem]"
                        style={{ textShadow: "0 0 10px rgba(16,185,129,.25), 0 0 18px rgba(16,185,129,.15)" }}
                      >
                        <span className="bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                          {item.title}
                        </span>
                      </span>
                    </h3>
                    {item.short ? <p className="mt-1 line-clamp-3 text-sm text-white/75">{item.short}</p> : null}

                    {/* CTA */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Link
                        href={`/stocks/${item.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white shadow-[0_0_14px_rgba(16,185,129,0.25)_inset] transition hover:bg-emerald-500"
                        aria-label="Ver detalles"
                      >
                        <Eye className="h-4 w-4" />
                        Ver detalles
                      </Link>
                      <QuickWAButton phoneE164={quickPhone} message={quickMsg} label={quickLabel} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
