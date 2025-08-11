import NavbarPremium from "@/components/navbar-premium"
import HeroPremium from "@/components/hero-premium"
import CredentialsSection from "@/components/credentials-section"
import FeaturedTimelinePremium from "@/components/featured-timeline-premium"
import Footer from "@/components/footer"
import WhatsAppFAB from "@/components/whatsapp-fab"

export default function Page() {
  return (
    <main className="relative">
      <NavbarPremium />
      <HeroPremium />
      <CredentialsSection />
      <FeaturedTimelinePremium />
      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
