export type StockCategory =
  | "Coches de lujo"
  | "Bienes raíces"
  | "Bienes"
  | "Aeronaves"
  | "Otros"

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
  // COCHES DE LUJO
  {
    slug: "ferrari-collection",
    title: "Ferrari Collection",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Exclusiva colección de Ferrari disponible. Modelos selectos en condiciones impecables.",
    images: [
      { src: "/images/ferrari-daytona-sp3-grigio.png", alt: "Ferrari rojo en exhibición" },
      { src: "/placeholder-zp9ay.png", alt: "Ferrari detalle frontal" }
    ],
    featured: true,
  },
  {
    slug: "lamborghini-collection",
    title: "Lamborghini Collection",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Impresionante colección Lamborghini. Vehículos de alto rendimiento y diseño excepcional.",
    images: [
      { src: "/images/lambo-rear-close.jpg", alt: "Lamborghini amarillo" },
      { src: "/images/lambo-rear-34.jpg", alt: "Lamborghini vista posterior" }
    ],
    featured: true,
  },
  {
    slug: "lamborghini-urus-premium",
    title: "Lamborghini Urus Premium",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Lamborghini Urus en configuración premium. El SUV más exclusivo del mercado.",
    images: [
      { src: "/images/urus-wheel-redrim.jpg", alt: "Lamborghini Urus frontal" },
      { src: "/images/urus-mode-switch.jpg", alt: "Lamborghini Urus lateral" },
      { src: "/images/urus-console.jpg", alt: "Lamborghini Urus interior" }
    ],
    featured: true,
  },
  {
    slug: "porsche-collection",
    title: "Porsche Collection",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Selecta colección Porsche. Ingeniería alemana de precisión y diseño atemporal.",
    images: [
      { src: "/images/porsche-front.jpg", alt: "Porsche 911 plateado" },
      { src: "/images/porsche-34.jpg", alt: "Porsche vista frontal" },
      { src: "/silver-porsche-911.png", alt: "Porsche 911 Carrera" }
    ],
    featured: true,
  },
  {
    slug: "mercedes-benz-s-class",
    title: "Mercedes-Benz S-Class",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Mercedes-Benz Clase S. El estándar del lujo y la comodidad en sedanes premium.",
    images: [
      { src: "/silver-luxury-sedan.png", alt: "Mercedes S-Class negro" },
      { src: "/black-luxury-sedan.png", alt: "Mercedes S-Class lateral" }
    ],
  },
  {
    slug: "mercedes-benz-gls",
    title: "Mercedes-Benz GLS",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Mercedes-Benz GLS. SUV de lujo con capacidad para 7 pasajeros y tecnología avanzada.",
    images: [
      { src: "/images/building-pool-night.jpg", alt: "Mercedes GLS blanco" }
    ],
  },
  {
    slug: "rolls-royce-cullinan",
    title: "Rolls-Royce Cullinan",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Rolls-Royce Cullinan. El pináculo del lujo en SUV con artesanía británica excepcional.",
    images: [
      { src: "/black-mansory-phantom.png", alt: "Rolls-Royce Cullinan negro" }
    ],
  },
  {
    slug: "brabus-g800",
    title: "Brabus G800",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Brabus G800. Mercedes G-Class modificado por Brabus con 800 CV de potencia.",
    images: [
      { src: "/black-brabus-g-wagon.png", alt: "Brabus G800 negro" }
    ],
  },
  {
    slug: "koenigsegg-jesko",
    title: "Koenigsegg Jesko 2025",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "El pináculo de la ingeniería hypercar. Unidad 2025 blanca exclusiva.",
    images: [
      { src: "/white-jesko-hypercar.png", alt: "Koenigsegg Jesko blanco" }
    ],
  },
  {
    slug: "lexus-lx600",
    title: "Lexus LX600",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Lexus LX600. SUV de lujo japonés con fiabilidad excepcional y confort premium.",
    images: [
      { src: "/images/lexus-lx600-rear.jpg", alt: "Lexus LX600 blanco" },
      { src: "/images/lexus-lx600-front.jpg", alt: "Lexus LX600 perfil" }
    ],
  },
  {
    slug: "toyota-land-cruiser",
    title: "Toyota Land Cruiser",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Toyota Land Cruiser. Legendario todoterreno con capacidades off-road excepcionales.",
    images: [
      { src: "/images/landcruiser-interior.jpg", alt: "Toyota Land Cruiser blanco" },
      { src: "/images/landcruiser-front.jpg", alt: "Toyota Land Cruiser frontal" }
    ],
  },

  // BIENES RAÍCES
  {
    slug: "villa-moderna-piscina",
    title: "Villa Moderna con Piscina",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Espectacular villa moderna con piscina iluminada y vistas panorámicas.",
    images: [
      { src: "/images/pool-night.jpg", alt: "Villa moderna con piscina iluminada" },
      { src: "/images/building-pool-night.jpg", alt: "Vista nocturna piscina moderna" }
    ],
    featured: true,
  },
  {
    slug: "villa-lujo-nocturna",
    title: "Villa de Lujo Nocturna",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Elegante villa de lujo con iluminación arquitectónica nocturna destacada.",
    images: [
      { src: "/images/villa-night.jpg", alt: "Villa de lujo iluminada de noche" }
    ],
    featured: true,
  },
  {
    slug: "residencia-exclusiva",
    title: "Residencia Exclusiva",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Residencia exclusiva con diseño contemporáneo y acabados de primera calidad.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=luxury-residence", alt: "Residencia exclusiva" }
    ],
  },

  // BIENES
  {
    slug: "jet-privado-ejecutivo",
    title: "Jet Privado Ejecutivo",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Jet privado ejecutivo en impecable estado. Ideal para viajes corporativos y de lujo.",
    images: [
      { src: "/images/airbus-a321.jpg", alt: "Jet privado ejecutivo" }
    ],
    featured: true,
  },
  {
    slug: "yate-lujo-premium",
    title: "Yate de Lujo Premium",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Espectacular yate de lujo con todas las comodidades para navegación exclusiva.",
    images: [
      { src: "/images/boat-exterior.jpg", alt: "Yate de lujo en puerto" },
      { src: "/images/boat-exterior-2.jpg", alt: "Vista del yate desde el agua" },
      { src: "/placeholder-cqkrx.png", alt: "Yate de lujo lateral" }
    ],
    featured: true,
  },
  {
    slug: "flart-32-motorboat",
    title: "Flart 32 Hardtop",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Flart 32 sports motorboat, bien mantenido y listo para navegación.",
    images: [
      { src: "/images/boat-stand.jpg", alt: "Flart 32 en puerto" }
    ],
  },
  {
    slug: "rolex-collection",
    title: "Colección Rolex",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Exclusiva colección de relojes Rolex. Piezas de colección y modelos limitados.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=rolex-watch", alt: "Reloj Rolex dorado" }
    ],
  },
  {
    slug: "patek-philippe",
    title: "Patek Philippe",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Exquisito reloj Patek Philippe. Joyería suiza de la más alta calidad y prestigio.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=patek-philippe", alt: "Reloj Patek Philippe" }
    ],
  },
  {
    slug: "excavadora-cat-320e",
    title: "Excavadora CAT 320E",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Excavadora Caterpillar 320E en excelente estado. Ideal para proyectos de construcción.",
    images: [
      { src: "/images/cat-320e.jpg", alt: "Excavadora CAT 320E" }
    ],
  },
  {
    slug: "sitrak-dumper",
    title: "Sitrak 8x4 Dumper",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Camión volquete Sitrak 8x4 resistente para transporte pesado y uso industrial.",
    images: [
      { src: "/images/sitrak.jpg", alt: "Sitrak 8x4 dumper" },
      { src: "/images/sitrak-side.jpg", alt: "Vista lateral Sitrak" }
    ],
  },
  {
    slug: "daf-trucks",
    title: "Camiones DAF",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Flota de camiones DAF para transporte comercial y logística empresarial.",
    images: [
      { src: "/images/daf-head.jpg", alt: "Camión DAF" }
    ],
  },
  {
    slug: "diamante-inversion",
    title: "Diamante de Inversión",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Diamante de alta calidad con certificación gemológica. Inversión exclusiva.",
    images: [
      { src: "/images/diamond.jpg", alt: "Diamante brillante" }
    ],
  },

  // AERONAVES
  {
    slug: "airbus-a321",
    title: "Airbus A321-200",
    category: "Aeronaves",
    price: null,
    currency: "USD",
    short: "Airbus A321-200 en excelentes condiciones para uso charter o línea aérea.",
    images: [
      { src: "/images/airbus-a321.jpg", alt: "Airbus A321 en pista" }
    ],
  },

  // OTROS
  {
    slug: "portfolio-diverso",
    title: "Portfolio Diverso",
    category: "Otros",
    price: null,
    currency: "EUR",
    short: "Selección diversa de activos y oportunidades de inversión únicas.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=investment-portfolio", alt: "Portfolio diverso" }
    ],
  }
]
