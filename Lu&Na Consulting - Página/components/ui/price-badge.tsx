"use client"

import { BadgeDollarSign } from 'lucide-react'
import { cn } from "@/lib/utils"

export default function PriceBadge({
  value,
  className,
  title,
}: {
  value: string
  className?: string
  title?: string
}) {
  return (
    <span
      title={title || value}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40",
        "bg-emerald-600/15 px-3 py-1 text-sm text-emerald-100",
        "shadow-[0_0_22px_rgba(16,185,129,0.28)_inset] ring-1 ring-emerald-400/20",
        className
      )}
    >
      <BadgeDollarSign className="h-4 w-4 text-emerald-300" />
      <span className="font-medium">{value}</span>
    </span>
  )
}
