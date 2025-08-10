import { MessageCircle, Phone } from 'lucide-react'

export default function ContactStrip() {
  return (
    <section id="contact" className="relative border-t border-white/10 bg-[#0e1915] py-12 text-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mx-auto grid max-w-4xl items-center gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <h3 className="text-xl font-semibold">Direct contact</h3>
            <p className="text-white/70">We answer on the spot by phone or WhatsApp.</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <a
              href="tel:+34642040091"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
              aria-label="Call"
            >
              <Phone className="h-4 w-4 text-emerald-300" />
              Call
            </a>
            <a
              href="https://wa.me/34642040091"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 transition hover:bg-emerald-500/15"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
