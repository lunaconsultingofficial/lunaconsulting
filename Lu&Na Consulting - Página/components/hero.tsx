"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import ImageFader from "./ui/image-fader"

const heroSlides = [
  { src: "/images/jet-exterior-white-2.jpg", alt: "Jet ejecutivo en pista" },
  { src: "/images/villa-garden-night.jpg", alt: "Villa con jardín iluminado" },
  { src: "/images/boat-marina.jpg", alt: "Lancha en puerto deportivo" },
  { src: "/images/farm2.jpg", alt: "Campos agrícolas en hileras" },
]

export default function Hero() {
  return (
    <section className="relative isolate -mt-2 overflow-hidden pb-10 pt-24 md:pb-16 md:pt-28">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="relative">
          <div className="mx-auto max-w-7xl">
            <ImageFader images={heroSlides} className="rounded-3xl" />
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="pointer-events-auto mx-auto max-w-3xl text-center">
              <motion.h1
                className="text-balance text-4xl font-extrabold tracking-tight text-white drop-shadow md:text-6xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{ textShadow: "0 0 22px rgba(16,185,129,.45), 0 0 48px rgba(16,185,129,.2)" }}
              >
                <span className="bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                  LU&amp;NA CONSULTING
                </span>
              </motion.h1>
              <motion.p
                className="mt-4 max-w-2xl text-pretty text-base text-white/85 md:mx-auto md:text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Intermediación B2B: conectamos compradores y vendedores verificados en energía, industria, agro,
                real&nbsp;estate y retail.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500">
                  <Link href="/stocks">View Stocks</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  <Link href="#featured">View featured</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
