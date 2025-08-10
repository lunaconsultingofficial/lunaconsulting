import Link from "next/link"
import { MessageCircle, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="text-lg font-semibold">Lu&Na Consulting</div>
            <p className="mt-2 max-w-md text-muted-foreground">
              Intermediación B2B: enlazamos compradores y vendedores verificados.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <a
                href="tel:+34642040091"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-white/80 transition hover:bg-white/10"
                aria-label="Call"
              >
                <Phone className="h-4 w-4 text-emerald-300" /> Call
              </a>
              <a
                href="https://wa.me/34642040091"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-200 transition hover:bg-emerald-500/15"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
          <div className="sm:justify-self-end">
            <nav className="flex flex-wrap gap-4 text-sm">
              <Link href="#featured" className="hover:underline">
                Featured
              </Link>
              <Link href="/stocks" className="hover:underline">
                Stocks
              </Link>
              <Link href="/services" className="hover:underline">
                Más Servicios
              </Link>
              <Link href="#contact" className="hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lu&Na Consulting. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
