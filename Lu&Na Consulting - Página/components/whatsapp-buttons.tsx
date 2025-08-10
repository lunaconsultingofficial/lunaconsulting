"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Share2 } from 'lucide-react'

function buildMessage(itemTitle?: string, context?: string) {
  const ref = context ? `[${context}] ${itemTitle || "oportunidad"}` : itemTitle || "oportunidad"
  return `Hola, estoy interesad@ en ${ref}. ¿Podríais enviarme más información?`
}

export default function WhatsAppButtons({
  itemTitle,
  context,
  phoneE164 = "34642040091",
  compact = true,
}: {
  itemTitle?: string
  context?: string
  phoneE164?: string
  compact?: boolean
}) {
  const size = compact ? "sm" : "default"
  const message = buildMessage(itemTitle, context)

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneE164}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const callPhone = () => {
    window.location.href = `tel:+${phoneE164}`
  }

  const share = async () => {
    const data = { title: "WhatsApp", text: message }
    // @ts-expect-error Web Share API condicional
    if (navigator?.share) {
      try {
        await navigator.share(data)
        return
      } catch {}
    }
    const generic = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(generic, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size={size} className="bg-emerald-600 hover:bg-emerald-500" onClick={openWhatsApp}>
        <MessageCircle className="mr-2 h-4 w-4" />
        WhatsApp
      </Button>
      <Button
        size={size}
        variant="outline"
        className="border-white/30 bg-transparent text-white hover:bg-white/10"
        onClick={callPhone}
      >
        <Phone className="mr-2 h-4 w-4" />
        Llamar
      </Button>
      <Button
        size={size}
        variant="secondary"
        className="bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25"
        onClick={share}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Compartir
      </Button>
    </div>
  )
}
