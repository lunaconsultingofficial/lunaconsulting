"use client"

import { useEffect, useState } from "react"

export type ImportConfig = {
  jsonUrl: string
  inlineJson?: string
  mergeMode?: "imported-only" | "merge"
  nadiuaBase: string
  websiteBase: string
  descriptionsText?: string // markdown/texto del blog anterior
}

const KEY = "luna-import-config"

export function getDefaultImportConfig(): ImportConfig {
  return {
    jsonUrl: "",
    inlineJson: "",
    mergeMode: "imported-only",
    nadiuaBase: "",
    websiteBase: "",
    descriptionsText: "",
  }
}

export function useImportConfig() {
  const [config, setConfig] = useState<ImportConfig>(getDefaultImportConfig())

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setConfig(JSON.parse(raw))
    } catch {}
  }, [])

  const save = (c: ImportConfig) => {
    setConfig(c)
    try {
      localStorage.setItem(KEY, JSON.stringify(c))
    } catch {}
  }

  return { config, save }
}
