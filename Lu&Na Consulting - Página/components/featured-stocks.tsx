"use client"

import { stocks } from "@/data/stocks"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { formatPrice } from "@/lib/format"

const featured = stocks.filter((s) => s.featured).slice(0, 3)

export default function FeaturedStocks() {
  return (
    <section id="featured" className="relative -mt-8 bg-gradient-to-b from-transparent to-[#0e1915] py-24">
      {/* Líneas decorativas tipo diagrama */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-[120%] w-px -translate-x-1/2 bg-emerald-500/10" />
        <div className="absolute left-10 top-0 h-px w-[calc(100%-5rem)] bg-emerald-500/10" />
        <div className="absolute bottom-10 left-10 h-px w-[calc(100%-5rem)] bg-emerald-500/10" />
      </div>

      <div className="container relative z-10 px-6 text-white">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Destacados</h2>
          <p className="mt-3 text-white/70">Tres oportunidades clave seleccionadas.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((item, idx) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Card className="group relative overflow-hidden border border-white/10 bg-[#0b1411]">
                {/* Esquema decorativo */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -left-6 top-8 h-20 w-20 rounded-full border border-emerald-500/20" />
                  <div className="absolute -right-10 bottom-8 h-32 w-32 rounded-full border border-emerald-500/20" />
                </div>

                <CardHeader className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.images[0]?.src || "/placeholder.svg"}
                      alt={item.images[0]?.alt || item.title}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute left-4 top-4">
                      <Badge className="bg-emerald-600 text-white">{item.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.short}</p>
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-emerald-400">{formatPrice(item.price, item.currency)}</div>
                    <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-500">
                      <Link href={`/stocks/${item.slug}`}>Ver ficha</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
