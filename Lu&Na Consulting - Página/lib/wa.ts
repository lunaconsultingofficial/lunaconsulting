export function buildWhatsAppUrl(phoneE164: string, text: string) {
  return `https://wa.me/${phoneE164}?text=${encodeURIComponent(text)}`
}

export function buildProductMessage({
  title,
  category,
  url,
  intent = "consulta",
}: {
  title: string
  category?: string
  url?: string
  intent?: "consulta" | "estado" | "comprar"
}) {
  const ref = category ? `[${category}] ${title}` : title
  const base =
    intent === "estado"
      ? `Hola, ¿sigue disponible ${ref}?`
      : intent === "comprar"
      ? `Hola, quiero comprar ${ref}. ¿Cuáles son los próximos pasos?`
      : `Hola, estoy interesad@ en ${ref}. ¿Podríais enviarme más información?`
  return url ? `${base} ${url}` : base
}
