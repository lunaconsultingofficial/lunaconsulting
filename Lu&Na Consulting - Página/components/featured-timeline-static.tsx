import { stocks as baseStocks } from "@/data/stocks"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import WhatsAppButtons from "@/components/whatsapp-buttons"
import { CARS_DEPT_PHONE_E164, CEO_PHONE_E164 } from "@/lib/phones"
import PriceBadge from "@/components/ui/price-badge"

function isVideo(src?: string) {
  return !!src && /\.(mp4|webm|mov|m4v)$/i.test(src)
}

export default function FeaturedTimeline() {
  // Use only static data to prevent build hanging
  const cats = ["Luxury cars", "Inventory", "Real estate"] as const
  const featured = baseStocks.filter(s => s.featured).slice(0, 12)

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

        <div className="relative">
          <div className="space-y-8">
            {featured.map((stock, index) => {
              const img = stock.images[0]
              const isVid = isVideo(img?.src)
              const phone = stock.category === "Luxury cars" ? CARS_DEPT_PHONE_E164 : CEO_PHONE_E164

              return (
                <div
                  key={stock.slug}
                  className="group relative flex flex-col items-center gap-8 lg:flex-row lg:gap-12"
                >
                  <div className="absolute -left-8 top-8 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 lg:-left-32 lg:top-12">
                    <span className="text-lg font-bold">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="relative w-full max-w-md lg:w-1/2">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/20 via-black/40 to-black/60 ring-1 ring-emerald-500/20">
                      {img && !isVid && (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
                      {img && isVid && (
                        <video
                          src={img.src}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loop
                          muted
                          playsInline
                          autoPlay
                        />
                      )}
                    </div>
                  </div>

                  <div className="w-full space-y-6 lg:w-1/2">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                          {stock.category}
                        </Badge>
                        <PriceBadge item={stock} />
                      </div>
                      <h3 className="text-2xl font-bold text-white lg:text-3xl">{stock.title}</h3>
                      <p className="text-white/70 lg:text-lg">{stock.short}</p>
                    </div>

                    <WhatsAppButtons
                      item={stock}
                      phone={phone}
                      className="justify-start"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
