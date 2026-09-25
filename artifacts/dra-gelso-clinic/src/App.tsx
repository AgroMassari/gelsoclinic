import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ArrowDown, ArrowUpRight, ChevronDown, Instagram, MapPin, Menu, X } from 'lucide-react';

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.103 1.522 5.829L.057 23.272a.75.75 0 0 0 .916.916l5.443-1.465A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.706 9.706 0 0 1-4.953-1.354l-.355-.212-3.68.99.99-3.596-.23-.37A9.705 9.705 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
    </svg>
  );
}
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { useDocumentSeo } from '@/hooks/use-document-seo';
import { FAQ_ENTRIES } from '@/lib/site-seo';

const queryClient = new QueryClient();
const logoPath = '/assets/gelso-logo.jpg';
const heroPortraitPath = '/assets/dra-gelso-hero.png';
const aboutPortraitPath = '/assets/dra-maria-pia.jpg';
const methodReferencePath = '/assets/gelso-method-portrait-bw.jpg';
const clinicReferencePath = '/assets/gelso-clinic-interior.jpg';

const appointmentUrl = 'https://wa.me/543572665637?text=Hola%20Dra.%20Mar%C3%ADa%20P%C3%ADa%20Gelso%2C%20quisiera%20solicitar%20un%20turno.';
const phoneUrl = 'tel:+543572665637';
const instagramUrl = 'https://www.instagram.com/Dra.gelso';

const clinicLocations = [
  {
    city: 'Río Segundo',
    slug: 'rio-segundo',
    address: 'Mendoza 1120',
    region: 'Río Segundo, Córdoba, Argentina',
    postalCode: 'X5960',
    latitude: -31.7069,
    longitude: -63.9088,
    seoLine: 'Medicina estética integral en Río Segundo, Córdoba.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mendoza+1120,+R%C3%ADo+Segundo,+C%C3%B3rdoba,+Argentina',
    embedUrl: 'https://maps.google.com/maps?q=Mendoza+1120,+R%C3%ADo+Segundo,+C%C3%B3rdoba,+Argentina&z=17&output=embed',
  },
  {
    city: 'Pilar',
    slug: 'pilar',
    address: 'Consultorio en Pilar',
    region: 'Pilar, Río Segundo, Córdoba, Argentina',
    postalCode: 'X5972',
    latitude: -31.675277,
    longitude: -63.871228,
    seoLine: 'Consultorio de medicina estética en Pilar, zona Río Segundo.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=-31.675277,-63.871228',
    embedUrl: 'https://maps.google.com/maps?q=-31.675277,-63.871228&z=17&output=embed',
  },
] as const;

/* ─── Scroll Progress Bar ──────────────────────── */
function ScrollProgressBar() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      bar.style.width = `${(scrolled / total) * 100}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div id="scroll-progress" aria-hidden="true" />;
}

/* ─── GSAP Bootstrap ────────────────────────────── */
function useGSAPInit() {
  useEffect(() => {
    let cleanup: (() => void) | void;
    const init = async () => {
      const {
        initPremiumCursor,
        initGoldParticles,
        animateHero,
        initHeroParallax,
        initScrollAnimations,
        initMagneticButtons,
        initHeaderScroll,
        refreshScrollTrigger,
      } = await import('@/lib/gsap-animations');

      initPremiumCursor();
      initGoldParticles();
      animateHero();
      initHeroParallax();
      initScrollAnimations();
      initMagneticButtons();
      initHeaderScroll();

      // After fonts load, refresh
      document.fonts.ready.then(() => refreshScrollTrigger());

      cleanup = () => {
        const cursor = document.getElementById('gelso-cursor');
        const canvas = document.getElementById('gelso-particles');
        cursor?.remove();
        canvas?.remove();
      };
    };
    init();
    return () => cleanup?.();
  }, []);
}

/* ─── CSS Reveal (fallback) ─────────────────────── */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, className: `reveal${visible ? ' is-visible' : ''}` };
}

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const reveal = useReveal<HTMLDivElement>();
  return <div ref={reveal.ref} className={`${reveal.className} ${delay} ${className}`}>{children}</div>;
}

/* ─── Brand Mark ────────────────────────────────── */
function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className={`flex items-center ${compact ? 'gap-2.5' : 'gap-4'}`} data-testid="link-brand-home">
      <span className="brand-mark inline-grid justify-items-center leading-none text-center">
        <span className={`font-display tracking-[.17em] text-[#f5eee4] ${compact ? 'text-[1.45rem]' : 'text-[1.65rem]'}`}>GELSO</span>
        <span className="brand-mark-tagline mt-1 text-[.49rem] font-semibold uppercase tracking-[.29em] text-[#cdb38b]">Medicina Estética Integral</span>
      </span>
    </a>
  );
}

