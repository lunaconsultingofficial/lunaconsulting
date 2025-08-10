"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Slide = { src: string; alt: string }

interface ImageFaderProps {
  images?: Slide[]
  intervalMs?: number
  className?: string
  showControls?: boolean
}

export default function ImageFader({
  images = [],
  intervalMs = 4500,
  className,
  showControls = true,
}: ImageFaderProps) {
  const slides = useMemo(() => images.filter(Boolean), [images])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [slides.length, intervalMs])

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  if (!slides.length) return null

  return (
    <div className={cn("relative h-[80vh] min-h-[560px] w-full overflow-hidden rounded-2xl", className)}>
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={slides[index]?.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Usamos next/image con fill; el contenedor es relative para compatibilidad con fill [^3] */}
            <Image
              src={slides[index].src || "/placeholder.svg"}
              alt={slides[index].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Gradiente para legibilidad del texto */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.55))]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {showControls && slides.length > 1 && (
        <>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-3">
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="pointer-events-auto bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
              onClick={prev}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="pointer-events-auto bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
              onClick={next}
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a la imagen ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 w-2 rounded-full transition",
                  i === index ? "bg-emerald-400" : "bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
