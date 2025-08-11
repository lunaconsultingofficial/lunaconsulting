export type StockCategory =
  | "Luxury cars"
  | "Real estate"
  | "Inventory"
  | "Aircraft"
  | "Institutional loans"
  | "Commodities"

export type StockItem = {
  slug: string
  title: string
  category: StockCategory
  price: number | null
  currency?: string
  short: string
  description?: string
  images: { src: string; alt: string }[]
  videos?: string[]
  specs?: Record<string, string | number>
  featured?: boolean
}

export const stocks: StockItem[] = [
  {
    slug: "pure-driving-emotion-porsche-911-carrera",
    title: "Pure Driving Emotion — Porsche 911 Carrera",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are offering a limited opportunity to acquire a Porsche 911 Carrera, now available for private ownership.",
    description: "We are offering a limited opportunity to acquire a Porsche 911 Carrera, now available for private ownership.",
    images: [
      { src: "/website_images/porsche_911_carrera.jpeg", alt: "Porsche 911 Carrera" }
    ],
    videos: [],
    featured: true,
  },
  {
    slug: "mercedes-benz",
    title: "Mercedes-Benz",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are offering the opportunity to privately acquire a Mercedes-Benz, a symbol of refined performance, engineering excellence.",
    description: "We are offering the opportunity to privately acquire a Mercedes-Benz, a symbol of refined performance, engineering excellence,",
    images: [
      { src: "/website_images/mercedes_benz.jpeg", alt: "Mercedes-Benz" }
    ],
    videos: [],
    featured: true,
  },
  {
    slug: "rolls-royce-phantom-by-mansory",
    title: "Rolls-Royce Phantom by Mansory",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are offering a rare opportunity to acquire a bespoke Rolls-Royce Phantom by Mansory.",
    description: "We are offering a rare opportunity to acquire a bespoke Rolls-Royce Phantom by Mansory, now available for private ownership. This is an exclusive chance to possess a vehicle that embodies luxury and craftsmanship.",
    images: [
      { src: "/nadiua_media/07d64327-1469-4591-8dcd-7e63cd34f9a0-1-300x300.jpg", alt: "Rolls-Royce Phantom by Mansory" },
      { src: "/nadiua_media/IMG-20250308-WA0001.jpg", alt: "Rolls-Royce Phantom by Mansory - Interior" },
      { src: "/nadiua_media/IMG-20250308-WA0002.jpg", alt: "Rolls-Royce Phantom by Mansory - Detail" },
      { src: "/nadiua_media/IMG-20250308-WA0003.jpg", alt: "Rolls-Royce Phantom by Mansory - Side view" },
      { src: "/nadiua_media/IMG-20250308-WA0004.jpg", alt: "Rolls-Royce Phantom by Mansory - Front" },
      { src: "/nadiua_media/IMG-20250308-WA0005.jpg", alt: "Rolls-Royce Phantom by Mansory - Rear" },
      { src: "/nadiua_media/IMG-20250523-WA0031.jpg", alt: "Rolls-Royce Phantom by Mansory - Engine bay" },
      { src: "/nadiua_media/IMG-20250523-WA0032.jpg", alt: "Rolls-Royce Phantom by Mansory - Interior detail" },
      { src: "/nadiua_media/IMG-20250523-WA0033.jpg", alt: "Rolls-Royce Phantom by Mansory - Dashboard" }
    ],
    videos: [
      "/nadiua_media/2025-03-09-223652819 - copia.mp4",
      "/nadiua_media/VID-20250308-WA0066 - copia.mp4",
      "/nadiua_media/VID-20250308-WA0066.mp4",
      "/nadiua_media/VID-20250705-WA0051.mp4"
    ],
    featured: true,
  },
  {
    slug: "mercedes-maybach-luxury-redefined",
    title: "Mercedes-Maybach — Luxury Redefined",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are pleased to offer a Mercedes-Maybach for private sale — a symbol of absolute comfort, craftsmanship.",
    description: "We are pleased to offer a Mercedes-Maybach for private sale — a symbol of absolute comfort, craftsmanship,",
    images: [
      { src: "/website_images/mercedes_maybach.png", alt: "Mercedes-Maybach" }
    ],
    videos: [],
  },
  {
    slug: "luxury-yacht-exclusive-offering",
    title: "Luxury Yacht — An Exclusive Offering for Discerning Buyers",
    category: "Inventory",
    price: null,
    currency: "EUR",
    short: "We are offering a prestigious luxury yacht for sale, available now for private acquisition.",
    description: "We are offering a prestigious luxury yacht for sale, available now for private acquisition. This is a",
    images: [
      { src: "/website_images/luxury_yacht.png", alt: "Luxury Yacht" }
    ],
    videos: [],
  },
  {
    slug: "koenigsegg-jesko-2025-white",
    title: "2025 Koenigsegg Jesko (White) — The Pinnacle of Hypercar Engineering",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are pleased to present an exclusive opportunity to acquire a 2025 Koenigsegg Jesko, finished in white.",
    description: "We are pleased to present an exclusive opportunity to acquire a 2025 Koenigsegg Jesko, finished in a",
    images: [
      { src: "/website_images/koenigsegg_jesko.png", alt: "2025 Koenigsegg Jesko White" }
    ],
    videos: [
      "/nadiua_media/2025-03-09-223652819.mp4"
    ],
  },
  {
    slug: "ferrari-daytona-sp3-2024-grigio",
    title: "2024 Ferrari Daytona SP3 (Grigio Finish)",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "A Masterpiece from Ferrari's Exclusive Icona Series. We are offering an exceptional opportunity to acquire a 2024.",
    description: "A Masterpiece from Ferrari's Exclusive Icona Series We are offering an exceptional opportunity to acquire a 2024",
    images: [
      { src: "/website_images/ferrari_daytona_sp3.jpeg", alt: "2024 Ferrari Daytona SP3 Grigio" }
    ],
    videos: [],
  },
  {
    slug: "brabus-vehicle-stock-exclusive-opportunity",
    title: "Brabus Vehicle Stock — Exclusive Opportunity",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are currently seeking a qualified buyer for an exclusive stock of Brabus-enhanced vehicles.",
    description: "We are currently seeking a qualified buyer for an exclusive stock of Brabus-enhanced vehicles, built on premium",
    images: [
      { src: "/website_images/brabus_vehicle_stock.jpeg", alt: "Brabus Vehicle Stock" }
    ],
    videos: [],
  },
]