/* ─── Header ─────────────────────────────────────── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ['Inicio', '#inicio'],
    ['Sobre mí', '#sobre-mi'],
    ['Tratamientos', '#tratamientos'],
    ['Método', '#metodo'],
    ['Preguntas', '#preguntas-frecuentes'],
    ['Ubicaciones', '#ubicaciones'],
  ];
  return (
    <header id="site-header">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <BrandMark compact />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {links.map(([label, href]) => (
            <a className="nav-link text-[.65rem] font-semibold uppercase tracking-[.2em]"
              href={href} key={href}
              data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>
              {label}
            </a>
          ))}
        </nav>
        <a href={appointmentUrl} target="_blank" rel="noreferrer"
          className="btn-outline hidden border border-[#cdb38b]/60 px-5 py-3 text-[.61rem] font-bold uppercase tracking-[.18em] text-[#f5eee4] sm:inline-flex items-center gap-2"
          data-testid="link-header-appointment">
          Solicitar turno <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <button type="button"
          className="rounded-full border border-[#cdb38b]/40 p-2 text-[#f5eee4] backdrop-blur-sm transition hover:border-[#cdb38b] hover:bg-[#cdb38b]/10 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          data-testid="button-mobile-menu">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu-backdrop border-y border-[#cdb38b]/15 px-6 py-7 lg:hidden">
          <nav className="flex flex-col gap-6" aria-label="Menú móvil">
            {links.map(([label, href]) => (
              <a href={href} onClick={() => setMenuOpen(false)}
                className="text-[.7rem] font-semibold uppercase tracking-[.25em] text-[#f5eee4] transition hover:text-[#cdb38b]"
                key={href} data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>
                {label}
              </a>
            ))}
            <a href={appointmentUrl} target="_blank" rel="noreferrer"
              className="mt-2 border border-[#cdb38b] px-4 py-3 text-center text-[.62rem] font-bold uppercase tracking-[.18em] text-[#cdb38b] transition hover:bg-[#cdb38b] hover:text-[#171411]"
              data-testid="link-mobile-appointment">
              Solicitar turno
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}






/* ─── Pillar Data ────────────────────────────────── */
const pillars = [
{ number: '01', title: 'Precisión', copy: 'Cada decisión nace de una evaluación médica atenta y rigurosa.' },
  { number: '02', title: 'Armonía', copy: 'Tratamientos que respetan tus rasgos, tu identidad y tus tiempos.' },
  { number: '03', title: 'Naturalidad', copy: 'Resultados sutiles para que te reconozcas en tu mejor versión.' },
];

