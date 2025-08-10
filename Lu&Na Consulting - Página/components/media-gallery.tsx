"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, X } from "lucide-react"

export default function MediaGallery({ media }: { media: { src: string; alt?: string }[] }) {
  const [open, setOpen] = useState<string | null>(null)
  if (!media?.length) return null

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {media.map((m, i) => {
        const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(m.src)
        return (
          <div
            key={m.src + i}
            className="group relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-black"
          >
            {/* fondo borroso para evitar «pintazo» */}
            <img
              src={m.src || "/placeholder.svg"}
              alt=""
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
              aria-hidden
            />
            {isVideo ? (
              <video
                src={m.src}
                className="absolute inset-0 h-full w-full object-cover"
                controls={false}
                muted
                playsInline
                onClick={() => setOpen(m.src)}
              />
            ) : (
              <img
                src={m.src || "/placeholder.svg"}
                alt={m.alt || ""}
                className="absolute inset-0 h-full w-full object-cover"
                onClick={() => setOpen(m.src)}
              />
            )}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            {isVideo && <Play className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-white/90" />}
          </div>
        )
      })}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button
              className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white"
              aria-label="Cerrar"
              onClick={() => setOpen(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute left-1/2 top-1/2 w-[min(96vw,1100px)] -translate-x-1/2 -translate-y-1/2">
              {/\.(mp4|webm|mov|m4v)$/i.test(open) ? (
                <video src={open} controls className="h-auto w-full rounded-2xl" />
              ) : (
                <img src={open || "/placeholder.svg"} alt="" className="h-auto w-full rounded-2xl" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
