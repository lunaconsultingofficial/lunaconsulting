"use client"

import { type StockItem, stocks as baseStocks } from "@/data/stocks"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/format"
import WhatsAppButtons from "@/components/whatsapp-buttons"
import { FocusImage } from "@/components/ui/focus-overlay"
import { CARS_DEPT_PHONE_E164, CEO_PHONE_E164 } from "@/lib/phones"
import PriceBadge from "@/components/ui/price-badge"
import { useImportedStocks } from "@/hooks/use-imported-stocks-simple"

function isVideo(src?: string) {
  return !!src && /\.(mp4|webm|mov|m4v)$/i.test(src)
}

export default function FeaturedTimeline() {
  const { items: imported } = useImportedStocks()
  const combined: StockItem[] = [...(imported || []), ...baseStocks]

  const cats = ["Luxury cars", "Inventory", "Real estate"] as const
  const featured: StockItem[] = []
  for (const c of cats) {
    const inCat = combined.filter((s) => s.category === c)
    const pri = inCat.filter((s) => s.featured)
    const rest = inCat.filter((s) => !s.featured)
    featured.push(...pri.slice(0, 4), ...rest.slice(0, Math.max(0, 4 - pri.length)))
  }
  const unique = featured.filter((s, i, arr) => i === arr.findIndex((t) => t.slug === s.slug)).slice(0, 12)

  return (
    <section id="featured" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-emerald-500/12" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 text-white">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2
            className="text-3xl font-extrabold tracking-tight md:text-5xl"
            style={{ textShadow: "0 0 14px rgba(16,185,129,.28), 0 0 26px rgba(16,185,129,.18)" }}
          >
            <span className="bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              Featured
            </span>
          </h2>
          <p className="mt-3 text-white/70">Selección curada con portada garantizada como imagen.</p>
        </div>

        <div className="mx-auto max-w-6xl">
          {unique.map((item, i) => {
            const left = i % 2 === 0
            const cover = item.images.find((m) => !isVideo(m.src)) || item.images[0]
            const phone = item.category === "Luxury cars" ? CARS_DEPT_PHONE_E164 : CEO_PHONE_E164
            return (
              <motion.div
                key={item.slug + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative grid items-center gap-6 py-10 md:grid-cols-2"
              >
                <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/90 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />

                <div className={`${left ? "md:order-1" : "md:order-2"} order-1`}>
                  <div className="relative mx-auto aspect-[16/9] w/full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-black">
                    <Image
                      src={cover?.src || "/placeholder.svg?height=720&width=1280&query=featured"}
                      alt=""
                      fill
                      className="scale-110 object-cover blur-2xl opacity-40"
                      aria-hidden
                    />
                    <Image
                      src={cover?.src || "/placeholder.svg?height=720&width=1280&query=featured"}
                      alt={cover?.alt || item.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                    />
                    <FocusImage
                      src={cover?.src || "/placeholder.svg?height=720&width=1280&query=featured"}
                      alt={cover?.alt || item.title}
                      className="absolute inset-0"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                  </div>
                </div>

                <div className={`${left ? "md:order-2 md:pl-10" : "md:order-1 md:pr-10"} order-2`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="bg-emerald-600 text-white">{item.category}</Badge>
                    <PriceBadge value={formatPrice(item.price, item.currency)} />
                  </div>
                  <h3
                    className="mt-2 text-2xl font-extrabold md:text-3xl"
                    style={{ textShadow: "0 0 10px rgba(16,185,129,.25), 0 0 18px rgba(16,185,129,.15)" }}
                  >
                    <span className="bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                      {item.title}
                    </span>
                  </h3>
                  {item.short ? <p className="mt-2 text-white/75">{item.short}</p> : null}
                  <div className="mt-4">
                    <WhatsAppButtons itemTitle={item.title} context="Featured" phoneE164={phone} compact />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
