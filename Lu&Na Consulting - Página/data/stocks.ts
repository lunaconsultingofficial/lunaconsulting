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
    slug: "porsche-911-carrera-pure-driving-emotion",
    title: "Pure Driving Emotion — Porsche 911 Carrera",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are offering a limited opportunity to acquire a Porsche 911 Carrera, now available for private ownership.",
    description: "We are offering a limited opportunity to acquire a Porsche 911 Carrera, now available for private ownership. This iconic sports car represents the pinnacle of German engineering and automotive excellence.",
    images: [
      { src: "/website_images/porsche_911_carrera.jpeg", alt: "Porsche 911 Carrera - Pure Driving Emotion" }
    ],
    videos: [],
    featured: true,
  },
  {
    slug: "mercedes-benz-refined-performance",
    title: "Mercedes-Benz",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are offering the opportunity to privately acquire a Mercedes-Benz, a symbol of refined performance, engineering excellence.",
    description: "We are offering the opportunity to privately acquire a Mercedes-Benz, a symbol of refined performance, engineering excellence, and luxury that has defined automotive standards for generations.",
    images: [
      { src: "/website_images/mercedes_benz.jpeg", alt: "Mercedes-Benz - Refined Performance" }
    ],
    videos: [],
    featured: true,
  },
  {
    slug: "rolls-royce-phantom-mansory-bespoke",
    title: "Rolls-Royce Phantom by Mansory",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are offering a rare opportunity to acquire a bespoke Rolls-Royce Phantom by Mansory.",
    description: "We are offering a rare opportunity to acquire a bespoke Rolls-Royce Phantom by Mansory, now available for private ownership. This is an exclusive chance to possess a vehicle that embodies luxury and craftsmanship at the highest level.",
    images: [
      { src: "/nadiua_media/07d64327-1469-4591-8dcd-7e63cd34f9a0-1-300x300.jpg", alt: "Rolls-Royce Phantom by Mansory" },
      { src: "/nadiua_media/IMG-20250308-WA0001.jpg", alt: "Rolls-Royce Phantom - Interior Detail" },
      { src: "/nadiua_media/IMG-20250308-WA0002.jpg", alt: "Rolls-Royce Phantom - Luxury Seating" },
      { src: "/nadiua_media/IMG-20250308-WA0003.jpg", alt: "Rolls-Royce Phantom - Side Profile" },
      { src: "/nadiua_media/IMG-20250308-WA0004.jpg", alt: "Rolls-Royce Phantom - Front View" },
      { src: "/nadiua_media/IMG-20250308-WA0005.jpg", alt: "Rolls-Royce Phantom - Rear View" },
      { src: "/nadiua_media/IMG-20250308-WA0060.jpg", alt: "Rolls-Royce Phantom - Detail Shot" },
      { src: "/nadiua_media/IMG-20250308-WA0061.jpg", alt: "Rolls-Royce Phantom - Interior" },
      { src: "/nadiua_media/IMG-20250308-WA0062.jpg", alt: "Rolls-Royce Phantom - Dashboard" },
      { src: "/nadiua_media/IMG-20250308-WA0063.jpg", alt: "Rolls-Royce Phantom - Controls" },
      { src: "/nadiua_media/IMG-20250308-WA0064.jpg", alt: "Rolls-Royce Phantom - Premium Features" },
      { src: "/nadiua_media/IMG-20250308-WA0065.jpg", alt: "Rolls-Royce Phantom - Luxury Detail" },
      { src: "/nadiua_media/IMG-20250316-WA0023.jpg", alt: "Rolls-Royce Phantom - Exterior" },
      { src: "/nadiua_media/IMG-20250316-WA0027.jpg", alt: "Rolls-Royce Phantom - Side View" },
      { src: "/nadiua_media/IMG-20250316-WA0030.jpg", alt: "Rolls-Royce Phantom - Front Detail" },
      { src: "/nadiua_media/IMG-20250523-WA0031.jpg", alt: "Rolls-Royce Phantom - Engine Bay" },
      { src: "/nadiua_media/IMG-20250523-WA0032.jpg", alt: "Rolls-Royce Phantom - Interior Luxury" },
      { src: "/nadiua_media/IMG-20250523-WA0033.jpg", alt: "Rolls-Royce Phantom - Dashboard Detail" }
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
    description: "We are pleased to offer a Mercedes-Maybach for private sale — a symbol of absolute comfort, craftsmanship, and unparalleled luxury. This vehicle represents the pinnacle of automotive excellence and refined sophistication.",
    images: [
      { src: "/website_images/mercedes_maybach.png", alt: "Mercedes-Maybach - Luxury Redefined" }
    ],
    videos: [],
    featured: false,
  },
  {
    slug: "luxury-yacht-exclusive-offering",
    title: "Luxury Yacht — An Exclusive Offering for Discerning Buyers",
    category: "Inventory",
    price: null,
    currency: "EUR",
    short: "We are offering a prestigious luxury yacht for sale, available now for private acquisition.",
    description: "We are offering a prestigious luxury yacht for sale, available now for private acquisition. This is an exceptional opportunity for discerning buyers who appreciate the finest in maritime luxury and craftsmanship.",
    images: [
      { src: "/website_images/luxury_yacht.png", alt: "Luxury Yacht - Exclusive Offering" }
    ],
    videos: [],
    featured: true,
  },
  {
    slug: "koenigsegg-jesko-2025-white-hypercar",
    title: "2025 Koenigsegg Jesko (White) — The Pinnacle of Hypercar Engineering",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are pleased to present an exclusive opportunity to acquire a 2025 Koenigsegg Jesko, finished in pristine white.",
    description: "We are pleased to present an exclusive opportunity to acquire a 2025 Koenigsegg Jesko, finished in a stunning white livery. This represents the pinnacle of hypercar engineering and Swedish automotive innovation.",
    images: [
      { src: "/website_images/koenigsegg_jesko.png", alt: "2025 Koenigsegg Jesko White - The Pinnacle of Hypercar Engineering" }
    ],
    videos: [
      "/nadiua_media/2025-03-09-223652819.mp4"
    ],
    featured: true,
  },
  {
    slug: "ferrari-daytona-sp3-2024-grigio",
    title: "2024 Ferrari Daytona SP3 (Grigio Finish)",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "A Masterpiece from Ferrari's Exclusive Icona Series. We are offering an exceptional opportunity to acquire a 2024 Ferrari Daytona SP3.",
    description: "A Masterpiece from Ferrari's Exclusive Icona Series. We are offering an exceptional opportunity to acquire a 2024 Ferrari Daytona SP3 in sophisticated Grigio finish. This limited-edition supercar represents Ferrari's heritage and cutting-edge technology.",
    images: [
      { src: "/website_images/ferrari_daytona_sp3.jpeg", alt: "2024 Ferrari Daytona SP3 Grigio Finish" }
    ],
    videos: [],
    featured: false,
  },
  {
    slug: "brabus-vehicle-stock-exclusive",
    title: "Brabus Vehicle Stock — Exclusive Opportunity",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "We are currently seeking a qualified buyer for an exclusive stock of Brabus-enhanced vehicles.",
    description: "We are currently seeking a qualified buyer for an exclusive stock of Brabus-enhanced vehicles, built on premium Mercedes-Benz platforms. These vehicles represent the ultimate in performance tuning and luxury enhancement.",
    images: [
      { src: "/website_images/brabus_vehicle_stock.jpeg", alt: "Brabus Vehicle Stock - Exclusive Opportunity" }
    ],
    videos: [],
    featured: false,
  },
]
