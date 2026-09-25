/** Canonical SEO constants — single source of truth for structured data and on-page copy. */

export const SITE_URL = 'https://gelsoclinic.com';
export const SITE_NAME = 'Gelso — Medicina Estética Integral';
export const DOCTOR_NAME = 'Dra. María Pía Gelso';
export const DOCTOR_LICENSE = 'MP 47298';
export const PHONE_E164 = '+543572665637';
export const PHONE_DISPLAY = '3572 665637';
export const WHATSAPP_URL =
  'https://wa.me/543572665637?text=Hola%20Dra.%20Mar%C3%ADa%20P%C3%ADa%20Gelso%2C%20quisiera%20solicitar%20un%20turno.';
export const INSTAGRAM_URL = 'https://www.instagram.com/Dra.gelso';
export const INSTAGRAM_HANDLE = '@Dra.gelso';
export const TWITTER_HANDLE = '@Dragelso';

export const DEFAULT_TITLE =
  'Dra. Gelso María Pía · Medicina Estética Integral | Córdoba · Pilar · Río Segundo';
export const DEFAULT_DESCRIPTION =
  'Dra. María Pía Gelso (MP 47298): medicina estética integral en Río Segundo (Mendoza 1120), Pilar y Nueva Córdoba. Botox, microneedling, rellenos, PRP capilar y skinbooster. Turnos por WhatsApp al 3572 665637.';

export type FaqEntry = { question: string; answer: string };

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: '¿Dónde atiende la Dra. Gelso?',
    answer:
      'La Dra. María Pía Gelso atiende en Río Segundo (Mendoza 1120), en Pilar (zona Río Segundo) y en Nueva Córdoba según disponibilidad. En esta web encontrás mapas, direcciones y enlaces para solicitar turno.',
  },
  {
    question: '¿Cuál es la dirección del consultorio en Río Segundo?',
    answer:
      'El consultorio Gelso en Río Segundo está en Mendoza 1120, Río Segundo, provincia de Córdoba. Podés ver la ubicación en el mapa del sitio o abrir la ruta en Google Maps.',
  },
  {
    question: '¿Hay consultorio de medicina estética en Pilar, Córdoba?',
    answer:
      'Sí. La Dra. Gelso atiende en Pilar, zona Río Segundo, Córdoba. En el sitio encontrás el mapa con la ubicación exacta y el enlace para calcular cómo llegar.',
  },
  {
    question: '¿Cómo saco turno con la Dra. Gelso?',
    answer:
      'Podés solicitar turno por WhatsApp al +54 3572 665637 o mediante mensaje directo en Instagram @Dra.gelso.',
  },
  {
    question: '¿Qué tratamientos ofrece la Dra. Gelso?',
    answer:
      'Botox (toxina botulínica), microneedling, dermaplaning, relleno de labios con ácido hialurónico, PRP capilar, skinbooster, mesoterapia facial y corporal, entre otros protocolos de medicina estética integral.',
  },
  {
    question: '¿Los resultados son naturales?',
    answer:
      'Sí. El método Gelso prioriza resultados sutiles, armónicos y personalizados que respetan los rasgos propios de cada paciente.',
  },
  {
    question: '¿Cuál es la matrícula profesional de la Dra. Gelso?',
    answer:
      'La Dra. María Pía Gelso ejerce con matrícula profesional MP 47298 en la provincia de Córdoba, Argentina.',
  },
  {
    question: '¿Atiende en Nueva Córdoba?',
    answer:
      'Sí. La Dra. Gelso consulta en Nueva Córdoba además de Pilar y Río Segundo. Consultá disponibilidad por WhatsApp o Instagram.',
  },
];

const ASSET = (path: string) => `${SITE_URL}${path}`;

