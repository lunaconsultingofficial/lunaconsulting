"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Eye, ArrowRight, Sparkles, Filter, Database } from "lucide-react"
import { CARS_DEPT_PHONE_E164, CEO_PHONE_E164 } from "@/lib/phones"
import { buildProductMessage } from "@/lib/wa"
import QuickWAButton from "@/components/quick-wa-button"
// Temporarily use local data only to avoid Supabase dependency issues
// import { useSupabaseStocks, useStockAnalytics } from "@/hooks/use-supabase-data"
import { stocks as localStocks, type StockCategory } from "@/data/stocks"

function isVideo(src?: string) {
  return !!src && /\.(mp4|webm|mov|m4v)$/i.test(src)
}

export default function StockGridHybrid() {
  // Temporarily use local data only to ensure the app works
  const stocks = localStocks
  const loading = false
  const error = null

  // Mock analytics functions for now
  const trackStockInteraction = async (stockSlug: string, interaction: string) => {
    console.log('Track interaction:', stockSlug, interaction)
  }
  const trackWhatsAppClick = async (stockSlug: string, department: string) => {
    console.log('Track WhatsApp click:', stockSlug, department)
  }

  // Filter out hidden categories
  const HIDDEN: StockCategory[] = ["Aircraft", "Commodities"]
  const visibleStocks = useMemo(() => 
    stocks.filter(stock => !HIDDEN.includes(stock.category)), 
    [stocks]
  )

  const categories = useMemo(() => {
    const cats = Array.from(new Set(visibleStocks.map(s => s.category)))
    return ["All", ...cats]
  }, [visibleStocks])

  const [activeCategory, setActiveCategory] = useState("All")

  const filteredStocks = useMemo(() => {
    if (activeCategory === "All") return visibleStocks
    return visibleStocks.filter(stock => stock.category === activeCategory)
  }, [activeCategory, visibleStocks])

  const getCategoryCounts = (category: string) => {
    if (category === "All") return visibleStocks.length
    return visibleStocks.filter(s => s.category === category).length
  }

  const handleCategoryChange = async (category: string) => {
    setActiveCategory(category)
    await trackStockInteraction('category_filter', category)
  }

  const handleWhatsAppClick = async (stockSlug: string, department: string) => {
    await trackWhatsAppClick(stockSlug, department)
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.05),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(16,185,129,0.02)_50%,transparent_70%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300 tracking-wide">
              EXCLUSIVE PORTFOLIO
            </span>
            {supabaseStocks.length > 0 && (
              <div className="ml-2 flex items-center gap-1 text-xs text-emerald-400">
                <Database className="h-3 w-3" />
                <span>Live Data</span>
              </div>
            )}
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
            <span className="bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              Premium Assets
            </span>
          </h1>
          
          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            Curated collection of ultra-premium assets available exclusively 
            to qualified investors worldwide.
          </p>

          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
              <span className="text-sm">Loading latest portfolio data...</span>
            </div>
          )}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-slate-900/50 p-2 backdrop-blur-sm">
            <Filter className="ml-2 h-4 w-4 text-emerald-400" />
            <div className="flex gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                      : "text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                  }`}
                >
                  {category}
                  <span className="ml-2 text-xs opacity-60">
                    ({getCategoryCounts(category)})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stock Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredStocks.map((stock, index) => {
            const coverImage = stock.images.find(img => !isVideo(img.src)) || stock.images[0]
            const isCars = stock.category === "Luxury cars"
            const phone = isCars ? CARS_DEPT_PHONE_E164 : CEO_PHONE_E164
            const waLabel = isCars ? "WhatsApp (Dept. Coches)" : "WhatsApp (CEO)"
            
            const detailsUrl = `/stocks/${stock.slug}`
            const quickMsg = buildProductMessage({
              title: stock.title,
              category: stock.category,
              url: detailsUrl,
              intent: "consulta",
            })

            return (
              <motion.div
                key={stock.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/20">
                  {/* Image Section */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {coverImage?.src ? (
                      <Image
                        src={coverImage.src}
                        alt={coverImage.alt}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=400&width=600&text=Stock+Image"
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-800">
                        <div className="text-center">
                          <Sparkles className="mx-auto h-12 w-12 text-emerald-400/50" />
                          <p className="mt-2 text-slate-400">Premium Asset</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute left-4 top-4">
                      <Badge className="border-emerald-500/30 bg-emerald-500/20 text-emerald-300 backdrop-blur-sm">
                        {stock.category}
                      </Badge>
                    </div>

                    {/* Featured Badge */}
                    {stock.featured && (
                      <div className="absolute right-4 top-4">
                        <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 px-3 py-1 backdrop-blur-sm">
                          <Sparkles className="h-3 w-3 text-yellow-400" />
                          <span className="text-xs font-medium text-yellow-300">Featured</span>
                        </div>
                      </div>
                    )}

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                      >
                        <Eye className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white leading-tight">
                      {stock.title}
                    </h3>
                    
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-300">
                      {stock.description || stock.short}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
                        href={detailsUrl}
                        onClick={() => trackStockInteraction(stock.slug, 'view_details')}
                        className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Ver detalles</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                      
                      <QuickWAButton 
                        phoneE164={phone} 
                        message={quickMsg} 
                        label={waLabel}
                        className="shrink-0"
                        onClick={() => handleWhatsAppClick(stock.slug, isCars ? 'cars' : 'ceo')}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredStocks.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
          >
            <div className="mx-auto max-w-md">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-white">No assets found</h3>
              <p className="text-slate-400">Try selecting a different category or browse all assets.</p>
            </div>
          </motion.div>
        )}

        {/* Data Source Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs text-emerald-400">
            <Database className="h-3 w-3" />
            <span>
              {supabaseStocks.length > 0 ? 
                `Live data from Supabase • ${filteredStocks.length} assets` : 
                `Local data • ${filteredStocks.length} assets`
              }
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
