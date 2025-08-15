import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import FeaturedTimeline from "@/components/featured-timeline-static"
import Footer from "@/components/footer"
import WhatsAppFAB from "@/components/whatsapp-fab"

// Force clear cache and ensure original components are used

export default function Page() {
  // Home SIN secciones de Trading, Crypto ni Direct Contact
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <FeaturedTimeline />
      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
