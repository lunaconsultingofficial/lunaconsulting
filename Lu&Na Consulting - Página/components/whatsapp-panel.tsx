"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { MessageCircle, Phone, Copy, Send, BadgeCheck, Sparkles, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { buildProductMessage, buildWhatsAppUrl } from "@/lib/wa"

type PhoneOption = { label: string; number: string; hint?: string }

export default function WhatsAppPanel({
  itemTitle,
  context,
  phones,
  defaultIndex = 0,
  href,
}: {
  itemTitle: string
  context?: string
  phones: PhoneOption[]
  defaultIndex?: number
  href?: string
}) {
  const [idx, setIdx] = useState(defaultIndex)
  const [mode, setMode] = useState<"consulta" | "estado" | "comprar">("consulta")
  const [custom, setCustom] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  const selected = phones[idx]

  const template = useMemo(
    () =>
      buildProductMessage({
        title: itemTitle,
        category: context,
        url: href,
        intent: mode,
      }),
    [itemTitle, context, href, mode]
  )

  const message = custom.trim()
    ? `${custom.trim()} — Ref: ${context ? `[${context}] ${itemTitle}` : itemTitle}${href ? ` ${href}` : ""}`
    : template

  const openWhatsApp = () => {
    const url = buildWhatsAppUrl(selected.number, message)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const call = () => {
    window.location.href = `tel:+${selected.number}`
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
    } catch {}
  }

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") openWhatsApp()
    }
    el.addEventListener("keydown", onKey)
    return () => el.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1411] p-4 text-sm text-white ring-1 ring-emerald-400/10">
      {/* Header alias + “estado de servicio” */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-8 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 text-emerald-200">
            <MessageCircle className="mr-2 h-4 w-4" />
            {selected.label}
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-white/70">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-300" /> Respuesta rápida
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-white/70">
            <Clock className="h-3.5 w-3.5 text-emerald-300" /> Horario CET
          </span>
        </div>

        {/* Alias selector sin números */}
        <div className="flex flex-wrap gap-2">
          {phones.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setIdx(i)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs transition",
                i === idx
                  ? "border border-emerald-400/50 bg-emerald-600 text-white"
                  : "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
              )}
              title={p.hint || p.label}
              aria-pressed={i === idx}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modos (segmented control) */}
      <div className="mb-3 flex w-full overflow-hidden rounded-full border border-white/15 bg-white/5 p-1">
        {(["consulta", "estado", "comprar"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 rounded-full px-3 py-1.5 text-xs capitalize transition",
              mode === m ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/30" : "text-white/75 hover:bg-white/10"
            )}
            aria-pressed={mode === m}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Preview estilo “burbuja” */}
      <div className="mb-3 rounded-2xl border border-emerald-400/20 bg-gradient-to-b from-emerald-600/10 to-emerald-500/5 p-3">
        <div className="text-[10px] uppercase tracking-wide text-white/60">Preview</div>
        <div className="mt-2 rounded-2xl bg-black/30 p-3 text-emerald-100 ring-1 ring-emerald-400/20">
          {message}
        </div>
      </div>

      {/* Input + acciones grandes */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <input
            ref={inputRef}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Escribe tu mensaje para WhatsApp… (Enter para enviar)"
            className="h-11 w-full rounded-md border border-white/15 bg-black/30 px-3 text-white placeholder:text-white/50 outline-none transition focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={openWhatsApp} className="bg-emerald-600 hover:bg-emerald-500">
            <Send className="mr-2 h-4 w-4" />
            {`WhatsApp (${phones[idx].label})`}
          </Button>
          <Button variant="outline" onClick={call} className="border-white/30 bg-transparent text-white hover:bg-white/10">
            <Phone className="mr-2 h-4 w-4" />
            Llamar
          </Button>
          <Button
            variant="secondary"
            onClick={copy}
            className="bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25"
            title="Copiar mensaje"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copiar
          </Button>
          <span className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-white/70 sm:inline-flex">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" /> Incluye enlace y referencia
          </span>
        </div>
      </div>
    </div>
  )
}
