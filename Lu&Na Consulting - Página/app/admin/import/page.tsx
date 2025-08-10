"use client"

import { useState, useEffect, useRef } from "react"
import BackBar from "@/components/ui/back-bar"
import { useImportConfig, getDefaultImportConfig } from "@/hooks/use-import-config"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, AlertCircle, Upload, ExternalLink, FileJson, LinkIcon, FileText } from "lucide-react"
import Link from "next/link"

function normalizeDriveFileUrl(input: string) {
  const m = input.match(/\/file\/d\/([^/]+)\//) || input.match(/[?&]id=([^&]+)/)
  if (m?.[1]) return `https://drive.google.com/uc?export=download&id=${m[1]}`
  return input
}

export default function ImportAdminPage() {
  const { config, save } = useImportConfig()
  const [form, setForm] = useState(config)
  const [status, setStatus] = useState<"idle" | "testing" | "ok" | "error">("idle")
  const [message, setMessage] = useState("")
  const fileRef = useRef<HTMLInputElement | null>(null)
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => setForm(config), [config])

  const onPick = () => fileRef.current?.click()

  const onFile = async (f: File) => {
    setStatus("testing")
    setMessage("Leyendo archivo…")
    try {
      const text = await f.text()
      const j = JSON.parse(text)
      if (!Array.isArray(j)) throw new Error("El JSON debe ser un array")
      setForm((prev) => ({ ...prev, inlineJson: JSON.stringify(j), jsonUrl: prev.jsonUrl || "" }))
      setStatus("ok")
      setMessage(`Archivo cargado: ${f.name} (${j.length} registros)`)
    } catch (e: any) {
      setStatus("error")
      setMessage(e?.message || "No se pudo parsear el JSON")
    }
  }

  const onTest = async () => {
    setStatus("testing")
    setMessage("")
    try {
      const url = normalizeDriveFileUrl(form.jsonUrl)
      const res = await fetch(url, { cache: "no-store" })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const j = await res.json()
      if (!Array.isArray(j)) throw new Error("El JSON debe ser un array")
      setForm((f) => ({ ...f, jsonUrl: url }))
      setStatus("ok")
      setMessage(`OK: ${j.length} registros desde URL`)
    } catch (e: any) {
      setStatus("error")
      setMessage(e?.message || "No se pudo leer el JSON")
    }
  }

  const onSave = () => {
    save(form)
    setStatus("idle")
    setMessage("Guardado")
  }

  const onReset = () => {
    const d = getDefaultImportConfig()
    save(d)
    setForm(d)
    setStatus("idle")
    setMessage("Reiniciado")
  }

  return (
    <section className="bg-[#0e1915] py-12 text-white">
      <div className="container mx-auto max-w-4xl px-6">
        <BackBar href="/" label="Volver al inicio" />
        <h1 className="text-3xl font-extrabold" style={{ textShadow: "0 0 14px rgba(16,185,129,.28)" }}>
          <span className="bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
            Importar Stocks desde Drive
          </span>
        </h1>
        <p className="mt-2 text-white/75">
          Sube el JSON de stock y pega el texto/Markdown de descripciones para asociar imágenes con sus fichas.
        </p>

        <div className="mt-6 grid gap-4">
          {/* JSON */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="mb-2 text-sm text-white/80">1) Subir consolidated_stock.json</div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) onFile(f)
                }}
              />
              <Button onClick={onPick} className="bg-emerald-600 hover:bg-emerald-500">
                <FileJson className="mr-2 h-4 w-4" />
                Subir JSON
              </Button>
              <div className="text-xs text-white/60">o arrástralo aquí</div>
            </div>
          </div>

          <div
            className="rounded-xl border border-white/10 bg-black/20 p-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const f = e.dataTransfer.files?.[0]
              if (f) onFile(f)
            }}
          >
            <div className="text-xs text-white/60">
              Arrastra y suelta consolidated_stock.json para cargarlo en localStorage.
            </div>
          </div>

          {/* JSON URL */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="mb-2 text-sm text-white/80">2) O pegar enlace directo al archivo en Drive</div>
            <label className="grid gap-1">
              <span className="text-sm text-white/80">URL del consolidated_stock.json</span>
              <input
                value={form.jsonUrl}
                onChange={(e) => setForm((f) => ({ ...f, jsonUrl: e.target.value }))}
                placeholder="https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
                className="rounded-md border border-white/15 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400/40"
              />
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button
                onClick={onTest}
                variant="secondary"
                className="bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25"
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Probar enlace
              </Button>
            </div>
          </div>

          {/* Bases de medios */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="mb-2 text-sm text-white/80">3) Bases públicas para medios</div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-sm text-white/80">Base nadiua_media/</span>
                <input
                  value={form.nadiuaBase}
                  onChange={(e) => setForm((f) => ({ ...f, nadiuaBase: e.target.value }))}
                  placeholder="https://TU_HOST/nadiua_media"
                  className="rounded-md border border-white/15 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400/40"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-white/80">Base website_images/</span>
                <input
                  value={form.websiteBase}
                  onChange={(e) => setForm((f) => ({ ...f, websiteBase: e.target.value }))}
                  placeholder="https://TU_HOST/website_images"
                  className="rounded-md border border-white/15 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400/40"
                />
              </label>
            </div>
            <p className="mt-2 text-xs text-white/60">
              Si tu JSON ya trae URLs completas, estas bases no son necesarias.
            </p>
          </div>

          {/* Descripciones de referencia */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="mb-2 text-sm text-white/80">4) Texto/Markdown de descripciones (opcional)</div>
            <p className="mb-2 text-xs text-white/60">
              Pega aquí el texto exportado del blog anterior para completar descripción cuando falte.
            </p>
            <textarea
              ref={textRef}
              rows={8}
              value={form.descriptionsText}
              onChange={(e) => setForm((f) => ({ ...f, descriptionsText: e.target.value }))}
              placeholder="Pega el contenido del blog o un .md con fichas..."
              className="w-full rounded-md border border-white/15 bg-black/30 p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400/40"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setForm((f) => ({ ...f, descriptionsText: (textRef.current?.value || "").trim() }))
                }}
                variant="secondary"
                className="bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25"
              >
                <FileText className="mr-2 h-4 w-4" />
                Guardar texto
              </Button>
            </div>
          </div>

          {/* Modo */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="mb-2 text-sm text-white/80">5) Modo</div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={form.mergeMode === "imported-only" ? "default" : "outline"}
                className={
                  form.mergeMode === "imported-only" ? "bg-emerald-600 hover:bg-emerald-500" : "border-white/30"
                }
                onClick={() => setForm((f) => ({ ...f, mergeMode: "imported-only" }))}
              >
                Usar SOLO importados
              </Button>
              <Button
                variant={form.mergeMode === "merge" ? "default" : "outline"}
                className={form.mergeMode === "merge" ? "bg-emerald-600 hover:bg-emerald-500" : "border-white/30"}
                onClick={() => setForm((f) => ({ ...f, mergeMode: "merge" }))}
              >
                Combinar con locales
              </Button>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-2 flex flex-wrap gap-2">
            <Button onClick={onSave} className="bg-emerald-600 hover:bg-emerald-500">
              <Upload className="mr-2 h-4 w-4" />
              Guardar configuración
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              Reiniciar
            </Button>
            <Button asChild>
              <Link href="/stocks">
                <ExternalLink className="mr-2 h-4 w-4" />
                Abrir Stocks
              </Link>
            </Button>
          </div>

          {/* Estado */}
          {status !== "idle" && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm">
              {status === "testing" && <Loader2 className="h-4 w-4 animate-spin text-emerald-300" />}
              {status === "ok" && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              {status === "error" && <AlertCircle className="h-4 w-4 text-rose-400" />}
              <span className={status === "error" ? "text-rose-300" : "text-white/80"}>{message}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
