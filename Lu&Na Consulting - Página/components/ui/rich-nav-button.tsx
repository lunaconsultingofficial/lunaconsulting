"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

export default function RichNavButton({
  href,
  children,
  className,
}: PropsWithChildren<{ href: string; className?: string }>) {
  return (
    <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
      <Link
        href={href}
        className={cn(
          "group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.15)_inset] transition",
          "hover:bg-emerald-500/15 hover:text-emerald-100",
          className
        )}
      >
        <span className="relative z-10">{children}</span>
        {/* Glow */}
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-emerald-400/30" />
        {/* Ripple */}
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/20 opacity-0 transition-all duration-500 group-active:h-[220%] group-active:w-[220%] group-active:opacity-100" />
      </Link>
    </motion.span>
  )
}
