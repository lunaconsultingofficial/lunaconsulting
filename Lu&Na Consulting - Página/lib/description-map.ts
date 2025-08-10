export function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
}

export function buildDescriptionMap(markdown: string) {
  // Genera un mapa por heurística: busca líneas con títulos y acumula párrafos siguientes.
  // Funciona con .md o texto plano exportado del blog.
  const map = new Map<string, string>()
  if (!markdown?.trim()) return map
  const lines = markdown.split(/\r?\n/)
  let currentTitle = ""
  let buffer: string[] = []

  const flush = () => {
    if (currentTitle && buffer.length) {
      const key = normalize(currentTitle)
      const text = buffer.join("\n").trim()
      if (text) map.set(key, text)
    }
    buffer = []
  }

  for (const raw of lines) {
    const line = raw.trim()
    const looksLikeTitle =
      /^#{1,6}\s+/.test(line) || // # Título
      /^(For Sale|Exclusive|Pure Driving Emotion|Mercedes|Ferrari|Koenigsegg|Brabus|Luxury Yacht|Rolls|Porsche)/i.test(
        line,
      )
    if (looksLikeTitle) {
      flush()
      currentTitle = line.replace(/^#{1,6}\s+/, "")
      continue
    }
    buffer.push(raw)
  }
  flush()
  return map
}

export function pickDescriptionFor(title: string, map: Map<string, string>) {
  if (!title) return undefined
  const key = normalize(title)
  if (map.has(key)) return map.get(key)
  // Coincidencia aproximada: empieza por o incluye
  for (const [k, v] of map.entries()) {
    if (key.startsWith(k) || k.startsWith(key) || k.includes(key) || key.includes(k)) return v
  }
  return undefined
}
