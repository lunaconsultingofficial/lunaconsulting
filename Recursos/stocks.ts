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
  specs?: Record<string, string | number>
  featured?: boolean
}

export const stocks: StockItem[] = [
  // Luxury cars
  {
    slug: "porsche-cayenne-e-hybrid",
    title: "Porsche Cayenne e‑Hybrid",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "Cayenne e‑Hybrid, black wheels, great condition.",
    images: [
      { src: "/images/porsche-front.jpg", alt: "Porsche Cayenne e‑Hybrid front detail" },
      { src: "/images/porsche-34.jpg", alt: "Porsche Cayenne e‑Hybrid 3/4" },
      { src: "/images/porsche-front2.jpg", alt: "Porsche Cayenne e‑Hybrid front" },
    ],
    featured: true,
  },
  {
    slug: "lamborghini-huracan-spyder-black",
    title: "Lamborghini Huracán Spyder (black)",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "Black Huracán Spyder with LED tail lights. Details on request.",
    images: [
      { src: "/images/lambo-rear-close.jpg", alt: "Huracán rear close-up with LED tail" },
      { src: "/images/lambo-rear-34.jpg", alt: "Huracán black rear 3/4 in foggy road" },
    ],
  },
  {
    slug: "lamborghini-urus-details",
    title: "Lamborghini Urus details",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "Performance wheel and interior controls set.",
    images: [
      { src: "/images/urus-wheel-redrim.jpg", alt: "Urus wheel with red rim" },
      { src: "/images/urus-mode-switch.jpg", alt: "Urus STRADA/SPORT/CORSA switch" },
      { src: "/images/urus-cruise-buttons.jpg", alt: "Urus cruise buttons on wheel" },
      { src: "/images/urus-cluster.jpg", alt: "Urus digital cluster RPM" },
      { src: "/images/urus-badge.jpg", alt: "Lamborghini badge on hood" },
      { src: "/images/urus-console.jpg", alt: "Urus center console P/R/M" },
    ],
  },
  {
    slug: "toyota-landcruiser-300",
    title: "Toyota Land Cruiser 300",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "New LC300 examples. Interior and front view.",
    images: [
      { src: "/images/landcruiser-interior.jpg", alt: "LC300 interior front seats" },
      { src: "/images/landcruiser-front.jpg", alt: "LC300 front view on lot" },
    ],
  },
  {
    slug: "lexus-lx600-70th",
    title: "Lexus LX600 (70th Anniversary)",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "LX600 70th Anniversary – rear and front.",
    images: [
      { src: "/images/lexus-lx600-rear.jpg", alt: "Lexus LX600 70th rear view" },
      { src: "/images/lexus-lx600-front.jpg", alt: "Lexus LX600 F‑Sport front view" },
    ],
  },
  {
    slug: "pure-driving-emotion-porsche-911-carrera",
    title: "Porsche 911 Carrera — Pure driving emotion",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "Unidad Porsche 911 Carrera. Detalles y specs bajo solicitud.",
    images: [{ src: "/silver-porsche-911.png", alt: "Porsche 911 Carrera exterior" }],
  },
  {
    slug: "mercedes-benz",
    title: "Mercedes‑Benz — Selection",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "Selección de unidades Mercedes‑Benz. Configuraciones a confirmar.",
    images: [{ src: "/silver-luxury-sedan.png", alt: "Selección Mercedes‑Benz" }],
  },
  {
    slug: "rolls-royce-phantom-by-mansory-bespoke",
    title: "Rolls‑Royce Phantom by Mansory — Bespoke",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "Oportunidad rara: Phantom personalizado por Mansory.",
    images: [{ src: "/black-mansory-phantom.png", alt: "Phantom by Mansory" }],
  },
  {
    slug: "mercedes-maybach-luxury-redefined",
    title: "Mercedes‑Maybach — Luxury redefined",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "Maybach con lujo redefinido. Disponible bajo solicitud.",
    images: [{ src: "/black-luxury-sedan.png", alt: "Mercedes‑Maybach" }],
  },
  {
    slug: "koenigsegg-jesko-2025-white",
    title: "Koenigsegg Jesko 2025 (White)",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "El pináculo de la ingeniería hypercar. Unidad 2025 blanca.",
    images: [{ src: "/white-jesko-hypercar.png", alt: "Koenigsegg Jesko 2025 white" }],
  },
  {
    slug: "ferrari-daytona-sp3-2024-grigio",
    title: "Ferrari Daytona SP3 2024 (Grigio)",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "Daytona SP3 2024 en acabado Grigio. Serie limitada.",
    images: [{ src: "/placeholder-zp9ay.png", alt: "Ferrari Daytona SP3 2024 Grigio" }],
  },
  {
    slug: "brabus-vehicle-stock-exclusive-opportunity",
    title: "Brabus vehicle stock — Exclusive opportunity",
    category: "Luxury cars",
    price: null,
    currency: "EUR",
    short: "Stock de vehículos Brabus disponible. Consulta unidades.",
    images: [{ src: "/black-brabus-g-wagon.png", alt: "Brabus vehicle stock" }],
  },

  // Real estate
  {
    slug: "villa-night-pool",
    title: "Villa with night pool",
    category: "Real estate",
    price: null,
    currency: "EUR",
    short: "Linear illuminated pool, open terrace and living room.",
    images: [{ src: "/images/pool-night.jpg", alt: "Night pool next to terrace" }],
    featured: true,
  },

  // Inventory (diverse)
  {
    slug: "sitrak-8x4-dumper",
    title: "Sitrak 8x4 Dumper",
    category: "Inventory",
    price: null,
    currency: "EUR",
    short: "8x4 dumper truck, ready to work.",
    images: [
      { src: "/images/sitrak.jpg", alt: "Sitrak 8x4 dumper" },
      { src: "/images/sitrak-side.jpg", alt: "Sitrak 8x4 side view" },
    ],
    featured: true,
  },
  {
    slug: "flart-32-motorboat",
    title: "Flart 32 Hardtop",
    category: "Inventory",
    price: null,
    currency: "EUR",
    short: "Flart 32 sports motorboat, well maintained.",
    images: [
      { src: "/images/boat-exterior.jpg", alt: "Flart 32 at berth" },
      { src: "/images/boat-exterior-2.jpg", alt: "Sports boat at berth, other angle" },
      { src: "/images/boat-stand.jpg", alt: "Boat on yard stand" },
    ],
    featured: true,
  },
  {
    slug: "cat-320e-excavator",
    title: "CAT 320E Excavator",
    category: "Inventory",
    price: null,
    currency: "EUR",
    short: "CAT 320E tracked excavator with bucket.",
    images: [{ src: "/images/cat-320e.jpg", alt: "CAT 320E excavator" }],
    featured: true,
  },
  {
    slug: "daf-tractor-unit-480",
    title: "DAF tractor unit 480",
    category: "Inventory",
    price: null,
    currency: "EUR",
    short: "DAF tractor unit on site. More units available.",
    images: [
      { src: "/images/daf-head.jpg", alt: "DAF tractor unit front" },
    ],
  },
  {
    slug: "for-sale-luxury-yachtan-exclusive-offering-for-discerning-buyers",
    title: "Luxury Yacht — Exclusive offering",
    category: "Inventory",
    price: null,
    currency: "EUR",
    short: "Yate de lujo — oferta exclusiva para compradores exigentes.",
    images: [{ src: "/placeholder-cqkrx.png", alt: "Luxury yacht exterior" }],
  },

  // Aircraft (example)
  {
    slug: "airbus-a321-200",
    title: "Airbus A321-200",
    category: "Aircraft",
    price: null,
    currency: "USD",
    short: "A321-200 available. History under verification.",
    images: [{ src: "/images/airbus-a321.jpg", alt: "A321-200 on runway" }],
  },

  // Commodities (example)
  {
    slug: "teardrop-diamond",
    title: "Teardrop‑cut diamond",
    category: "Commodities",
    price: null,
    currency: "USD",
    short: "Teardrop‑cut diamond. Documentation on request.",
    images: [{ src: "/images/diamond.jpg", alt: "Teardrop cut diamond" }],
  },

  // Institutional loans
  {
    slug: "institutional-loans",
    title: "Institutional loans",
    category: "Institutional loans",
    price: null,
    currency: "EUR",
    short: "Connection with entities for institutional solutions.",
    images: [{ src: "/images/building-pool-night.jpg", alt: "Institutional" }],
  },
]