/* ─── Hero Section ───────────────────────────────── */
function Hero() {
  return (
    <section id="inicio" className="relative min-h-[100dvh] overflow-hidden bg-[#100e0b] lg:min-h-[100dvh]">
      <div className="hero-glow right-[5%] top-[8%] h-[480px] w-[480px] bg-[#cdb38b]/5" aria-hidden="true" />
      <div className="hero-glow right-[18%] top-[32%] h-[320px] w-[320px] bg-[#3d4f38]/25" aria-hidden="true" />
      <div className="hero-glow right-[22%] top-[35%] h-[260px] w-[260px] bg-[#9d6b2e]/8" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_32%,rgba(61,79,56,.18),transparent_48%),radial-gradient(ellipse_at_72%_28%,rgba(116,72,43,.2),transparent_42%),linear-gradient(115deg,#100e0b_0%,#100e0b_42%,rgba(16,14,11,.88)_58%,rgba(16,14,11,.2)_100%)]" aria-hidden="true" />
      <div id="hero-image-wrap" className="hero-image-wrap absolute right-0 top-0 h-full w-[88%] overflow-hidden sm:w-[80%] lg:w-[56%] xl:w-[50%]"
        style={{ clipPath: 'inset(0 100% 0 0)' }}>
        <img src={heroPortraitPath} alt="Dra. María Pía Gelso — medicina estética integral en Córdoba"
          className="hero-image h-full w-full"
          data-testid="img-hero-portrait"
          decoding="async"
          fetchPriority="high"
          style={{ transform: 'scale(1.12)' }} />
        <div className="hero-vial-highlight pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
        <div className="hero-image-brand-fade pointer-events-none absolute inset-x-0 top-0 z-[1] h-[22%]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,#100e0b_0%,rgba(16,14,11,.18)_38%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#100e0b] via-[#100e0b]/15 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(16,14,11,.55)_0%,transparent_18%,transparent_72%,rgba(16,14,11,.65)_100%)]" />
        <div className="absolute right-0 top-0 z-[2] h-full w-px bg-gradient-to-b from-transparent via-[#cdb38b]/25 to-transparent" aria-hidden="true" />
      </div>
      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1320px] flex-col justify-center px-5 pt-24 pb-20 sm:px-8 lg:px-12">
        <div className="max-w-[660px]">
          <div className="mb-8 flex items-center gap-3" data-testid="text-hero-eyebrow">
            <span id="hero-eyebrow-line" className="h-px w-12 bg-[#cdb38b]" style={{ transformOrigin: 'left', transform: 'scaleX(0)' }} />
            <span id="hero-eyebrow-text" className="eyebrow" style={{ opacity: 0 }}>Medicina estética integral</span>
          </div>
          <h1 className="max-w-[600px] font-display text-[4.4rem] font-medium leading-[.84] tracking-[-.03em] text-[#f5eee4] sm:text-[6.4rem] lg:text-[7.8rem]"
            data-testid="text-hero-title">
            <span className="hero-title-word" style={{ opacity: 0 }}>La</span>
            {' '}
            <span className="hero-title-word" style={{ opacity: 0 }}>belleza</span>
            <br />
            <em className="text-[#cdb38b]">
              <span className="hero-title-word" style={{ opacity: 0 }}>de</span>
              {' '}
              <span className="hero-title-word" style={{ opacity: 0 }}>lo</span>
              {' '}
              <span className="hero-title-word" style={{ opacity: 0 }}>sutil.</span>
            </em>
          </h1>
          <p id="hero-subtitle" className="mt-9 max-w-[480px] text-[.87rem] leading-7 text-[#d9cfc3] sm:text-[.96rem]" style={{ opacity: 0 }}>
            <strong className="font-semibold text-[#e8dfd3]">Dra. María Pía Gelso (MP 47298)</strong>
            {' '}— medicina estética integral en Río Segundo, Pilar y Nueva Córdoba. Precisión, armonía y naturalidad con criterio médico.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a id="hero-cta-secondary" href="#tratamientos"
              className="btn-outline inline-flex items-center gap-3 border border-[#cdb38b]/35 px-5 py-4 text-[.64rem] font-bold uppercase tracking-[.2em] text-[#e3d6c8] transition hover:border-[#cdb38b]/70 hover:text-[#cdb38b]"
              data-testid="link-hero-treatments" style={{ opacity: 0 }}>
              Conocer tratamientos <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div id="hero-bottom-bar"
          className="mt-auto flex items-end justify-between border-t border-[#cdb38b]/25 pt-5 lg:absolute lg:bottom-10 lg:left-12 lg:right-12 lg:mt-0"
          style={{ opacity: 0 }}>
          <span className="text-[.58rem] font-bold uppercase tracking-[.22em] text-[#cdb38b]">MP 47298</span>
          <span className="hidden text-[.58rem] font-bold uppercase tracking-[.22em] text-[#d9cfc3]/60 sm:block">Medicina estética integral</span>
          <span className="pulse-gold text-[.58rem] font-bold uppercase tracking-[.22em] text-[#d9cfc3]/55">
            Scroll <ArrowDown className="ml-1 inline-block h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Pillars Section ────────────────────────────── */
function Pillars() {
  return (
    <section className="pillars-section border-b border-[#cdb38b]/15 bg-[#181410]">
      <div className="gold-line gold-bar w-full" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1320px] divide-y divide-[#cdb38b]/15 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
        {pillars.map((pillar, index) => (
          <div key={pillar.number}
            className={`pillar-item flex items-start gap-5 py-10 md:px-10 lg:py-12 first:md:pl-0 last:md:pr-0 reveal-delay-${index + 1}`}>
            <span className="pillar-number font-display text-xl text-[#cdb38b]">{pillar.number}</span>
            <div>
              <h2 className="font-display text-2xl text-[#f5eee4]">{pillar.title}</h2>
              <p className="mt-2 max-w-[250px] text-[.72rem] leading-5 text-[#b7aaa0]">{pillar.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Treatment Data ─────────────────────────────── */
const treatments = [
  {
    number: '01', title: 'Evaluación y plan personalizado',
    services: [
      { title: 'Evaluación estética personalizada', description: 'Consulta médica en la que se analiza el rostro, la piel y las necesidades particulares de cada paciente para identificar qué tratamientos pueden ser adecuados y diseñar un plan personalizado.' },
      { title: 'Evaluación + prueba de productos', description: 'Evaluación del estado y las necesidades de la piel, acompañada de la aplicación de productos seleccionados especialmente para el paciente, según lo que su piel necesita.', note: '¿Para qué sirve? Permite conocer cómo responde la piel a determinados productos y experimentar sus efectos antes de incorporarlos a la rutina de cuidado domiciliario.' },
    ],
  },
  {
    number: '02', title: 'Toxina botulínica',
    services: [
      { title: 'Botox por zonas — Líneas de expresión', description: 'Aplicación de toxina botulínica para disminuir temporalmente la contracción de determinados músculos y suavizar las líneas de expresión.', note: 'Indicado principalmente para: frente, entrecejo y patas de gallo. ¿En qué consiste? Se realizan pequeñas inyecciones en puntos específicos de los músculos responsables de las líneas de expresión.' },
      { title: 'Botox para sonrisa gingival', description: 'Tratamiento con toxina botulínica que ayuda a disminuir la elevación excesiva del labio superior al sonreír.', note: 'Indicado para: pacientes que muestran una cantidad elevada de encía al sonreír. ¿En qué consiste? Se aplican pequeñas cantidades de toxina botulínica en músculos específicos que participan en la elevación del labio superior.' },
      { title: 'Botox para bruxismo', description: 'Tratamiento con toxina botulínica que disminuye la fuerza de contracción de los músculos involucrados en la masticación.', note: 'Indicado principalmente para: pacientes con hiperactividad o aumento del volumen de los músculos maseteros asociado al bruxismo. ¿En qué consiste? Se realizan pequeñas inyecciones de toxina botulínica en los músculos maseteros, luego de una evaluación individual.' },
      { title: 'Strapbox', description: 'Tratamiento con toxina botulínica destinado a disminuir la fuerza de contracción de determinados músculos de la zona del cuello.', note: '¿Para qué sirve? Ayuda a relajar la tensión muscular de esta zona y puede mejorar visualmente el aspecto del cuello y la transición entre cuello y mandíbula. ¿En qué consiste? Se realizan aplicaciones estratégicas de toxina botulínica en puntos específicos, seleccionados de acuerdo con la anatomía y los movimientos musculares de cada paciente.' },
    ],
  },
  {
    number: '03', title: 'Calidad y renovación de la piel',
    services: [
      { title: 'Dermaplaning', description: 'Exfoliación mecánica superficial que elimina células superficiales de la piel y el vello facial fino.', note: 'Indicado para: mejorar suavidad, luminosidad y textura de la piel. ¿En qué consiste? Se utiliza un instrumento estéril específico para realizar una exfoliación superficial y controlada.' },
      { title: 'Microneedling / Dermapen con activos seleccionados', description: 'Tratamiento de bioestimulación mediante microperforaciones controladas que favorecen los procesos naturales de renovación de la piel y permiten trabajar con activos seleccionados.', note: 'Indicado para: mejorar luminosidad, hidratación, textura y aspecto general de la piel. Puede utilizarse dentro de protocolos de BB Glow según valoración. ¿En qué consiste? Se realizan microcanales controlados mediante Dermapen y se incorporan activos seleccionados según las necesidades de la piel.' },
      { title: 'Microneedling para cicatrices, estrías y manchas', description: 'Protocolo de microneedling diseñado para trabajar alteraciones de textura y determinadas alteraciones pigmentarias.', note: 'Indicado para: determinadas cicatrices, estrías y manchas, según su tipo y características. ¿En qué consiste? Se realizan microperforaciones controladas que estimulan los procesos de reparación y remodelación de la piel. El protocolo se adapta a cada caso.' },
      { title: 'Microneedling + PRP', description: 'Combinación de microneedling con plasma rico en plaquetas (PRP), obtenido a partir de una muestra de sangre del propio paciente.', note: 'Indicado para: protocolos de bioestimulación y mejora de la calidad y textura de la piel. ¿En qué consiste? Se obtiene una pequeña muestra de sangre, se procesa para obtener el PRP y se combina con el tratamiento de microneedling.' },
      { title: 'Mesoterapia con ácido hialurónico', description: 'Tratamiento orientado a mejorar la hidratación y revitalización de la piel mediante pequeñas aplicaciones de ácido hialurónico.', note: 'Indicado para: piel deshidratada, opaca o con pérdida de luminosidad y calidad. ¿En qué consiste? Se realizan múltiples microinyecciones, utilizando un protocolo adaptado a la zona y a las necesidades de cada paciente.' },
      { title: 'Skinbooster', description: 'Tratamiento inyectable diseñado para mejorar la hidratación, elasticidad y calidad general de la piel mediante ácido hialurónico específico para este tipo de tratamiento.', note: 'Indicado para: piel deshidratada, opaca, con pérdida de elasticidad o líneas superficiales. ¿En qué consiste? Se realizan pequeñas aplicaciones de producto en puntos determinados para distribuirlo de manera uniforme en la zona a tratar.' },
    ],
  },
  {
    number: '04', title: 'Armonización facial',
    services: [
      { title: 'Relleno de labios con ácido hialurónico', description: 'Tratamiento destinado a mejorar la hidratación, definición, simetría y/o volumen de los labios.', note: 'Indicado para: pacientes que desean definir el contorno, mejorar proporciones, aportar volumen o conseguir labios más hidratados. ¿En qué consiste? Se aplica ácido hialurónico mediante técnicas de inyección seleccionadas según la anatomía y el objetivo de cada paciente.' },
    ],
  },
  {
    number: '05', title: 'Medicina capilar',
    services: [
      { title: 'PRP capilar', description: 'Tratamiento de bioestimulación capilar que utiliza plasma rico en plaquetas obtenido de la propia sangre del paciente.', note: 'Indicado para: determinados tipos de caída del cabello y para protocolos destinados a mejorar la calidad y el grosor del cabello. ¿En qué consiste? Se obtiene una muestra de sangre, se procesa para obtener el PRP y posteriormente se realizan microinyecciones en el cuero cabelludo.' },
    ],
  },
  {
    number: '06', title: 'Tratamientos corporales',
    services: [
      { title: 'Mesoterapia corporal', description: 'Tratamiento basado en la aplicación localizada de activos mediante pequeñas microinyecciones.', note: 'Indicado para: determinados protocolos destinados a mejorar la apariencia y calidad de la piel corporal, de acuerdo con las necesidades de cada paciente. ¿En qué consiste? Se aplican pequeñas cantidades de activos mediante microinyecciones superficiales en la zona seleccionada.' },
    ],
  },
];



/* ─── About Section ──────────────────────────────── */
function About() {
  return (
    <section id="sobre-mi" className="glow-border relative overflow-hidden bg-[#e7ded2] text-[#211b18]">
      <div className="absolute right-0 top-0 hidden h-full w-[37%] bg-[#dacbb9] lg:block" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 lg:px-12">

        {/* Image col */}
        <div className="relative order-2 self-end lg:order-1">
          {/* Corner decoration */}
          <div className="about-corner absolute -left-5 -top-5 h-24 w-24 border-l border-t border-[#9d7b50] sm:-left-8 sm:-top-8" aria-hidden="true" />
          <div id="about-image-wrap"
            className="relative mx-auto max-w-[420px] overflow-hidden bg-[#211b18] lg:mx-0"
            style={{ clipPath: 'inset(0 0 100% 0)' }}>
            <img src={aboutPortraitPath} alt="Dra. María Pía Gelso — consultorio de medicina estética en Córdoba"
              loading="lazy" decoding="async"
              className="about-portrait aspect-[.82] w-full object-cover grayscale-[.1]"
              style={{ transform: 'scale(1.1)' }}
              data-testid="img-about-portrait" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#211b18] to-transparent p-6 pt-16">
              <p className="font-display text-2xl text-[#f5eee4]">Dra. María Pía Gelso</p>
              <p className="mt-1 text-[.6rem] uppercase tracking-[.2em] text-[#cdb38b]">MP 47298</p>
            </div>
          </div>
        </div>

        {/* Text col */}
        <div className="about-text-block order-1 flex flex-col justify-center lg:order-2">
          <span className="eyebrow !text-[#94734e] about-text-block">Una mirada personal</span>
          <h2 className="about-text-block mt-6 max-w-[630px] font-display text-[3.7rem] leading-[.9] tracking-[-.025em] sm:text-[5.2rem]"
            data-testid="text-about-title">
            La estética<br /><em>también es</em><br />escucha.
          </h2>
          <div className="about-text-block mt-8 grid max-w-[590px] gap-5 border-t border-[#9d7b50]/35 pt-7 sm:grid-cols-[1fr_1fr]">
            <p className="text-[.83rem] leading-7 text-[#574d46]">
              Soy la Dra. María Pía Gelso, médica dedicada a la Medicina Estética Integral. Creo en una estética que acompaña, no que transforma quién sos.
            </p>
            <p className="text-[.83rem] leading-7 text-[#574d46]">
              Cada tratamiento empieza con una conversación y una evaluación. El objetivo es que te reconozcas en el espejo, con resultados naturales y armónicos.
            </p>
          </div>
          <a href={appointmentUrl} target="_blank" rel="noreferrer"
            className="about-text-block mt-9 inline-flex w-fit items-center gap-3 border-b border-[#94734e] pb-3 text-[.64rem] font-bold uppercase tracking-[.2em] text-[#4a3b2e] transition hover:border-[#211b18] hover:text-[#211b18]"
            data-testid="link-about-appointment">
            Conocé mi enfoque <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Treatment Accordion ────────────────────────── */
function TreatmentAccordion() {
  const [open, setOpen] = useState(0);
  const activeTreatment = treatments[open];
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-[.78fr_1.22fr] lg:gap-5">
      <div className="space-y-2">
        {treatments.map((treatment, index) => {
          const expanded = open === index;
          return (
            <button type="button" key={treatment.number}
              className={`treatment-card group flex w-full items-center gap-4 border px-4 py-4 text-left transition sm:px-5 sm:py-5 ${expanded ? 'treatment-card-active' : ''}`}
              onClick={() => setOpen(index)}
              aria-pressed={expanded}
              data-testid={`button-treatment-${treatment.number}`}>
              <span className="font-display text-lg text-[#cdb38b]">{treatment.number}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[1.25rem] leading-[.95] text-[#f5eee4] sm:text-[1.5rem]">{treatment.title}</span>
                <span className="mt-2 block text-[.56rem] font-bold uppercase tracking-[.16em] text-[#9e9185]">
                  {treatment.services.length} {treatment.services.length === 1 ? 'protocolo' : 'protocolos'}
                </span>
              </span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-[#cdb38b] transition-transform duration-300 ${expanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
            </button>
          );
        })}
      </div>

      <div className="treatment-detail-panel min-h-[420px] border border-[#cdb38b]/25 bg-[#1c1610] p-5 sm:p-7 lg:p-8" aria-live="polite">
        <div className="flex items-start justify-between gap-5 border-b border-[#cdb38b]/20 pb-5">
          <div>
            <span className="eyebrow">Área de tratamiento</span>
            <h3 className="mt-3 max-w-[430px] font-display text-[2rem] leading-[.93] text-[#f5eee4] sm:text-[2.6rem]">{activeTreatment.title}</h3>
          </div>
          <span className="font-display text-4xl text-[#cdb38b]/50">{activeTreatment.number}</span>
        </div>
        <div className="mt-6 space-y-7">
          {activeTreatment.services.map((service, serviceIndex) => (
            <article key={service.title} className="service-detail">
              <div className="flex gap-3">
                <span className="pt-1 text-[.58rem] font-bold tracking-[.16em] text-[#cdb38b]">0{serviceIndex + 1}</span>
                <div>
                  <h4 className="font-display text-[1.35rem] leading-tight text-[#f5eee4] sm:text-[1.55rem]">{service.title}</h4>
                  <p className="mt-2 text-[.76rem] leading-6 text-[#c7b9ac]">{service.description}</p>
                  {service.note && <p className="mt-2 text-[.7rem] leading-6 text-[#998d82]">{service.note}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <a href={appointmentUrl} target="_blank" rel="noreferrer"
          className="mt-7 inline-flex items-center gap-3 border-b border-[#cdb38b] pb-2 text-[.6rem] font-bold uppercase tracking-[.18em] text-[#cdb38b] transition hover:text-[#f0d9ae]"
          data-testid="link-treatment-appointment">
          Consultar por este protocolo <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ─── Treatments Section ─────────────────────────── */
function Treatments() {
  return (
    <section id="tratamientos" className="bg-[#171411]">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-24">
          <div>
            <span className="eyebrow treatments-title-word">Tratamientos</span>
            <h2 className="mt-6 max-w-[450px] font-display text-[4rem] leading-[.87] tracking-[-.025em] text-[#f5eee4] sm:text-[5.4rem]"
              data-testid="text-treatments-title">
              <span className="treatments-title-word block">Tu belleza,</span>
              <em className="text-[#cdb38b] treatments-title-word">en detalle.</em>
            </h2>
          </div>
          <div className="treatments-subtitle max-w-[570px] lg:pb-2">
            <p className="text-[.86rem] leading-7 text-[#b9aca1]">
              Cada protocolo se elige con criterio médico y se adapta a lo que tu piel, tu rostro y tu historia necesitan. Conocé las áreas de trabajo y encontrá el punto de partida para tu consulta.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[.58rem] font-bold uppercase tracking-[.2em] text-[#cdb38b]">
              <span className="h-px w-10 bg-gradient-to-r from-[#cdb38b] to-transparent" />
              Precisión · Armonía · Naturalidad
            </div>
          </div>
        </div>
        <TreatmentAccordion />
        <div className="mt-14 grid gap-5 border-t border-[#cdb38b]/15 pt-5 sm:grid-cols-[.9fr_1.1fr] sm:items-center">
          <span className="text-[.6rem] font-bold uppercase tracking-[.2em] text-[#8a7060]">Una estética que se ve y se siente tuya</span>
          <div className="relative overflow-hidden">
            <img src={clinicReferencePath} alt="Interior del consultorio Gelso — medicina estética Córdoba"
              className="h-24 w-full object-cover object-center opacity-80 sm:h-32 transition-transform duration-700 hover:scale-105"
              loading="lazy"
              decoding="async"
              data-testid="img-clinic-reference" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171411]/50 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Method Section ─────────────────────────────── */
function Method() {
  return (
    <section id="metodo" className="bg-[#22190f]">
      <div className="mx-auto grid max-w-[1320px] lg:grid-cols-[1.02fr_.98fr]">
        {/* Image */}
        <div className="relative min-h-[520px] overflow-hidden lg:min-h-[680px]">
          <img id="method-image" src={methodReferencePath}
            alt="Dra. María Pía Gelso — método de medicina estética integral"
            loading="lazy" decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[50%_24%] opacity-75"
            data-testid="img-method-reference" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#22190f] via-[#22190f]/15 to-transparent" />
          {/* Gold rim */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#cdb38b]/30 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-8 left-5 right-5 flex items-end justify-between sm:left-8 sm:right-8 lg:left-12 lg:right-12">
            <span className="eyebrow">El método Gelso</span>
            <span className="font-display text-[5rem] leading-none text-[#cdb38b]/40">03</span>
          </div>
        </div>

        {/* Text */}
        <div id="method-title-wrap" className="flex flex-col justify-center px-5 py-20 sm:px-8 md:py-28 lg:px-20">
          <span className="eyebrow">La consulta</span>
          <h2 className="mt-6 font-display text-[3.8rem] leading-[.9] text-[#f5eee4] sm:text-[5rem]"
            data-testid="text-method-title">
            Primero,<br /><em className="text-[#cdb38b]">entender.</em>
          </h2>
          <div className="mt-10 space-y-5 text-[.82rem] leading-7 text-[#c3b4a7]">
            <p className="method-step flex items-start gap-3">
              <span className="shrink-0 text-[#cdb38b] font-bold">01</span>
              Escuchamos qué querés mejorar y qué esperás del proceso.
            </p>
            <p className="method-step flex items-start gap-3">
              <span className="shrink-0 text-[#cdb38b] font-bold">02</span>
              Evaluamos tu rostro, tu piel y tu historia de manera integral.
            </p>
            <p className="method-step flex items-start gap-3">
              <span className="shrink-0 text-[#cdb38b] font-bold">03</span>
              Diseñamos un plan claro, gradual y exclusivamente tuyo.
            </p>
          </div>
          <div className="mt-10 h-px w-full bg-gradient-to-r from-[#cdb38b]/40 to-transparent" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ (visible content for FAQ rich results) ─── */
function FaqSection() {
  return (
    <section id="preguntas-frecuentes" className="bg-[#171411] px-5 py-20 sm:px-8 lg:px-12" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[820px]">
        <span className="eyebrow">Preguntas frecuentes</span>
        <h2 id="faq-heading" className="mt-5 font-display text-[2.4rem] leading-[.92] tracking-[-.03em] text-[#f5eee4] sm:text-[3rem]">
          Dudas sobre turnos y consultorios
        </h2>
        <p className="mt-5 text-[.88rem] leading-7 text-[#b8aea3]">
          Respuestas claras sobre la práctica de la Dra. Gelso en Córdoba. Para tratamientos específicos, la evaluación médica es siempre el primer paso.
        </p>
        <div className="mt-10 divide-y divide-[#cdb38b]/20 border-y border-[#cdb38b]/20">
          {FAQ_ENTRIES.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="cursor-pointer list-none font-display text-lg text-[#f5eee4] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[#cdb38b] transition group-open:rotate-180" aria-hidden="true" />
                </span>
              </summary>
              <p className="mt-4 text-[.88rem] leading-7 text-[#c9bfb3]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact & Locations ────────────────────────── */
function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-[#dfd2c4] text-[#211b18]" aria-labelledby="locations-heading">
      <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full border border-[#9d7b50]/20 sm:-right-10 sm:-top-48 sm:h-[620px] sm:w-[620px]" aria-hidden="true" />
      <div className="absolute -right-4 -top-12 h-64 w-64 rounded-full border border-[#9d7b50]/15 sm:right-16 sm:-top-24 sm:h-[420px] sm:w-[420px]" aria-hidden="true" />
      <div className="absolute -right-32 top-1/2 h-[800px] w-[800px] -translate-y-1/2 rounded-full border border-[#9d7b50]/08" aria-hidden="true" />

      <div id="ubicaciones" className="relative mx-auto max-w-[1320px] scroll-mt-28 px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <header className="contact-intro mb-12 max-w-[720px] lg:mb-14">
          <span className="eyebrow !text-[#94734e]">Consultorios · MP 47298</span>
          <h2
            id="locations-heading"
            className="mt-5 font-display text-[3rem] leading-[.9] tracking-[-.03em] text-[#211b18] sm:text-[4.2rem]"
            data-testid="text-locations-title"
          >
            Dónde encontrarnos en <em className="text-[#7a5c3a]">Córdoba</em>
          </h2>
          <p className="contact-intro-body mt-6 text-[.88rem] leading-7 text-[#574d46] sm:text-[.94rem]">
            Dra. María Pía Gelso — medicina estética integral en <strong className="font-semibold text-[#3d342e]">Río Segundo</strong> y{' '}
            <strong className="font-semibold text-[#3d342e]">Pilar</strong>. Consultá rutas en el mapa o solicitá turno por WhatsApp.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-7">
          {clinicLocations.map((location) => (
            <article
              key={location.city}
              className="location-card group overflow-hidden bg-[#ebe0d2] shadow-[0_24px_60px_rgba(33,27,24,.07)] ring-1 ring-[#9d7b50]/30 transition-shadow duration-500 hover:shadow-[0_28px_70px_rgba(33,27,24,.11)]"
              itemScope
              itemType="https://schema.org/MedicalClinic"
              data-testid={`location-${location.slug}`}
            >
              <meta itemProp="name" content={`Gelso — Consultorio ${location.city}`} />
              <meta itemProp="telephone" content="+543572665637" />
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <meta itemProp="streetAddress" content={location.address} />
                <meta itemProp="addressLocality" content={location.city} />
                <meta itemProp="addressRegion" content="Córdoba" />
                <meta itemProp="postalCode" content={location.postalCode} />
                <meta itemProp="addressCountry" content="AR" />
              </div>
              <meta itemProp="latitude" content={String(location.latitude)} />
              <meta itemProp="longitude" content={String(location.longitude)} />
              <link itemProp="hasMap" href={location.mapsUrl} />

              <div className="location-map-frame relative aspect-[5/3] w-full overflow-hidden bg-[#cfc0ae] sm:aspect-[16/10]">
                <iframe
                  title={`Mapa del consultorio Gelso en ${location.city}, Córdoba — ${location.address}`}
                  src={location.embedUrl}
                  className="absolute inset-0 h-full w-full border-0 transition duration-700 group-hover:scale-[1.01]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#ebe0d2]/80 to-transparent" aria-hidden="true" />
              </div>

              <div className="flex flex-col gap-5 border-t border-[#9d7b50]/25 px-6 py-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[.58rem] font-bold uppercase tracking-[.22em] text-[#94734e]">Consultorio</p>
                  <h3 className="mt-2 font-display text-2xl text-[#211b18]">{location.city}</h3>
                  <p className="mt-2 flex items-start gap-2 text-[.8rem] leading-6 text-[#574d46]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#94734e]" aria-hidden="true" />
                    <span>
                      <span className="block font-medium text-[#3d342e]">{location.address}</span>
                      {location.region}
                      <span className="mt-1 block text-[.72rem] text-[#6b5f55]">{location.seoLine}</span>
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#211b18] px-5 py-3.5 text-[.62rem] font-bold uppercase tracking-[.16em] text-[#f5eee4] transition hover:bg-[#3a2d22]"
                  >
                    Cómo llegar <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={appointmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-1 py-1 text-[.62rem] font-bold uppercase tracking-[.14em] text-[#574d46] transition hover:text-[#211b18]"
                  >
                    Turno WhatsApp <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="contact-info-col mt-14 grid gap-8 border-t border-[#9d7b50]/35 pt-8 text-[.67rem] font-semibold uppercase tracking-[.16em] text-[#665548] sm:grid-cols-3">
          <div>
            <span className="mb-2 block text-[#94734e]">Turnos</span>
            <a
              href={appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 normal-case tracking-normal transition hover:text-[#211b18]"
              data-testid="link-contact-whatsapp"
            >
              WhatsApp · Solicitar turno
            </a>
          </div>
          <div>
            <span className="mb-2 block text-[#94734e]">Teléfono</span>
            <a href={phoneUrl} className="normal-case tracking-normal transition hover:text-[#211b18]" data-testid="link-contact-phone-detail">
              3572 665637
            </a>
          </div>
          <div>
            <span className="mb-2 block text-[#94734e]">Instagram</span>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 normal-case tracking-normal transition hover:text-[#211b18]"
              data-testid="link-contact-instagram"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" /> @Dra.gelso
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#100e0b] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo completo con todos sus textos visibles */}
        <div className="flex flex-col items-start gap-4">
          <BrandMark />
          <p className="text-[.59rem] uppercase tracking-[.18em] text-[#887a6f]">
            MP 47298 · Nueva Córdoba · Pilar · Río Segundo
          </p>
        </div>
        <div className="max-w-[400px] text-[.62rem] leading-5 text-[#887a6f]">
          <p>La información de este sitio es educativa y no sustituye una consulta médica. Cada tratamiento requiere evaluación individual.</p>
          <p className="mt-3 text-[#cdb38b]">© {new Date().getFullYear()} Gelso · Córdoba, Argentina</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Home Page ──────────────────────────────────── */
function Home() {
  useGSAPInit();
  useDocumentSeo({ injectStructuredData: true });

  return (
    <div className="site-grain min-h-[100dvh]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[#f5eee4] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#100e0b]"
      >
        Saltar al contenido principal
      </a>
      <ScrollProgressBar />
      <Header />
      <main id="main-content">
        <Hero />
        <Pillars />
        <About />
        <Treatments />
        <Method />
        <FaqSection />
        <Contact />
      </main>
      <Footer />

      {/* Floating CTA */}
      <a href={appointmentUrl} target="_blank" rel="noreferrer"
        className="floating-cta btn-magnetic fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full px-5 py-3.5 text-[.58rem] font-bold uppercase tracking-[.12em] text-[#171411] shadow-[0_8px_30px_rgba(205,179,139,.35)] transition-shadow hover:shadow-[0_8px_40px_rgba(205,179,139,.55)] sm:bottom-8 sm:right-8"
        data-testid="link-floating-appointment">
        <WhatsAppIcon className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Solicitar turno</span>
        <span className="sm:hidden">Turno</span>
      </a>
    </div>
  );
}

/* ─── Router ─────────────────────────────────────── */
function Router() {
  return (
    <ErrorBoundary resetKey={window.location.pathname}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

/* ─── App Root ───────────────────────────────────── */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;