export function buildStructuredDataGraph() {
  return [
    {
      '@type': ['MedicalBusiness', 'MedicalClinic', 'LocalBusiness'],
      '@id': `${SITE_URL}/#clinic`,
      name: SITE_NAME,
      alternateName: ['Dra. Gelso', 'Consultorio Dra. Gelso', DOCTOR_NAME],
      description:
        'Clínica de medicina estética integral dirigida por la Dra. María Pía Gelso (MP 47298). Consultorios en Río Segundo (Mendoza 1120), Pilar y Nueva Córdoba, provincia de Córdoba, Argentina.',
      url: `${SITE_URL}/`,
      logo: { '@type': 'ImageObject', url: ASSET('/assets/gelso-logo.jpg') },
      image: [ASSET('/assets/gelso-slogan-reference.jpg'), ASSET('/assets/dra-gelso-hero.png')],
      telephone: PHONE_E164,
      priceRange: '$$',
      currenciesAccepted: 'ARS',
      areaServed: [
        { '@type': 'City', name: 'Córdoba', containedInPlace: { '@type': 'Country', name: 'Argentina' } },
        { '@type': 'City', name: 'Río Segundo' },
        { '@type': 'City', name: 'Pilar' },
      ],
      medicalSpecialty: ['Medicina Estética', 'Medicina Capilar'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: PHONE_E164,
        contactType: 'appointments',
        availableLanguage: ['es', 'es-AR'],
        areaServed: 'AR',
        url: WHATSAPP_URL,
      },
      availableService: [
        { '@type': 'MedicalProcedure', name: 'Botox — Toxina Botulínica' },
        { '@type': 'MedicalProcedure', name: 'Microneedling / Dermapen' },
        { '@type': 'MedicalProcedure', name: 'Relleno de labios con ácido hialurónico' },
        { '@type': 'MedicalProcedure', name: 'PRP capilar' },
        { '@type': 'MedicalProcedure', name: 'Skinbooster' },
        { '@type': 'MedicalProcedure', name: 'Mesoterapia facial' },
        { '@type': 'MedicalProcedure', name: 'Dermaplaning' },
      ],
      location: [{ '@id': `${SITE_URL}/#consultorio-rio-segundo` }, { '@id': `${SITE_URL}/#consultorio-pilar` }],
      sameAs: [INSTAGRAM_URL],
      employee: { '@id': `${SITE_URL}/#doctor` },
      potentialAction: {
        '@type': 'ReserveAction',
        name: 'Solicitar turno por WhatsApp',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: WHATSAPP_URL,
          actionPlatform: ['https://schema.org/MobileWebPlatform', 'https://schema.org/DesktopWebPlatform'],
        },
      },
    },
    {
      '@type': ['MedicalClinic', 'LocalBusiness'],
      '@id': `${SITE_URL}/#consultorio-rio-segundo`,
      name: 'Gelso — Consultorio Río Segundo',
      parentOrganization: { '@id': `${SITE_URL}/#clinic` },
      url: `${SITE_URL}/#ubicaciones`,
      telephone: PHONE_E164,
      image: ASSET('/assets/gelso-logo.jpg'),
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mendoza 1120',
        addressLocality: 'Río Segundo',
        addressRegion: 'Córdoba',
        postalCode: 'X5960',
        addressCountry: 'AR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: -31.7069, longitude: -63.9088 },
      hasMap:
        'https://www.google.com/maps/search/?api=1&query=Mendoza+1120,+R%C3%ADo+Segundo,+C%C3%B3rdoba,+Argentina',
    },
    {
      '@type': ['MedicalClinic', 'LocalBusiness'],
      '@id': `${SITE_URL}/#consultorio-pilar`,
      name: 'Gelso — Consultorio Pilar',
      parentOrganization: { '@id': `${SITE_URL}/#clinic` },
      url: `${SITE_URL}/#ubicaciones`,
      telephone: PHONE_E164,
      image: ASSET('/assets/gelso-logo.jpg'),
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pilar',
        addressRegion: 'Río Segundo, Córdoba',
        postalCode: 'X5972',
        addressCountry: 'AR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: -31.675277, longitude: -63.871228 },
      hasMap: 'https://www.google.com/maps/search/?api=1&query=-31.675277,-63.871228',
    },
    {
      '@type': ['Person', 'Physician'],
      '@id': `${SITE_URL}/#doctor`,
      name: DOCTOR_NAME,
      givenName: 'María Pía',
      familyName: 'Gelso',
      honorificPrefix: 'Dra.',
      jobTitle: 'Médica especialista en medicina estética integral',
      medicalSpecialty: 'Medicina estética',
      identifier: {
        '@type': 'PropertyValue',
        name: 'Matrícula Profesional Argentina',
        value: DOCTOR_LICENSE,
      },
      worksFor: { '@id': `${SITE_URL}/#clinic` },
      image: { '@type': 'ImageObject', url: ASSET('/assets/dra-gelso-hero.png') },
      url: `${SITE_URL}/`,
      sameAs: [INSTAGRAM_URL],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: `${DOCTOR_NAME} — Medicina Estética Integral`,
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'es-AR',
      publisher: { '@id': `${SITE_URL}/#clinic` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#clinic` },
      primaryImageOfPage: { '@type': 'ImageObject', url: ASSET('/assets/gelso-slogan-reference.jpg') },
      inLanguage: 'es-AR',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Sobre mí', item: `${SITE_URL}/#sobre-mi` },
        { '@type': 'ListItem', position: 3, name: 'Tratamientos', item: `${SITE_URL}/#tratamientos` },
        { '@type': 'ListItem', position: 4, name: 'El método Gelso', item: `${SITE_URL}/#metodo` },
        { '@type': 'ListItem', position: 5, name: 'Preguntas frecuentes', item: `${SITE_URL}/#preguntas-frecuentes` },
        { '@type': 'ListItem', position: 6, name: 'Ubicaciones y turnos', item: `${SITE_URL}/#ubicaciones` },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#preguntas-frecuentes`,
      mainEntity: FAQ_ENTRIES.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: { '@type': 'Answer', text: entry.answer },
      })),
    },
  ];
}

export function structuredDataJson(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': buildStructuredDataGraph(),
  });
}
