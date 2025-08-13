import NavbarPremium from "@/components/navbar-premium"
import HeroPremium from "@/components/hero-premium"
import CredentialsSection from "@/components/credentials-section"
import FeaturedTimelineFixed from "@/components/featured-timeline-fixed"
import FooterPremium from "@/components/footer-premium"
import WhatsAppFABPremium from "@/components/whatsapp-fab-premium"

export default function Page() {
  return (
    <main className="relative">
      <NavbarPremium />
      <HeroPremium />
      <CredentialsSection />
      <FeaturedTimelineFixed />
      <FooterPremium />
      <WhatsAppFABPremium />
    </main>
  )
}
