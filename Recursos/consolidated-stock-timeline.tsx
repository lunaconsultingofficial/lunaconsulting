"use client"

import { consolidatedStocks, type ConsolidatedStockItem } from "@/data/consolidated-stocks"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import WhatsAppButtons from "@/components/whatsapp-buttons"
import { FocusImage } from "@/components/ui/focus-overlay"
import { CARS_DEPT_PHONE_E164 } from "@/lib/phones"
import { useState } from "react"

function isVideo(src?: string) {
  return !!src && /\.(mp4|webm|mov|m4v)$/i.test(src)
}

export default function ConsolidatedStockTimeline() {
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: number }>({})

  const handleImageSelect = (itemIndex: number, imageIndex: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemIndex]: imageIndex
    }))
  }

  return (
    <section id="consolidated-stock" className="relative overflow-hidden py-24">
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
              Stock Completo
            </span>
          </h2>
          <p className="mt-3 text-white/70">Toda nuestra colección de vehículos de lujo y activos premium.</p>
        </div>

        <div className="mx-auto max-w-6xl">
          {consolidatedStocks.map((item, i) => {
            const left = i % 2 === 0
            const selectedIndex = selectedItems[i] || 0
            const currentMedia = item.images[selectedIndex] || item.images[0]
            const phone = CARS_DEPT_PHONE_E164

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative grid items-start gap-6 py-10 md:grid-cols-2"
              >
                <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/90 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />

                <div className={`${left ? "md:order-1" : "md:order-2"} order-1`}>
                  {/* Main Image/Video Display */}
                  <div className="relative mx-auto aspect-[16/9] w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-black mb-4">
                    {currentMedia && (
                      <>
                        {isVideo(currentMedia) ? (
                          <video
                            src={currentMedia}
                            controls
                            className="w-full h-full object-cover"
                            poster="/placeholder.svg?height=720&width=1280&query=video"
                          />
                        ) : (
                          <>
                            <Image
                              src={currentMedia}
                              alt=""
                              fill
                              className="scale-110 object-cover blur-2xl opacity-40"
                              aria-hidden
                            />
                            <Image
                              src={currentMedia}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                            />
                            <FocusImage
                              src={currentMedia}
                              alt={item.title}
                              className="absolute inset-0"
                            />
                          </>
                        )}
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                      </>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {(item.images.length > 1 || item.videos.length > 0) && (
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {item.images.map((image, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleImageSelect(i, idx)}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedIndex === idx ? 'border-emerald-400' : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${item.title} ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                      {item.videos.map((video, idx) => (
                        <button
                          key={`video-${idx}`}
                          onClick={() => handleImageSelect(i, item.images.length + idx)}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center bg-black/50 ${
                            selectedIndex === item.images.length + idx ? 'border-emerald-400' : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className={`${left ? "md:order-2 md:pl-10" : "md:order-1 md:pr-10"} order-2`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="bg-emerald-600 text-white">Luxury Cars</Badge>
                  </div>
                  <h3
                    className="mt-2 text-2xl font-extrabold md:text-3xl"
                    style={{ textShadow: "0 0 10px rgba(16,185,129,.25), 0 0 18px rgba(16,185,129,.15)" }}
                  >
                    <span className="bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                      {item.title}
                    </span>
                  </h3>
                  <p className="mt-2 text-white/75">{item.description}</p>
                  
                  {/* Media Count Info */}
                  <div className="mt-3 flex gap-4 text-sm text-white/60">
                    {item.images.length > 0 && (
                      <span>{item.images.length} imagen{item.images.length !== 1 ? 'es' : ''}</span>
                    )}
                    {item.videos.length > 0 && (
                      <span>{item.videos.length} video{item.videos.length !== 1 ? 's' : ''}</span>
                    )}
                  </div>

                  <div className="mt-4">
                    <WhatsAppButtons itemTitle={item.title} context="Stock Completo" phoneE164={phone} compact />
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

