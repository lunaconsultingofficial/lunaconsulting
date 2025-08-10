"use client"

import { useEffect, useMemo, useState } from "react"
import type { StockItem, StockCategory } from "@/data/stocks"
import { useImportConfig } from "./use-import-config"
import { buildDescriptionMap, pickDescriptionFor } from "@/lib/description-map"

type ConsolidatedItem = {
  id?: string | number
  title: string
  description?: string
  images?: string[] // file names or full URLs
  videos?: string[] // file names or full URLs
  category?: string
  short?: string
}

type Consolidated = ConsolidatedItem[]

function isVideo(name: string) {
  return /\.(mp4|webm|mov|m4v)$/i.test(name)
}

function joinBase(base: string, name: string) {
  if (!name) return ""
  if (/^https?:\/\//i.test(name)) return name
  if (!base) return name
  return `${base.replace(/\/$/, "")}/${encodeURI(name)}`
}

function mapCategory(raw?: string): StockCategory {
  const v = (raw || "").toLowerCase()
  if (/(real\s*estate|villa|house|propiedad|inmueble)/i.test(v)) return "Real estate"
  if (/(aircraft|avion|avión|jet|boeing|airbus)/i.test(v)) return "Aircraft"
  if (/(commodit|oro|gold|fuel|di[eé]sel|cobre|copper|diamond|diamante)/i.test(v)) return "Commodities"
  if (
    /(car|coche|auto|ferrari|lamborghini|mercedes|porsche|maybach|rolls|koenigsegg|brabus|yaris|toyota|lexus)/i.test(v)
  )
    return "Luxury cars"
  return "Inventory"
}

// Heurística de base: nombres tipo WhatsApp/VID/IMG => nadiua; resto => website
function guessBase(filename: string, cfg: { nadiuaBase: string; websiteBase: string }) {
  const lower = (filename || "").toLowerCase()
  const isNadiua = /(img-|wa|whatsapp|video-|vid-|mp4|webm|mov|m4v)/i.test(lower)
  return isNadiua ? cfg.nadiuaBase : cfg.websiteBase
}

export function useImportedStocks() {
  const { config } = useImportConfig()
  const [items, setItems] = useState<StockItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const descMap = useMemo(() => buildDescriptionMap(config.descriptionsText || ""), [config.descriptionsText])

  useEffect(() => {
    let abort = false
    ;(async () => {
      try {
        setLoading(true)
        setError(null)

        // 1) Cargar JSON desde texto inline o URL
        let data: Consolidated | null = null
        if (config.inlineJson && config.inlineJson.trim().startsWith("[")) {
          data = JSON.parse(config.inlineJson) as Consolidated
        } else if (config.jsonUrl) {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

          try {
            const res = await fetch(config.jsonUrl, {
              cache: "no-store",
              signal: controller.signal
            })
            clearTimeout(timeoutId)

            if (!res.ok) throw new Error(`No se pudo leer el JSON (HTTP ${res.status})`)
            data = (await res.json()) as Consolidated
          } catch (e: any) {
            clearTimeout(timeoutId)
            if (e.name === 'AbortError') {
              throw new Error('Timeout: El JSON tardó demasiado en cargar')
            }
            throw e
          }
        }

        if (!data) {
          setItems(null)
          return
        }

        // 2) Mapear todos los medios (imágenes primero, luego vídeos)
        const mapped: StockItem[] = data.map((it, idx) => {
          const cat = it.category ? (mapCategory(it.category) as StockCategory) : mapCategory(it.title)
          const imgNames = (it.images || []).filter(Boolean)
          const vidNames = (it.videos || []).filter(Boolean)

          const images = [
            ...imgNames.map((m) => ({ src: joinBase(guessBase(m, config), m), alt: `${it.title} — imagen` })),
            ...vidNames.map((m) => ({ src: joinBase(guessBase(m, config), m), alt: `${it.title} — video` })),
          ]

          if (images.length === 0) images.push({ src: "/diverse-stock-market.png", alt: it.title })

          // 3) Completar descripción si falta usando un texto de referencia
          const completedDescription = it.description?.trim() || pickDescriptionFor(it.title, descMap) || ""

          return {
            slug: (it.title || `item-${idx}`)
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, ""),
            title: it.title || "Stock sin título",
            category: cat,
            price: null,
            currency: "EUR",
            short:
              it.short ||
              (completedDescription
                ? completedDescription.slice(0, 140) + (completedDescription.length > 140 ? "…" : "")
                : "Consulta disponibilidad y detalles."),
            description: completedDescription,
            images,
            featured: idx < 12,
          } satisfies StockItem
        })

        if (abort) return
        setItems(mapped)
      } catch (e: any) {
        if (abort) return
        setError(e?.message || "No se pudo importar el JSON")
        setItems(null)
      } finally {
        if (!abort) setLoading(false)
      }
    })()

    return () => {
      abort = true
    }
  }, [config, descMap])

  const byCategory = useMemo(() => {
    const m = new Map<StockCategory, StockItem[]>()
    ;(items || []).forEach((it) => {
      const arr = m.get(it.category) || []
      arr.push(it)
      m.set(it.category, arr)
    })
    return m
  }, [items])

  return { items, byCategory, error, loading }
}
