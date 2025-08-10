"use client"

import { useMemo, useState } from "react"
import { stocks } from "@/data/stocks"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function FeaturedSlider() {
  const items = useMemo(() => stocks.filter((s) => s.featured), [])
  const [index, setIndex] = useState(0)
  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length)

  if (items.length === 0) {
    return (
      <div className="text-white/70">No hay destacados marcados todavía.</div>
    )
  }

  const item = items[index]

  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b1411] p-2">
      <div className="relative grid gap-6 p-4 sm:grid-cols-2 md:p-6">
        {/* Imagen con foco y glow */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black">
            {/* Fondo expandido borroso para cubrir formatos irregulares */}
            <Image
              src={item.images[0]?.src || "/placeholder.svg"}
              alt={item.images[0]?.alt || item.title}
              fill
              className="object-cover scale-110 blur-2xl opacity-40"
              aria-hidden
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={item.images[0]?.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={item.images[0]?.src || "/placeholder.svg"}
                  alt={item.images[0]?.alt || item.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-4 p-2">
          <Badge className="w-fit bg-emerald-600 text-white">{item.category}</Badge>
          <h3 className="text-2xl font-bold">{item.title}</h3>
          <p className="text-white/75">{item.short}</p>
          <div className="text-emerald-400">{formatPrice(item.price, item.currency)}</div>
          <div className="mt-2 flex gap-3">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-500">
              <Link href={`/stocks/${item.slug}`}>Ver ficha</Link>
            </Button>
            <Button variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
              <Link href="/stocks">Ver todos</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between p-3">
        <button
          onClick={() => go(-1)}
          className="pointer-events-auto rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="pointer-events-auto rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-emerald-400" : "bg-white/40 hover:bg-white/70"}`}
            aria-label={`Ir al destacado ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
