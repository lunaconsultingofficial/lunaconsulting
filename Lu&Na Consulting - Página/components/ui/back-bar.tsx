import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BackBarProps {
  href: string
  label: string
}

export default function BackBar({ href, label }: BackBarProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 group"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(25px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
      }}
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
      <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
        {label}
      </span>
    </Link>
  )
}
