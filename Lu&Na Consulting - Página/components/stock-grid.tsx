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
import { Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { useImportedStocks } from "@/hooks/use-imported-stocks"

const HIDDEN: StockCategory[] = []

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
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const s of ALL_VISIBLE) map.set(s.category, (map.get(s.category) || 0) + 1)
    return map
  }, [ALL_VISIBLE])

  const filteredList = useMemo(
    () => (active === "Todos" ? ALL_VISIBLE : ALL_VISIBLE.filter((s) => s.category === active)),
    [active, ALL_VISIBLE],
  )

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const list = filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Reset page when category changes
  const handleCategoryChange = (category: typeof CATEGORIES[number]) => {
    setActive(category)
    setCurrentPage(1)
  }

  return (
    <section 
      id="stocks" 
      className="relative min-h-screen overflow-hidden py-16 text-white"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(16, 185, 129, 0.15) 0%, 
            rgba(59, 130, 246, 0.15) 25%,
            rgba(168, 85, 247, 0.15) 50%,
            rgba(236, 72, 153, 0.15) 75%,
            rgba(251, 146, 60, 0.15) 100%
          ),
          radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
          #0a0f1c
        `
      }}
    >
      {/* Glassmorphism Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Floating glass orbs */}
        <motion.div
          className="absolute left-1/4 top-20 h-64 w-64 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))",
            backdropFilter: "blur(60px)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-20 h-48 w-48 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }}
          animate={{
            y: [0, 15, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Grid lines with glassmorphism */}
        <div 
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent)"
          }}
        />
        <div 
          className="absolute left-8 top-10 h-px w-[calc(100%-4rem)]"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)"
          }}
        />
        <div 
          className="absolute bottom-8 right-8 h-px w-[calc(100%-4rem)]"
          style={{
            background: "linear-gradient(to left, transparent, rgba(255, 255, 255, 0.1), transparent)"
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Glassmorphism Back Bar */}
        <div 
          className="mb-8 inline-block rounded-2xl p-1"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
          }}
        >
          <BackBar href="/" label="Volver al inicio" />
        </div>

        {/* Glassmorphism Title Section */}
        <motion.div 
          className="mx-auto max-w-4xl text-center mb-12 rounded-3xl p-8"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 16px 64px rgba(0, 0, 0, 0.1)"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl mb-6"
            style={{ 
              textShadow: "0 0 20px rgba(16,185,129,.4), 0 0 40px rgba(59,130,246,.3)",
              background: "linear-gradient(135deg, #10b981, #3b82f6, #a855f7, #ec4899)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            Stocks Exclusivos
          </h1>
          <p className="text-xl text-white/80 font-light">
            {loading ? "Importando catálogo premium..." : "Colección completa de activos de lujo y oportunidades de inversión"}
          </p>
          <div className="mt-6 text-sm text-white/60">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              {ALL_VISIBLE.length} productos exclusivos disponibles
            </span>
          </div>
        </motion.div>

        {/* Glassmorphism Category Filters */}
        <motion.div 
          className="mx-auto mt-10 mb-12 max-w-5xl rounded-2xl p-6"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(25px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 12px 48px rgba(0, 0, 0, 0.15)"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((c, index) => (
              <motion.button
                key={c}
                onClick={() => handleCategoryChange(c)}
                className={`rounded-2xl border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  active === c
                    ? "text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
                style={{
                  background: active === c 
                    ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2))"
                    : "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  border: active === c 
                    ? "1px solid rgba(16, 185, 129, 0.3)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: active === c 
                    ? "0 8px 32px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    : "0 4px 16px rgba(0, 0, 0, 0.1)"
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {c}{" "}
                <span className="ml-2 text-white/50 text-xs">
                  ({c === "Todos" ? ALL_VISIBLE.length : counts.get(c as string) || 0})
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Glassmorphism Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => {
            // Portada garantizada como imagen
            const cover = item.images.find((m: { src: string }) => !isVideo(m.src)) || item.images[0]
            const isCars = item.category === "Coches de lujo"

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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card 
                  className="overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(30px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 16px 64px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <CardHeader className="relative p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <LetterboxImage
                        src={cover?.src || "/placeholder.svg?height=720&width=1280&query=luxury-stock"}
                        alt={cover?.alt || item.title}
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        aspect="16/9"
                        cover
                        className="transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Glassmorphism overlay on image hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))",
                          backdropFilter: "blur(2px)"
                        }}
                      />
                    </div>
                    
                    {/* Floating glassmorphism badges */}
                    <div className="absolute left-4 top-4 flex items-center gap-3">
                      <Badge 
                        className="text-white font-medium text-xs px-3 py-1"
                        style={{
                          background: "rgba(16, 185, 129, 0.8)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)"
                        }}
                      >
                        {item.category}
                      </Badge>
                      <div
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{
                          background: "rgba(0, 0, 0, 0.4)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        {formatPrice(item.price, item.currency)}
                      </div>
                    </div>

                    {/* Featured indicator */}
                    {item.featured && (
                      <div 
                        className="absolute right-4 top-4 h-3 w-3 rounded-full"
                        style={{
                          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                          boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)"
                        }}
                      />
                    )}
                  </CardHeader>
                  
                  <CardContent 
                    className="space-y-4 p-6"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      backdropFilter: "blur(20px)"
                    }}
                  >
                    <h3 className="line-clamp-2">
                      <span
                        className="text-xl font-bold leading-snug tracking-tight md:text-2xl"
                        style={{ 
                          textShadow: "0 0 15px rgba(16,185,129,.3)",
                          background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent"
                        }}
                      >
                        {item.title}
                      </span>
                    </h3>
                    {item.short && (
                      <p className="line-clamp-3 text-sm text-white/75 leading-relaxed">
                        {item.short}
                      </p>
                    )}

                    {/* Glassmorphism CTA buttons */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/stocks/${item.slug}`}
                        className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                        style={{
                          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(59, 130, 246, 0.8))",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                        }}
                        aria-label="Ver detalles"
                      >
                        <Eye className="h-4 w-4" />
                        Ver detalles
                      </Link>
                      <div
                        className="rounded-2xl p-1"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <QuickWAButton phoneE164={quickPhone} message={quickMsg} label={quickLabel} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Glassmorphism Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="mt-16 rounded-2xl p-6"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(25px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 12px 48px rgba(0, 0, 0, 0.15)"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
                }}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </button>
              
              <div className="flex items-center gap-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-12 w-12 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-110 ${
                      currentPage === page ? "text-white" : "text-white/70"
                    }`}
                    style={{
                      background: currentPage === page
                        ? "linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(59, 130, 246, 0.8))"
                        : "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(20px)",
                      border: currentPage === page
                        ? "1px solid rgba(16, 185, 129, 0.3)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: currentPage === page
                        ? "0 8px 32px rgba(16, 185, 129, 0.3)"
                        : "0 4px 16px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
                }}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Glassmorphism Results info */}
        <motion.div 
          className="mt-8 text-center rounded-2xl p-4"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.05)"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm text-white/60">
            Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredList.length)} de {" "}
            <span className="font-medium text-white/80">{filteredList.length} productos exclusivos</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
