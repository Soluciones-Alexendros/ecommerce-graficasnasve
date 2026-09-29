/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

export interface Servicio {
  slug: string
  titulo: string
  descripcion: string
  descripcionCorta: string
  beneficios: string[]
  icono: string
  ctaTexto: string
}

export const catalogoServicios: Servicio[] = [
  {
    slug: 'impresion-offset',
    titulo: 'Impresión Offset',
    descripcionCorta: 'Calidad y consistencia para tiradas medias y largas. El estándar de la industria gráfica.',
    descripcion:
      'La impresión offset es el método predilecto para tiradas medias y largas que exigen la máxima calidad cromática. Trabajamos con tecnología CTP (Computer-to-Plate) que elimina intermediarios y garantiza una reproducción del color fiel al original. Ideal para revistas, catálogos, libros y cualquier producto editorial donde el volumen justifica la inversión y el resultado debe ser impecable.',
    beneficios: [
      'Tecnología CTP: del archivo directo a plancha, sin fotolito',
      'Reproducción cromática profesional con tintas Pantone',
      'Coste por unidad reducido a partir de 500 ejemplares',
      'Papeles especiales: estucado, offset, reciclado, FSC',
      'Gramajes desde 70 g/m² hasta 350 g/m²',
      'Barniz UV inline para protección y acabado brillante',
    ],
    icono: 'Printer',
    ctaTexto: 'Pedir presupuesto offset',
  },
  {
    slug: 'impresion-digital',
    titulo: 'Impresión Digital',
    descripcionCorta: 'Tiradas cortas sin mínimos absurdos. Entrega rápida, calidad profesional.',
    descripcion:
      'La impresión digital permite producir desde un único ejemplar hasta tiradas de cientos de copias con la misma calidad que el offset, sin los costes de preparación de plancha. Perfecta para prototipos, ediciones limitadas, libros bajo demanda y cualquier proyecto donde la flexibilidad y la velocidad de entrega son cruciales. Sin mínimos que penalicen tu presupuesto.',
    beneficios: [
      'Sin tirada mínima: desde 1 ejemplar',
      'Entrega en 24–72 horas según trabajo',
      'Personalización pieza a pieza (dato variable)',
      'Papeles y cartulinas de alta calidad',
      'Impresión a doble cara automática',
      'Blanco y negro o color sin diferencia de plazo',
    ],
    icono: 'Zap',
    ctaTexto: 'Pedir presupuesto digital',
  },
  {
    slug: 'encuadernacion',
    titulo: 'Encuadernación',
    descripcionCorta: 'Del rústico artesanal al PUR de alta resistencia. Soluciones para cada tipo de publicación.',
    descripcion:
      'Nuestro taller de encuadernación ofrece todas las modalidades necesarias para dar vida a publicaciones de cualquier tipo. Desde el clásico grapado para folletos y revistas ligeras, pasando por el cosido en rústica para libros que deben sobrevivir el paso del tiempo, hasta la encuadernación PUR —la más resistente del mercado— para catálogos técnicos y libros de texto. También fabricamos menús de restaurante de alta gama.',
    beneficios: [
      'PUR (poliuretano reactivo): máxima resistencia al abrir',
      'Cosido en rústica artesanal para libros de calidad',
      'Cosido con hilo para ediciones de coleccionista',
      'Grapado en caballete o lomo para revistas y folletos',
      'Menús de restaurante con espiral o encuadernación especial',
      'Canutillo y Wire-O para cuadernos y manuales',
    ],
    icono: 'BookOpen',
    ctaTexto: 'Pedir presupuesto encuadernación',
  },
  {
    slug: 'acabados-premium',
    titulo: 'Acabados Premium',
    descripcionCorta: 'Stamping, UVI selectivo, relieves, glasofonado. El detalle que marca la diferencia.',
    descripcion:
      'Los acabados premium son los que transforman un impreso correcto en un objeto deseable. Trabajamos con las técnicas más avanzadas: stamping en oro, plata o colores metalizados, barniz UVI selectivo que resalta elementos concretos del diseño, relieves en seco o húmedo, glasofonado (laminado soft-touch o brillante), y tintas especiales como fluorescentes, metalizadas o termocrómicas. Para marcas que quieren que sus impresos hablen por sí solos.',
    beneficios: [
      'Stamping: pan de oro, plata, cobre y colores metálicos',
      'Barniz UVI selectivo: brillo localizado sobre mate',
      'Relieve seco (embossing) y húmedo para textura táctil',
      'Glasofonado soft-touch: terciopelo al tacto',
      'Troquelado con formas personalizadas',
      'Tintas fluorescentes, metalizadas y termocrómicas',
    ],
    icono: 'Sparkles',
    ctaTexto: 'Pedir presupuesto acabados',
  },
  {
    slug: 'personalizacion',
    titulo: 'Personalización y Dato Variable',
    descripcionCorta: 'QR únicos, mailing personalizado, numeración, tinta invisible. Cada pieza, única.',
    descripcion:
      'La personalización a escala es una de las capacidades más potentes de la impresión moderna. Con la tecnología de dato variable podemos imprimir miles de piezas donde cada una contiene información única: nombre del destinatario, código QR individual, número de serie, dirección personalizada o incluso fotografía específica. Ideal para mailings, tarjetas de fidelización, carnets, diplomas y campañas de marketing directo.',
    beneficios: [
      'Código QR único por ejemplar con tracking integrado',
      'Mailing personalizado: nombre, dirección y datos variables',
      'Numeración correlativa o aleatoria certificada',
      'Tinta invisible UV para seguridad y antimanipulación',
      'Integración con CRM y bases de datos del cliente',
      'Diplomas y certificados nominales en tiradas masivas',
    ],
    icono: 'QrCode',
    ctaTexto: 'Pedir presupuesto personalización',
  },
  {
    slug: 'madera',
    titulo: 'Impresión sobre Madera',
    descripcionCorta: 'Impresión digital directa sobre madera natural. Packaging premium y señalética única.',
    descripcion:
      'La impresión digital directa sobre madera es una especialidad diferencial de NASVE. Trabajamos con madera natural y contrachapado de distintos grosores para crear productos únicos: packaging de lujo, señalética corporativa, souvenirs, menús de restaurante sobre tablilla de madera, decoración interior y objetos de regalo personalizados. La veta natural de la madera forma parte del diseño, creando piezas que no pueden replicarse.',
    beneficios: [
      'Impresión directa UV sobre madera natural y laminada',
      'Tablillas de 3, 6 y 10 mm de grosor',
      'Troquelado y corte láser de formas personalizadas',
      'Packaging de lujo para vino, gastronomía y joyería',
      'Señalética interior con aspecto artesanal premium',
      'Menús de restaurante sobre madera con acabado satinado',
    ],
    icono: 'TreePine',
    ctaTexto: 'Pedir presupuesto madera',
  },
]
