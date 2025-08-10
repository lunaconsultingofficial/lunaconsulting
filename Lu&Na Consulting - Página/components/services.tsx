"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Handshake, Factory, Ship, PiggyBank, Boxes, Leaf } from 'lucide-react'
import { motion } from "framer-motion"
import AnimatedSection from "./ui/animated-section"

const items = [
  { icon: Handshake, title: "Intermediación B2B", desc: "Conectamos compradores y vendedores verificados para cerrar operaciones seguras.", tag: "Brokerage" },
  { icon: Boxes, title: "Sourcing y oferta", desc: "Búsqueda de producto/activo, comparación de condiciones y presentación de propuestas.", tag: "Sourcing" },
  { icon: Factory, title: "Due diligence básica", desc: "Verificación documental y reputacional de proveedores y mercancía.", tag: "Compliance" },
  { icon: Ship, title: "Logística y coordinación", desc: "Coordinación entre partes, documentación y entregas con partners especializados.", tag: "Operativa" },
  { icon: Leaf, title: "Sectores", desc: "Energía, industria, agro, real estate y retail.", tag: "Multi‑sector" },
  { icon: PiggyBank, title: "Stocks y oportunidades", desc: "Selección de lotes y activos disponibles para compra inmediata.", tag: "Stocks" },
]

export default function Services() {
  return (
    <section id="services" className="relative border-t bg-background py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-300/20 via-transparent to-transparent" />
      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Servicios</h2>
            <p className="mt-3 text-muted-foreground">Cobertura completa para cerrar operaciones con seguridad y velocidad.</p>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="group h-full border-muted-foreground/15 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{it.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{it.desc}</p>
                  <div className="mt-4">
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700">{it.tag}</Badge>
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
