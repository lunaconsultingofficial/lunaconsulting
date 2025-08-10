"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, MessageCircle } from 'lucide-react'
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import RichNavButton from "./ui/rich-nav-button"
import { CEO_PHONE_E164 } from "@/lib/phones"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const NavLinks = () => (
    <div className="flex items-center gap-3">
      <RichNavButton href="#featured">Featured</RichNavButton>
      <RichNavButton href="/stocks">Stocks</RichNavButton>
      <RichNavButton href="/services">Más Servicios</RichNavButton>
    </div>
  )

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled ? "border-b border-white/10 bg-[#0b1411]/80 backdrop-blur" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6 text-white">
        <Link href="/" className="font-semibold tracking-tight" aria-label="Ir a inicio">
          Lu&amp;Na Consulting
        </Link>
        <nav className="hidden items-center gap-3 md:flex">
          <NavLinks />
          <a
            href={`tel:+${CEO_PHONE_E164}`}
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
            aria-label="Llamar (CEO)"
            title="Llamar (CEO)"
          >
            <Phone className="h-4 w-4 text-emerald-300" />
            Call
          </a>
          <a
            href={`https://wa.me/${CEO_PHONE_E164}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-200 transition hover:bg-emerald-500/15"
            aria-label="WhatsApp (CEO)"
            title="WhatsApp (CEO)"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Abrir menú"
                className="rounded-lg border border-white/30 p-2 text-white transition hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-[#0b1411] text-white">
              <div className="mt-8 space-y-4">
                <NavLinks />
                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={`tel:+${CEO_PHONE_E164}`}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/80"
                  >
                    Call (CEO)
                  </a>
                  <a
                    href={`https://wa.me/${CEO_PHONE_E164}`}
                    target="_blank"
                    className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-200"
                  >
                    WhatsApp (CEO)
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
