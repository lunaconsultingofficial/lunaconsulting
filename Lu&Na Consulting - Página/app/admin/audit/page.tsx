"use client"

import BackBar from "@/components/ui/back-bar"
import { useImportedStocks } from "@/hooks/use-imported-stocks"
import { stocks as baseStocks } from "@/data/stocks"
import Link from "next/link"

function isVideo(src?: string) {
  return !!src && /\.(mp4|webm|mov|m4v)$/i.test(src)
}

export default function AuditPage() {
  const { items, loading, error } = useImportedStocks()
  const all = (items && items.length > 0 ? items : baseStocks).slice()

  const missingDesc = all.filter((s) => !s.description?.trim())
  const missingMedia = all.filter((s) => !s.images?.length)
  const videoCover = all.filter((s) => s.images?.length && isVideo(s.images[0].src))

  return (
    <section className="bg-[#0e1915] py-12 text-white">
      <div className="container mx-auto max-w-6xl px-6">
        <BackBar href="/" label="Volver al inicio" />
        <h1 className="text-3xl font-extrabold">Auditoría de datos</h1>
        <p className="mt-2 text-white/70">
          Revisa stocks sin descripción, sin medios o con portada en vídeo (se corrige en el grid automáticamente).
        </p>

        {loading && <p className="mt-6 text-white/70">Cargando datos…</p>}
        {error && <p className="mt-6 text-rose-300">Error: {error}</p>}

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="text-sm text-white/60">Total</div>
            <div className="text-3xl font-bold">{all.length}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="text-sm text-white/60">Sin descripción</div>
            <div className="text-3xl font-bold">{missingDesc.length}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="text-sm text-white/60">Sin medios</div>
            <div className="text-3xl font-bold">{missingMedia.length}</div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <AuditList title="Sin descripción" list={missingDesc} />
          <AuditList title="Sin medios" list={missingMedia} />
        </div>

        <div className="mt-8">
          <AuditList title="Portada en vídeo (FYI)" list={videoCover} />
        </div>
      </div>
    </section>
  )
}

function AuditList({ title, list }: { title: string; list: { slug: string; title: string }[] }) {
  if (!list.length)
    return (
      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-white/70">Sin incidencias.</p>
      </div>
    )
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-2 space-y-2 text-sm">
        {list.map((s) => (
          <li key={s.slug} className="flex items-center justify-between gap-2">
            <span className="truncate">{s.title}</span>
            <Link href={`/stocks/${s.slug}`} className="text-emerald-300 hover:underline">
              Ver ficha
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
