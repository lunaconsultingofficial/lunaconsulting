"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  src: string
  alt: string
  sizes?: string
  className?: string
  // Nuevo: controla el aspecto y el modo de ajuste
  aspect?: "16/9" | "4/3" | "1/1"
  cover?: boolean
}

export default function LetterboxImage({
  src,
  alt,
  sizes = "100vw",
  className = "",
  aspect = "16/9",
  cover = true,
}: Props) {
  const aspectClass =
    aspect === "16/9" ? "aspect-[16/9]" : aspect === "4/3" ? "aspect-[4/3]" : "aspect-square"

  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl bg-black", aspectClass, className)}>
      {/* Fondo expandido para evitar bordes en formatos muy horizontales/verticales */}
      <Image
        src={src || "/placeholder.svg"}
        alt=""
        fill
        className="scale-110 object-cover blur-2xl opacity-40"
        aria-hidden
      />
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(cover ? "object-cover" : "object-contain")}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  )
}
