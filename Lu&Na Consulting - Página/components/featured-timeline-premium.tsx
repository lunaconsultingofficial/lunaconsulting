"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useFeaturedStocks } from "@/hooks/use-supabase-data"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import WhatsAppButtons from "@/components/whatsapp-buttons"
import { CARS_DEPT_PHONE_E164, CEO_PHONE_E164 } from "@/lib/phones"
import PriceBadge from "@/components/ui/price-badge"
import { Eye, ArrowRight, Star } from "lucide-react"

function isVideo(src?: string) {
  return !!src && /\.(mp4|webm|mov|m4v)$/i.test(src)
}

export default function FeaturedTimelinePremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const { stocks: featured, loading } = useFeaturedStocks()

  return (
    <section id="featured" ref={containerRef} className="relative overflow-hidden py-32 bg-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.1),transparent_70%)]"
        />
        <motion.div 
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.05),transparent_70%)]"
        />
      </div>

      {/* Timeline Line */}
      <motion.div
        style={{
          scaleY: useTransform(scrollYProgress, [0, 1], [0, 1])
        }}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-400/30 to-emerald-500/50 origin-top"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 text-white">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 backdrop-blur-sm">
            <Star className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300 tracking-wide">
              CURATED PORTFOLIO
            </span>
          </div>
          
          <h2
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl"
            style={{ textShadow: "0 0 30px rgba(16,185,129,.3)" }}
          >
            <span className="bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              Exclusive
            </span>
            <br />
            <span className="bg-gradient-to-b from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
          
          <p className="text-xl leading-relaxed text-slate-300 md:text-2xl">
            Hand-selected premium assets for the world's most discerning investors.
            Each piece represents the pinnacle of luxury and exclusivity.
          </p>

          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
              <span className="text-sm">Loading exclusive portfolio...</span>
            </div>
          )}
        </motion.div>

        {/* Featured Items */}
        <div className="relative space-y-32">
          {featured.map((stock, index) => {
            const img = stock.images[0]
            const isVid = isVideo(img?.src)
            const phone = stock.category === "Luxury cars" ? CARS_DEPT_PHONE_E164 : CEO_PHONE_E164
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={stock.slug}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative"
              >
                {/* Timeline Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                >
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse" />
                  <div className="relative rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 shadow-2xl shadow-emerald-500/50">
                    <span className="text-lg font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </motion.div>

                <div className={`flex flex-col items-center gap-12 lg:flex-row ${!isLeft ? 'lg:flex-row-reverse' : ''} lg:gap-16`}>
                  {/* Image Section */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-2xl lg:w-1/2"
                  >
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/20 via-black/40 to-black/60 shadow-2xl shadow-black/50">
                      {/* Premium Frame */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-transparent p-1">
                        <div className="h-full w-full rounded-3xl bg-slate-900" />
                      </div>
                      
                      {img && !isVid && (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
                      {img && isVid && (
                        <video
                          src={img.src}
                          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                          loop
                          muted
                          playsInline
                          autoPlay
                        />
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      {/* View Details Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="absolute bottom-6 left-6 right-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      >
                        <div className="flex items-center justify-between rounded-2xl bg-black/80 p-4 backdrop-blur-sm">
                          <span className="text-sm font-medium text-white">Premium Asset</span>
                          <div className="flex items-center gap-2 text-emerald-400">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">View Details</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <div className={`w-full space-y-8 lg:w-1/2 ${!isLeft ? 'lg:text-right' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="space-y-4"
                    >
                      {/* Category & Price */}
                      <div className={`flex flex-wrap items-center gap-4 ${!isLeft ? 'lg:justify-end' : ''}`}>
                        <Badge 
                          variant="outline" 
                          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 backdrop-blur-sm"
                        >
                          {stock.category}
                        </Badge>
                        <PriceBadge item={stock} />
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
                        {stock.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg leading-relaxed text-slate-300 lg:text-xl">
                        {stock.description || stock.short}
                      </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className={`flex flex-wrap gap-4 ${!isLeft ? 'lg:justify-end' : ''}`}
                    >
                      <WhatsAppButtons
                        item={stock}
                        phone={phone}
                        className={!isLeft ? 'lg:flex-row-reverse' : ''}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <motion.a
            href="/stocks"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 px-8 py-4 text-lg font-semibold text-emerald-300 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:from-emerald-600/30 hover:to-emerald-500/30"
          >
            <span>Explore Complete Portfolio</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
