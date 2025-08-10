import StockGrid from "@/components/stock-grid"
import WhatsAppFAB from "@/components/whatsapp-fab"

export default function StocksPage() {
  // Mantiene el mismo fondo (BackgroundVisual ya está aplicado globalmente en layout)
  return (
    <>
      <StockGrid />
      <WhatsAppFAB />
    </>
  )
}
