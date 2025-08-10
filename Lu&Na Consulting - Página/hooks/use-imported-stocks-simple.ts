"use client"

import { useState } from "react"
import type { StockItem } from "@/data/stocks"

// Simplified version for build stability
export function useImportedStocks() {
  const [items] = useState<StockItem[] | null>(null)
  const [error] = useState<string | null>(null)
  const [loading] = useState(false)

  // Return empty data during build/SSR to prevent hanging
  const byCategory = new Map()

  return { items, byCategory, error, loading }
}
