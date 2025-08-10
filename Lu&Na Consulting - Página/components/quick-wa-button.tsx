"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from "@/lib/wa"

export default function QuickWAButton({
  phoneE164,
  message,
  label,
  size = "sm",
}: {
  phoneE164: string
  message: string
  label?: string
  size?: "sm" | "default" | "lg"
}) {
  const href = buildWhatsAppUrl(phoneE164, message)
  return (
    <Button asChild size={size} className="bg-emerald-600 hover:bg-emerald-500">
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${label ?? ""}`}>
        <MessageCircle className="mr-2 h-4 w-4" />
        {label ?? "WhatsApp"}
      </a>
    </Button>
  )
}
