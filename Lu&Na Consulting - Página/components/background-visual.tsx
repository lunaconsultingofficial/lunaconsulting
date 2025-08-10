"use client"

import { useEffect, useRef } from "react"

// Fondo visual: malla/gradientes + “ruido” suave animado
export default function BackgroundVisual() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext("2d", { alpha: true })
    if (!ctx) return

    let raf = 0
    const dpr = Math.max(1, window.devicePixelRatio || 1)

    const draw = (t = 0) => {
      const { width, height } = c.getBoundingClientRect()
      c.width = Math.floor(width * dpr)
      c.height = Math.floor(height * dpr)
      ctx.scale(dpr, dpr)

      // Clear
      ctx.clearRect(0, 0, width, height)

      // Grid lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.08)" // emerald/verde
      ctx.lineWidth = 1
      const gap = 36
      ctx.beginPath()
      for (let x = 0; x < width; x += gap) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      for (let y = 0; y < height; y += gap) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      ctx.stroke()

      // Floating blobs
      const cx = width / 2
      const cy = height / 3
      const r1 = 180 + Math.sin(t * 0.0015) * 30
      const r2 = 240 + Math.cos(t * 0.0012) * 40
      const grad1 = ctx.createRadialGradient(cx - 120, cy, 0, cx - 120, cy, r1)
      grad1.addColorStop(0, "rgba(16,185,129,0.12)")
      grad1.addColorStop(1, "rgba(16,185,129,0)")
      ctx.fillStyle = grad1
      ctx.beginPath()
      ctx.arc(cx - 120, cy, r1, 0, Math.PI * 2)
      ctx.fill()

      const grad2 = ctx.createRadialGradient(cx + 160, cy + 40, 0, cx + 160, cy + 40, r2)
      grad2.addColorStop(0, "rgba(5,150,105,0.10)")
      grad2.addColorStop(1, "rgba(5,150,105,0)")
      ctx.fillStyle = grad2
      ctx.beginPath()
      ctx.arc(cx + 160, cy + 40, r2, 0, Math.PI * 2)
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0b1411]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),transparent_60%)]" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
