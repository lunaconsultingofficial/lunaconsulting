import NavbarPremium from "@/components/navbar-premium"
import StockGridPremium from "@/components/stock-grid-premium"
import FooterPremium from "@/components/footer-premium"
import WhatsAppFABPremium from "@/components/whatsapp-fab-premium"

export default function StocksPage() {
  return (
    <main className="relative">
      <NavbarPremium />
      <StockGridPremium />
      <FooterPremium />
      <WhatsAppFABPremium />
    </main>
  )
}
