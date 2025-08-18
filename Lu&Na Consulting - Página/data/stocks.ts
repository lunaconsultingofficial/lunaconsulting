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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Ferrari/IMG-20250308-WA0060-optimized.png", alt: "Ferrari rojo en exhibición" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Ferrari/IMG-20250308-WA0061.jpg", alt: "Ferrari detalle frontal" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Ferrari/IMG-20250308-WA0062.jpg", alt: "Ferrari vista lateral" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Lamborghini/IMG-20250308-WA0054-optimized.png", alt: "Lamborghini amarillo" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Lamborghini/IMG-20250308-WA0055.jpg", alt: "Lamborghini vista posterior" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Lamborghini_Urus/IMG-20250308-WA0035.jpg", alt: "Lamborghini Urus frontal" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Lamborghini_Urus/IMG-20250308-WA0036.jpg", alt: "Lamborghini Urus lateral" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Lamborghini_Urus/IMG-20250308-WA0037.jpg", alt: "Lamborghini Urus interior" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Porsche/IMG-20250308-WA0014.jpg", alt: "Porsche 911 plateado" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Porsche/IMG-20250308-WA0015.jpg", alt: "Porsche vista frontal" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Mercedes-Benz_S-Class/IMG-20250308-WA0048.jpg", alt: "Mercedes S-Class negro" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Mercedes-Benz_S-Class/IMG-20250308-WA0049.jpg", alt: "Mercedes S-Class lateral" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Mercedes-Benz_GLS/IMG-20250308-WA0044.jpg", alt: "Mercedes GLS blanco" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Mercedes-Benz_GLS/IMG-20250308-WA0045.jpg", alt: "Mercedes GLS frontal" }
    ],
  },
  {
    slug: "mercedes-benz-e-class",
    title: "Mercedes-Benz E-Class",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Mercedes-Benz Clase E. Elegancia ejecutiva con tecnología de vanguardia.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Mercedes-Benz_E-Class/IMG-20250308-WA0040.jpg", alt: "Mercedes E-Class azul" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Mercedes-Benz_E-Class/IMG-20250308-WA0041.jpg", alt: "Mercedes E-Class perfil" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Rolls-Royce_Cullinan/IMG-20250308-WA0050.jpg", alt: "Rolls-Royce Cullinan negro" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Rolls-Royce_Cullinan/IMG-20250308-WA0051.jpg", alt: "Rolls-Royce Cullinan vista trasera" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Brabus_G800/IMG-20250308-WA0038.jpg", alt: "Brabus G800 negro" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Brabus_G800/IMG-20250308-WA0039.jpg", alt: "Brabus G800 frontal" }
    ],
  },
  {
    slug: "bugatti-exclusive",
    title: "Bugatti Exclusive",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Bugatti exclusivo. Hipercoche francés con ingeniería extraordinaria y diseño único.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Bugatti/IMG-20250308-WA0017.jpg", alt: "Bugatti azul y negro" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Bugatti/IMG-20250308-WA0018.jpg", alt: "Bugatti detalle lateral" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Lexus_LX600/IMG-20250308-WA0028.jpg", alt: "Lexus LX600 blanco" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Lexus_LX600/IMG-20250308-WA0029.jpg", alt: "Lexus LX600 perfil" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Toyota_Land_Cruiser/IMG-20250308-WA0032.jpg", alt: "Toyota Land Cruiser blanco" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Toyota_Land_Cruiser/IMG-20250308-WA0033.jpg", alt: "Toyota Land Cruiser frontal" }
    ],
  },
  {
    slug: "audi-q8",
    title: "Audi Q8",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Audi Q8. SUV coupé con diseño vanguardista y tecnología quattro.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Audi_Q8/IMG-20250308-WA0019.jpg", alt: "Audi Q8 gris" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Audi_Q8/IMG-20250308-WA0020.jpg", alt: "Audi Q8 vista lateral" }
    ],
  },
  {
    slug: "volkswagen-golf-gti",
    title: "Volkswagen Golf GTI",
    category: "Coches de lujo",
    price: null,
    currency: "EUR",
    short: "Volkswagen Golf GTI. El icónico hot hatch alemán con prestaciones deportivas.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Coches/Volkswagen_Golf_GTI/IMG-20250308-WA0034.jpg", alt: "Golf GTI rojo" }
    ],
  },

  // BIENES RAÍCES
  {
    slug: "casa-moderna-piscina-noche",
    title: "Casa Moderna con Piscina Nocturna",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Espectacular casa moderna con piscina iluminada y vistas panorámicas nocturnas.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Casa_Moderna_Piscina_Noche/IMG-20250617-WA0106.jpg", alt: "Casa moderna con piscina iluminada de noche" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Casa_Moderna_Piscina_Noche/IMG-20250617-WA0107.jpg", alt: "Vista nocturna piscina moderna" }
    ],
    featured: true,
  },
  {
    slug: "casa-moderna-piscina-vista-aerea",
    title: "Casa Moderna - Vista Aérea",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Impresionante vista aérea de casa moderna con piscina y diseño arquitectónico excepcional.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Casa_Moderna_Piscina_Vista_Aerea/IMG-20250617-WA0108.jpg", alt: "Vista aérea casa moderna con piscina" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Casa_Moderna_Piscina_Vista_Aerea/IMG-20250617-WA0109.jpg", alt: "Perspectiva aérea arquitectura moderna" }
    ],
    featured: true,
  },
  {
    slug: "casa-grande-patio",
    title: "Casa Grande con Patio",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Amplia casa familiar con extenso patio y espacios exteriores bien diseñados.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Casa_Grande_Patio/IMG-20250617-WA0110.jpg", alt: "Casa grande con patio amplio" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Casa_Grande_Patio/IMG-20250617-WA0111.jpg", alt: "Vista del patio y jardín" }
    ],
  },
  {
    slug: "casa-moderna-noche",
    title: "Casa Moderna de Noche",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Elegante casa moderna con iluminación arquitectónica nocturna destacada.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Casa_Moderna_Noche/IMG-20250617-WA0112.jpg", alt: "Casa moderna iluminada de noche" }
    ],
  },
  {
    slug: "casa-de-noche",
    title: "Casa de Noche",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Hermosa residencia con iluminación nocturna que resalta su arquitectura.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Casa_de_Noche/IMG-20250617-WA0113.jpg", alt: "Casa iluminada durante la noche" }
    ],
  },
  {
    slug: "complejo-residencial-costero",
    title: "Complejo Residencial Costero",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Exclusivo complejo residencial en primera línea de costa con vistas al mar.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Complejo_Residencial_Costero/IMG-20250617-WA0114.jpg", alt: "Complejo residencial frente al mar" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Complejo_Residencial_Costero/IMG-20250617-WA0115.jpg", alt: "Vista del complejo costero" }
    ],
  },
  {
    slug: "edificio-piscina-noche",
    title: "Edificio con Piscina Nocturna",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Moderno edificio residencial con piscina iluminada y amenidades premium.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Edificio_Piscina_Noche/IMG-20250617-WA0116.jpg", alt: "Edificio con piscina iluminada" }
    ],
  },
  {
    slug: "edificio-con-piscinas",
    title: "Edificio con Piscinas",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Complejo residencial de lujo con múltiples piscinas y instalaciones recreativas.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Edificio_con_Piscinas/IMG-20250617-WA0117.jpg", alt: "Edificio con múltiples piscinas" }
    ],
  },
  {
    slug: "casas-en-construccion",
    title: "Casas en Construcción",
    category: "Bienes raíces",
    price: null,
    currency: "EUR",
    short: "Proyecto de construcción de casas modernas en desarrollo con entrega programada.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Casas/Casas_en_Construccion/IMG-20250617-WA0118.jpg", alt: "Casas en construcción" }
    ],
  },

  // BIENES
  {
    slug: "jet-privado-blanco",
    title: "Jet Privado Blanco",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Jet privado ejecutivo en impecable estado. Ideal para viajes corporativos y de lujo.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Jet_Privado_Blanco/IMG-20250703-WA0107.jpg", alt: "Jet privado blanco en pista" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Jet_Privado_Blanco/IMG-20250703-WA0108.jpg", alt: "Vista lateral jet privado" }
    ],
    featured: true,
  },
  {
    slug: "jet-privado-negro",
    title: "Jet Privado Negro",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Elegante jet privado negro con configuración VIP y tecnología avanzada.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Jet_Privado_Negro/IMG-20250703-WA0109.jpg", alt: "Jet privado negro" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Jet_Privado_Negro/IMG-20250703-WA0110.jpg", alt: "Jet negro en hangar" }
    ],
    featured: true,
  },
  {
    slug: "yate-lujo",
    title: "Yate de Lujo",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Espectacular yate de lujo con todas las comodidades para navegación exclusiva.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Yate/IMG-20250703-WA0111.jpg", alt: "Yate de lujo en puerto" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Yate/IMG-20250703-WA0112.jpg", alt: "Vista del yate desde el agua" }
    ],
    featured: true,
  },
  {
    slug: "rolex-collection",
    title: "Colección Rolex",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Exclusiva colección de relojes Rolex. Piezas de colección y modelos limitados.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Rolex/IMG-20250703-WA0113.jpg", alt: "Reloj Rolex dorado" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Rolex/IMG-20250703-WA0114.jpg", alt: "Colección Rolex" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Patek_Philippe/IMG-20250703-WA0115.jpg", alt: "Reloj Patek Philippe" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Excavadora_CAT_320E/IMG-20250703-WA0116.jpg", alt: "Excavadora CAT 320E" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Excavadora_CAT_320E/IMG-20250703-WA0117.jpg", alt: "Vista lateral excavadora" }
    ],
  },
  {
    slug: "camion-sitrak",
    title: "Camión SITRAK",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Camión SITRAK resistente para transporte pesado y uso industrial.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Camion_SITRAK/IMG-20250703-WA0118.jpg", alt: "Camión SITRAK" }
    ],
  },
  {
    slug: "camion-iveco",
    title: "Camión Iveco",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Camión Iveco profesional para transporte comercial y logística empresarial.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Camion_Iveco/IMG-20250703-WA0119.jpg", alt: "Camión Iveco blanco" }
    ],
  },
  {
    slug: "diamante-exclusivo",
    title: "Diamante Exclusivo",
    category: "Bienes",
    price: null,
    currency: "USD",
    short: "Diamante de alta calidad con certificación gemológica. Inversión exclusiva.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Diamante/IMG-20250703-WA0120.jpg", alt: "Diamante brillante" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Cobre/IMG-20250703-WA0121.jpg", alt: "Barras de cobre" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Carbon/IMG-20250703-WA0122.jpg", alt: "Carbón negro de calidad" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Campo_Olivos/IMG-20250703-WA0123.jpg", alt: "Campo de olivos" }
    ],
  },
  {
    slug: "fabrica-aceite-oliva",
    title: "Fábrica de Aceite de Oliva",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Fábrica completa de aceite de oliva con maquinaria moderna y capacidad industrial.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Fabrica_Aceite_Oliva/IMG-20250703-WA0124.jpg", alt: "Interior fábrica aceite de oliva" }
    ],
  },
  {
    slug: "planta-industrial",
    title: "Planta Industrial",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Complejo industrial con infraestructura moderna para múltiples aplicaciones productivas.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Planta_Industrial/IMG-20250703-WA0125.jpg", alt: "Planta industrial moderna" }
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
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Planta_Petroleo/IMG-20250703-WA0126.jpg", alt: "Planta de refinación de petróleo" }
    ],
  },
  {
    slug: "estacion-servicio-industrial",
    title: "Estación de Servicio Industrial",
    category: "Bienes",
    price: null,
    currency: "EUR",
    short: "Estación de servicio con capacidad industrial para flotas comerciales.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Estacion_Servicio_Industrial/IMG-20250703-WA0127.jpg", alt: "Estación de servicio industrial" }
    ],
  },

  // AERONAVES
  {
    slug: "avion-comercial",
    title: "Avión Comercial",
    category: "Aeronaves",
    price: null,
    currency: "USD",
    short: "Avión comercial en excelentes condiciones para uso charter o línea aérea.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Avion/IMG-20250703-WA0128.jpg", alt: "Avión comercial en pista" }
    ],
  },
  {
    slug: "interior-jet-privado",
    title: "Interior Jet Privado",
    category: "Aeronaves",
    price: null,
    currency: "USD",
    short: "Lujoso interior de jet privado con configuración VIP y comodidades premium.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Interior_Jet_Privado/IMG-20250703-WA0129.jpg", alt: "Interior lujoso de jet privado" }
    ],
  },

  // OTROS
  {
    slug: "barcos-deportivos",
    title: "Barcos Deportivos",
    category: "Otros",
    price: null,
    currency: "EUR",
    short: "Selección de barcos deportivos y de recreo para navegación y deportes acuáticos.",
    images: [
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Barco_Deportivo/IMG-20250703-WA0130.jpg", alt: "Barco deportivo blanco" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Barco_de_Recreo/IMG-20250703-WA0131.jpg", alt: "Barco de recreo" },
      { src: "/stock_organizado/home/ubuntu/stock_organizado/Bienes/Barco_en_Puerto/IMG-20250703-WA0132.jpg", alt: "Barcos en puerto deportivo" }
    ],
  }
]
