import NavbarPremium from "@/components/navbar-premium"
import StockGridHybrid from "@/components/stock-grid-hybrid"
import FooterPremium from "@/components/footer-premium"
import WhatsAppFABPremium from "@/components/whatsapp-fab-premium"

export default function StocksPage() {
  return (
    <main className="relative">
      <NavbarPremium />
      <StockGridHybrid />
      <FooterPremium />
      <WhatsAppFABPremium />
    </main>
  )
}
