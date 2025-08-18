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
  // COCHES DE LUJO (19 items)
  {
    slug: "ferrari-collection",
    title: "Ferrari Collection",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Exclusiva colección de Ferrari. Superdeportivo de alta gama con ingeniería excepcional y diseño icónico.",
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
    short: "Impresionante colección Lamborghini. Vehículos de alto rendimiento con diseño agresivo y tecnología avanzada.",
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
    short: "SUV deportivo Lamborghini Urus. El SUV más exclusivo del mercado con 650 CV de potencia.",
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
    short: "Selecta colección Porsche. Ingeniería alemana de precisión con el legendario motor boxer.",
    images: [
      { src: "/images/porsche-front.jpg", alt: "Porsche 911 plateado" },
      { src: "/images/porsche-34.jpg", alt: "Porsche vista frontal" },
      { src: "/silver-porsche-911.png", alt: "Porsche 911 Carrera" }
    ],
    featured: true,
  },
  {
    slug: "brabus-g800",
    title: "Brabus G800",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Mercedes G-Class modificado por Brabus con 800 CV. El G-Wagon más potente del mundo.",
    images: [
      { src: "/black-brabus-g-wagon.png", alt: "Brabus G800 negro" }
    ],
  },
  {
    slug: "bugatti-exclusive",
    title: "Bugatti Exclusive",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Hipercoche Bugatti con ingeniería extraordinaria. Velocidad máxima superior a 400 km/h.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=bugatti-hypercar", alt: "Bugatti azul y negro" }
    ],
  },
  {
    slug: "mercedes-benz-s-class",
    title: "Mercedes-Benz S-Class",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Sedán de lujo Mercedes-Benz Clase S. El estándar mundial en comodidad y tecnología.",
    images: [
      { src: "/silver-luxury-sedan.png", alt: "Mercedes S-Class plateado" },
      { src: "/black-luxury-sedan.png", alt: "Mercedes S-Class negro" }
    ],
  },
  {
    slug: "mercedes-benz-gls",
    title: "Mercedes-Benz GLS",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "SUV de lujo Mercedes-Benz GLS. Capacidad para 7 pasajeros con lujo de clase S.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=mercedes-gls", alt: "Mercedes GLS blanco" }
    ],
  },
  {
    slug: "mercedes-benz-e-class",
    title: "Mercedes-Benz E-Class",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Sedán ejecutivo Mercedes-Benz Clase E. Elegancia y tecnología para el ejecutivo moderno.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=mercedes-e-class", alt: "Mercedes E-Class azul" }
    ],
  },
  {
    slug: "rolls-royce-cullinan",
    title: "Rolls-Royce Cullinan",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "SUV de ultra lujo Rolls-Royce Cullinan. El pináculo del lujo británico con artesanía excepcional.",
    images: [
      { src: "/black-mansory-phantom.png", alt: "Rolls-Royce Cullinan negro" }
    ],
  },
  {
    slug: "rolls-royce-interior",
    title: "Rolls-Royce Interior Premium",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Interior de lujo Rolls-Royce con acabados artesanales y materiales premium.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=rolls-royce-interior", alt: "Interior Rolls-Royce" }
    ],
  },
  {
    slug: "lexus-lx600",
    title: "Lexus LX600",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "SUV de lujo japonés Lexus LX600. Fiabilidad Toyota con lujo Lexus.",
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
    short: "Legendario todoterreno Toyota Land Cruiser. Capacidades off-road incomparables.",
    images: [
      { src: "/images/landcruiser-interior.jpg", alt: "Toyota Land Cruiser interior" },
      { src: "/images/landcruiser-front.jpg", alt: "Toyota Land Cruiser frontal" }
    ],
  },
  {
    slug: "audi-q8",
    title: "Audi Q8",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "SUV coupé Audi Q8 con diseño vanguardista y tecnología quattro integral.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=audi-q8", alt: "Audi Q8 gris" }
    ],
  },
  {
    slug: "volkswagen-golf-gti",
    title: "Volkswagen Golf GTI",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "El icónico hot hatch alemán Golf GTI con prestaciones deportivas legendarias.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=golf-gti", alt: "Golf GTI rojo" }
    ],
  },
  {
    slug: "camiones-daf",
    title: "Camiones DAF",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Flota de camiones comerciales DAF para transporte pesado y logística empresarial.",
    images: [
      { src: "/images/daf-head.jpg", alt: "Camión DAF" }
    ],
  },
  {
    slug: "coches-stock-general",
    title: "Vehículos en Stock",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Selección diversa de vehículos disponibles en nuestro inventario exclusivo.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=luxury-cars-stock", alt: "Coches en stock" }
    ],
  },
  {
    slug: "interior-lujo-asientos",
    title: "Interior de Lujo Bicolor",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Interior de coche de lujo con asientos bicolor rojo y negro, acabados premium.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=luxury-car-interior", alt: "Interior lujo bicolor" }
    ],
  },
  {
    slug: "mercedes-interior-premium",
    title: "Mercedes-Benz Interior Premium",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Interior Mercedes-Benz con tecnología de vanguardia y materiales premium.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=mercedes-interior", alt: "Interior Mercedes premium" }
    ],
  },

  // BIENES RAÍCES (9 items)
  {
    slug: "casa-moderna-piscina-noche",
    title: "Casa Moderna con Piscina Nocturna",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Espectacular casa moderna con piscina iluminada. Arquitectura contemporánea con vistas panorámicas.",
    images: [
      { src: "/images/pool-night.jpg", alt: "Casa moderna con piscina iluminada" },
      { src: "/images/building-pool-night.jpg", alt: "Vista nocturna piscina moderna" }
    ],
    featured: true,
  },
  {
    slug: "casa-moderna-piscina-aerea",
    title: "Casa Moderna - Vista Aérea",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Impresionante vista aérea de casa moderna con piscina y diseño arquitectónico excepcional.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=modern-house-aerial", alt: "Vista aérea casa moderna" }
    ],
    featured: true,
  },
  {
    slug: "casa-grande-patio",
    title: "Casa Grande con Patio",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Amplia casa familiar con extenso patio. Espacios exteriores perfectamente diseñados.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=large-house-patio", alt: "Casa grande con patio" }
    ],
  },
  {
    slug: "casa-moderna-noche",
    title: "Casa Moderna de Noche",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Elegante casa moderna con iluminación arquitectónica nocturna que resalta su diseño.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=modern-house-night", alt: "Casa moderna iluminada" }
    ],
  },
  {
    slug: "casa-noche-residencial",
    title: "Casa Residencial Nocturna",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Hermosa residencia con iluminación nocturna que destaca su arquitectura elegante.",
    images: [
      { src: "/images/villa-night.jpg", alt: "Casa residencial nocturna" }
    ],
  },
  {
    slug: "complejo-residencial-costero",
    title: "Complejo Residencial Costero",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Exclusivo desarrollo residencial en primera línea de costa con vistas al mar.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=coastal-residential", alt: "Complejo costero" }
    ],
  },
  {
    slug: "edificio-piscina-noche",
    title: "Edificio con Piscina Nocturna",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Moderno edificio residencial con piscina iluminada y amenidades de lujo.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=building-pool-night", alt: "Edificio con piscina" }
    ],
  },
  {
    slug: "edificio-piscinas-multiples",
    title: "Edificio con Múltiples Piscinas",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Complejo residencial de lujo con múltiples piscinas e instalaciones recreativas.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=building-multiple-pools", alt: "Edificio múltiples piscinas" }
    ],
  },
  {
    slug: "casas-construccion",
    title: "Casas en Construcción",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Proyecto de construcción de casas modernas en desarrollo con entrega programada.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=houses-construction", alt: "Casas en construcción" }
    ],
  },

  // BIENES (24 items)
  {
    slug: "avion-alto-rendimiento",
    title: "Avión de Alto Rendimiento",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Avión de alto rendimiento para vuelos privados con tecnología aeronáutica avanzada.",
    images: [
      { src: "/images/airbus-a321.jpg", alt: "Avión en pista" }
    ],
    featured: true,
  },
  {
    slug: "jet-privado-blanco",
    title: "Jet Privado Blanco",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Jet privado ejecutivo color blanco. Ideal para viajes corporativos de alto nivel.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=white-private-jet", alt: "Jet privado blanco" }
    ],
    featured: true,
  },
  {
    slug: "jet-privado-negro",
    title: "Jet Privado Negro",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Elegante jet privado negro con configuración VIP y tecnología de navegación avanzada.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=black-private-jet", alt: "Jet privado negro" }
    ],
    featured: true,
  },
  {
    slug: "interior-jet-privado",
    title: "Interior Jet Privado de Lujo",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Interior lujoso de jet privado con acabados premium y configuración VIP exclusiva.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=private-jet-interior", alt: "Interior jet privado" }
    ],
  },
  {
    slug: "yate-lujo-premium",
    title: "Yate de Lujo Premium",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Espectacular yate de lujo con todas las comodidades para navegación exclusiva.",
    images: [
      { src: "/images/boat-exterior.jpg", alt: "Yate de lujo" },
      { src: "/images/boat-exterior-2.jpg", alt: "Vista yate desde agua" },
      { src: "/placeholder-cqkrx.png", alt: "Yate lateral" }
    ],
    featured: true,
  },
  {
    slug: "barco-blanco-azul",
    title: "Barco Blanco y Azul",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Elegante barco bicolor para excursiones marinas y navegación recreativa.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=white-blue-boat", alt: "Barco blanco y azul" }
    ],
  },
  {
    slug: "barco-deportivo",
    title: "Barco Deportivo",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Barco especializado para deportes acuáticos con motor de alta potencia.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=sport-boat", alt: "Barco deportivo" }
    ],
  },
  {
    slug: "barco-recreo",
    title: "Barco de Recreo",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Barco ideal para actividades recreativas familiares y ocio náutico.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=recreational-boat", alt: "Barco de recreo" }
    ],
  },
  {
    slug: "barcos-puerto",
    title: "Barcos en Puerto",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Selección de embarcaciones ubicadas en puerto deportivo con amarre incluido.",
    images: [
      { src: "/images/boat-stand.jpg", alt: "Barcos en puerto" }
    ],
  },
  {
    slug: "rolex-collection",
    title: "Colección Rolex",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Exclusiva colección de relojes Rolex. Piezas de inversión y modelos limitados.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=rolex-collection", alt: "Colección Rolex" }
    ],
  },
  {
    slug: "patek-philippe",
    title: "Patek Philippe",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Exquisito reloj Patek Philippe. La cima de la relojería suiza de prestigio.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=patek-philippe", alt: "Patek Philippe" }
    ],
  },
  {
    slug: "bolso-piel-cocodrilo",
    title: "Bolso Piel de Cocodrilo",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Bolso de lujo fabricado en auténtica piel de cocodrilo con acabados artesanales.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=crocodile-leather-bag", alt: "Bolso piel cocodrilo" }
    ],
  },
  {
    slug: "excavadora-cat-320e",
    title: "Excavadora CAT 320E",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Excavadora Caterpillar 320E en excelente estado para proyectos de construcción.",
    images: [
      { src: "/images/cat-320e.jpg", alt: "Excavadora CAT 320E" }
    ],
  },
  {
    slug: "camion-sitrak",
    title: "Camión SITRAK",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Camión de transporte pesado SITRAK para uso industrial y construcción.",
    images: [
      { src: "/images/sitrak.jpg", alt: "Camión SITRAK" },
      { src: "/images/sitrak-side.jpg", alt: "Vista lateral SITRAK" }
    ],
  },
  {
    slug: "camion-iveco",
    title: "Camión Iveco",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Camión comercial Iveco para transporte y logística empresarial profesional.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=iveco-truck", alt: "Camión Iveco" }
    ],
  },
  {
    slug: "patinete-electrico",
    title: "Patinete Eléctrico Premium",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Patinete eléctrico de alta gama para movilidad urbana sostenible.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=electric-scooter", alt: "Patinete eléctrico" }
    ],
  },
  {
    slug: "diamante-inversion",
    title: "Diamante de Inversión",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Diamante de alta calidad con certificación gemológica para inversión exclusiva.",
    images: [
      { src: "/images/diamond.jpg", alt: "Diamante brillante" }
    ],
  },
  {
    slug: "cobre-industrial",
    title: "Cobre Industrial",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Cobre de grado industrial para proyectos de construcción e inversión en commodities.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=industrial-copper", alt: "Cobre industrial" }
    ],
  },
  {
    slug: "carbon-premium",
    title: "Carbón Premium",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Carbón de alta calidad para uso industrial y energético. Oportunidad de inversión.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=premium-coal", alt: "Carbón premium" }
    ],
  },
  {
    slug: "campo-olivos",
    title: "Campo de Olivos",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Extenso campo de olivos productivo. Inversión agrícola con rentabilidad sostenible.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=olive-grove", alt: "Campo de olivos" }
    ],
  },
  {
    slug: "fabrica-aceite-oliva",
    title: "Fábrica de Aceite de Oliva",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Instalación completa para producción de aceite de oliva con maquinaria moderna.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=olive-oil-factory", alt: "Fábrica aceite oliva" }
    ],
  },
  {
    slug: "planta-industrial",
    title: "Planta Industrial",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Complejo industrial moderno con infraestructura para múltiples aplicaciones productivas.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=industrial-plant", alt: "Planta industrial" }
    ],
  },
  {
    slug: "planta-petroleo",
    title: "Planta de Petróleo",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Instalación petrolera con infraestructura completa para refinación y procesamiento.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=oil-refinery", alt: "Planta petróleo" }
    ],
  },
  {
    slug: "estacion-servicio-industrial",
    title: "Estación de Servicio Industrial",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Estación de servicio con capacidad industrial para flotas comerciales y transporte pesado.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=industrial-gas-station", alt: "Estación servicio" }
    ],
  },

  // AERONAVES (3 items separados)
  {
    slug: "airbus-a321-comercial",
    title: "Airbus A321-200 Comercial",
    category: "Aeronaves",
    price: null,
    currency: "USD",
    short: "Avión comercial Airbus A321-200 en excelentes condiciones para uso charter o aerolínea.",
    images: [
      { src: "/images/airbus-a321.jpg", alt: "Airbus A321 en pista" }
    ],
  },
  {
    slug: "jet-ejecutivo-premium",
    title: "Jet Ejecutivo Premium",
    category: "Aeronaves",
    price: null,
    currency: "USD",
    short: "Jet privado ejecutivo con configuración premium para vuelos corporativos de largo alcance.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=executive-jet", alt: "Jet ejecutivo" }
    ],
  },
  {
    slug: "aeronave-alto-rendimiento",
    title: "Aeronave de Alto Rendimiento",
    category: "Aeronaves",
    price: null,
    currency: "USD",
    short: "Aeronave especializada de alto rendimiento con tecnología aeronáutica de vanguardia.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=high-performance-aircraft", alt: "Aeronave alto rendimiento" }
    ],
  },

  // OTROS (4 items)
  {
    slug: "video-promocional",
    title: "Material Audiovisual Promocional",
    category: "Otros",
    price: null,
    currency: "EUR",
    short: "Contenido audiovisual promocional de alta calidad para marketing y presentaciones.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=promotional-video", alt: "Material audiovisual" }
    ],
  },
  {
    slug: "portfolio-diverso",
    title: "Portfolio de Inversión Diverso",
    category: "Otros",
    price: null,
    currency: "EUR",
    short: "Selección diversa de activos y oportunidades de inversión únicas y exclusivas.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=investment-portfolio", alt: "Portfolio diverso" }
    ],
  },
  {
    slug: "activos-especiales",
    title: "Activos Especiales",
    category: "Otros",
    price: null,
    currency: "EUR",
    short: "Activos únicos y oportunidades especiales de inversión no clasificadas convencionalmente.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=special-assets", alt: "Activos especiales" }
    ],
  },
  {
    slug: "oportunidades-exclusivas",
    title: "Oportunidades Exclusivas",
    category: "Otros",
    price: null,
    currency: "EUR",
    short: "Oportunidades de inversión exclusivas disponibles por tiempo limitado.",
    images: [
      { src: "/placeholder.svg?height=720&width=1280&query=exclusive-opportunities", alt: "Oportunidades exclusivas" }
    ],
  }
]
