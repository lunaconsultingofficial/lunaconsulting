"use client"

import { useMemo, use } from "react"
import MediaGallery from "@/components/media-gallery"
import { stocks as baseStocks } from "@/data/stocks"
import LetterboxImage from "@/components/ui/letterbox-image"
import { formatPrice } from "@/lib/format"
import { Badge } from "@/components/ui/badge"
import BackBar from "@/components/ui/back-bar"
import { CARS_DEPT_PHONE_E164, CEO_PHONE_E164 } from "@/lib/phones"
import PriceBadge from "@/components/ui/price-badge"
import QuickWAButton from "@/components/quick-wa-button"
import { buildProductMessage } from "@/lib/wa"
import { useImportedStocks } from "@/hooks/use-imported-stocks"

export default function StockDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { items: imported } = useImportedStocks()
  const all = useMemo(() => {
    const map = new Map<string, any>()
    ;(imported || []).forEach((s) => map.set(s.slug, s))
    baseStocks.forEach((s) => map.set(s.slug, map.get(s.slug) || s))
    return Array.from(map.values())
  }, [imported])

  const item = all.find((s) => s.slug === slug)
  if (!item) {
    return (
      <section className="bg-[#0b1411] py-16 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <BackBar href="/stocks" label="Volver a Stocks" />
          <h1 className="text-2xl font-bold">Elemento no encontrado</h1>
        </div>
      </section>
    )
  }

  const detailsUrl = `/stocks/${item.slug}`
  const quickMsg = buildProductMessage({
    title: item.title,
    category: item.category,
    url: detailsUrl,
    intent: "consulta",
  })
  const quickPhone = item.category === "Luxury cars" ? CARS_DEPT_PHONE_E164 : CEO_PHONE_E164
  const quickLabel = item.category === "Luxury cars" ? "WhatsApp (Dept. Coches)" : "WhatsApp (CEO)"

  return (
    <section className="bg-[#0b1411] py-16 text-white">
      <div className="container mx-auto max-w-7xl px-6">
        <BackBar href="/stocks" label="Volver a Stocks" />

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge className="bg-emerald-600 text-white">{item.category}</Badge>
          <PriceBadge value={formatPrice(item.price, item.currency)} />
          <QuickWAButton phoneE164={quickPhone} message={quickMsg} label={quickLabel} size="default" />
        </div>

        <h1
          className="text-4xl font-extrabold leading-tight md:text-6xl"
          style={{ textShadow: "0 0 14px rgba(16,185,129,.28), 0 0 26px rgba(16,185,129,.18)" }}
        >
          <span className="bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
            {item.title}
          </span>
        </h1>
        {item.short ? <p className="mt-3 max-w-3xl text-white/80">{item.short}</p> : null}

        {item.images.length > 1 ? (
          <div className="mt-8">
            <MediaGallery media={item.images} />
          </div>
        ) : (
          <div className="mt-8 grid">
            <LetterboxImage
              src={item.images[0]?.src || "/placeholder.svg"}
              alt={item.images[0]?.alt || item.title}
              aspect="16/9"
              cover
            />
          </div>
        )}

        {/* Descripción larga */}
        {item.description?.trim() ? (
          <div className="mt-10 max-w-3xl">
            <h2 className="text-xl font-semibold">Descripción</h2>
            <div className="mt-2 rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="whitespace-pre-wrap text-white/80">{item.description}</div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
