export function formatPrice(value: number | null, currency: string = "EUR") {
  if (value === null || Number.isNaN(value)) return "Consultar"
  try {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(value)
  } catch {
    return `${value} ${currency}`
  }
}
