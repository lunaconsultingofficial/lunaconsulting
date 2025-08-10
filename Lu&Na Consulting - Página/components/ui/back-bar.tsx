"use client"

import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export default function BackBar({ href = "/", label = "Back" }: { href?: string; label?: string }) {
  return (
    <div className="sticky top-16 z-30 mb-6 flex justify-start">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-black/30 px-4 py-2 text-sm text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.2)_inset] backdrop-blur-md transition hover:bg-black/40 hover:text-emerald-100"
      >
        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
        {label}
      </Link>
    </div>
  )
}
