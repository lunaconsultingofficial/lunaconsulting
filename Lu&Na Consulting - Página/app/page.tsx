import NavbarPremium from "@/components/navbar-premium"
import HeroPremium from "@/components/hero-premium"
import CredentialsSection from "@/components/credentials-section"
import FeaturedTimelinePremium from "@/components/featured-timeline-premium"
import FooterPremium from "@/components/footer-premium"
import WhatsAppFABPremium from "@/components/whatsapp-fab-premium"

export default function Page() {
  return (
    <main className="relative">
      <NavbarPremium />
      <HeroPremium />
      <CredentialsSection />
      <FeaturedTimelinePremium />
      <FooterPremium />
      <WhatsAppFAB />
    </main>
  )
}
