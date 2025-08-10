"use client"

import { motion } from "framer-motion"
import AnimatedSection from "./ui/animated-section"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { FocusImage } from "./ui/focus-overlay"

const images = [
  { src: "/images/plant-night1.jpg", alt: "Planta industrial de noche", tag: "Industria" },
  { src: "/images/plant-interior.jpg", alt: "Interior de planta", tag: "Procesos" },
  { src: "/images/tankers.jpg", alt: "Flota de camiones cisterna", tag: "Logística" },
  { src: "/images/farm1.jpg", alt: "Explotación agrícola", tag: "Agro" },
  { src: "/images/copper.jpg", alt: "Stock de cobre", tag: "Metales" },
  { src: "/images/diesel-station.jpg", alt: "Estación de diésel", tag: "Energía" },
]

export default function Gallery() {
  return (
    <section className="relative overflow-hidden bg-[#0e1915] py-24">
      <div className="container mx-auto max-w-7xl px-6 text-white">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Galería</h2>
            <p className="mt-3 text-white/70">Haz clic en una imagen para centrarte en ella.</p>
          </div>
        </AnimatedSection>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <motion.figure
              key={img.src}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0b1411]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <div className="relative aspect-[4/3] bg-black">
                <Image src={img.src || "/placeholder.svg"} alt="" fill className="scale-110 object-cover blur-2xl opacity-40" aria-hidden />
                <Image src={img.src || "/placeholder.svg"} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                <FocusImage src={img.src} alt={img.alt} className="absolute inset-0" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm text-white">
                <span className="font-medium drop-shadow">{img.alt}</span>
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-500">{img.tag}</Badge>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
