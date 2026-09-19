import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ArrowDown, ArrowUpRight, ChevronDown, Instagram, Menu, Sparkles, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
const logoPath = '/assets/gelso-logo.jpg';
const portraitPath = '/assets/dra-maria-pia.jpg';
const methodReferencePath = '/assets/gelso-method-portrait-bw.jpg';
const clinicReferencePath = '/assets/gelso-clinic-interior.jpg';

const appointmentUrl = 'https://wa.me/543572665637?text=Hola%20Dra.%20Mar%C3%ADa%20P%C3%ADa%20Gelso%2C%20quisiera%20solicitar%20un%20turno.';
const phoneUrl = 'tel:+543572665637';
const instagramUrl = 'https://www.instagram.com/Dra.gelso';

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
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

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`} data-testid="link-brand-home">
      <img src={logoPath} alt="Gelso, Medicina Estética Integral" className={`${compact ? 'h-9 w-9' : 'h-12 w-12'} rounded-full object-cover object-top`} data-testid="img-brand-logo" />
      <span className="leading-none">
        <span className="block font-display text-[1.55rem] tracking-[.17em] text-[#f5eee4]">GELSO</span>
        <span className="mt-1 block text-[.48rem] font-semibold uppercase tracking-[.29em] text-[#cdb38b]">Medicina Estética Integral</span>
      </span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['Inicio', '#inicio'], ['Sobre mí', '#sobre-mi'], ['Tratamientos', '#tratamientos'], ['Método', '#metodo'], ['Contacto', '#contacto']];
  return (
    <header className="absolute left-0 right-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <BrandMark compact />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {links.map(([label, href]) => <a className="nav-link text-[.65rem] font-semibold uppercase tracking-[.2em]" href={href} key={href} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
        </nav>
        <a href={appointmentUrl} target="_blank" rel="noreferrer" className="hidden border border-[#cdb38b]/70 px-5 py-3 text-[.61rem] font-bold uppercase tracking-[.18em] text-[#f5eee4] transition hover:bg-[#cdb38b] hover:text-[#171310] sm:block" data-testid="link-header-appointment">Solicitar turno <ArrowUpRight className="ml-2 inline-block h-3.5 w-3.5" /></a>
        <button type="button" className="rounded-full border border-[#cdb38b]/50 p-2 text-[#f5eee4] lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} data-testid="button-mobile-menu">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {menuOpen && (
        <div className="border-y border-[#cdb38b]/20 bg-[#171411]/95 px-6 py-6 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-5" aria-label="Menú móvil">
            {links.map(([label, href]) => <a href={href} onClick={() => setMenuOpen(false)} className="text-xs font-semibold uppercase tracking-[.22em] text-[#f5eee4]" key={href} data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
            <a href={appointmentUrl} target="_blank" rel="noreferrer" className="mt-2 border border-[#cdb38b] px-4 py-3 text-center text-[.62rem] font-bold uppercase tracking-[.18em] text-[#cdb38b]" data-testid="link-mobile-appointment">Solicitar turno</a>
          </nav>
        </div>
      )}
    </header>
  );
}

const pillars = [
  { number: '01', title: 'Precisión', copy: 'Cada decisión nace de una evaluación médica atenta y rigurosa.' },
  { number: '02', title: 'Armonía', copy: 'Tratamientos que respetan tus rasgos, tu identidad y tus tiempos.' },
  { number: '03', title: 'Naturalidad', copy: 'Resultados sutiles para que te reconozcas en tu mejor versión.' },
];

const treatments = [
  {
    number: '01',
    title: 'Evaluación y plan personalizado',
    services: [
      {
        title: 'Evaluación estética personalizada',
        description: 'Consulta médica en la que se analiza el rostro, la piel y las necesidades particulares de cada paciente para identificar qué tratamientos pueden ser adecuados y diseñar un plan personalizado.',
      },
      {
        title: 'Evaluación + prueba de productos',
        description: 'Evaluación del estado y las necesidades de la piel, acompañada de la aplicación de productos seleccionados especialmente para el paciente, según lo que su piel necesita.',
        note: '¿Para qué sirve? Permite conocer cómo responde la piel a determinados productos y experimentar sus efectos antes de incorporarlos a la rutina de cuidado domiciliario.',
      },
    ],
  },
  {
    number: '02',
    title: 'Toxina botulínica',
    services: [
      {
        title: 'Botox por zonas — Líneas de expresión',
        description: 'Aplicación de toxina botulínica para disminuir temporalmente la contracción de determinados músculos y suavizar las líneas de expresión.',
        note: 'Indicado principalmente para: frente, entrecejo y patas de gallo. ¿En qué consiste? Se realizan pequeñas inyecciones en puntos específicos de los músculos responsables de las líneas de expresión.',
      },
      {
        title: 'Botox para sonrisa gingival',
        description: 'Tratamiento con toxina botulínica que ayuda a disminuir la elevación excesiva del labio superior al sonreír.',
        note: 'Indicado para: pacientes que muestran una cantidad elevada de encía al sonreír. ¿En qué consiste? Se aplican pequeñas cantidades de toxina botulínica en músculos específicos que participan en la elevación del labio superior.',
      },
      {
        title: 'Botox para bruxismo',
        description: 'Tratamiento con toxina botulínica que disminuye la fuerza de contracción de los músculos involucrados en la masticación.',
        note: 'Indicado principalmente para: pacientes con hiperactividad o aumento del volumen de los músculos maseteros asociado al bruxismo. ¿En qué consiste? Se realizan pequeñas inyecciones de toxina botulínica en los músculos maseteros, luego de una evaluación individual.',
      },
      {
        title: 'Strapbox',
        description: 'Tratamiento con toxina botulínica destinado a disminuir la fuerza de contracción de determinados músculos de la zona del cuello.',
        note: '¿Para qué sirve? Ayuda a relajar la tensión muscular de esta zona y puede mejorar visualmente el aspecto del cuello y la transición entre cuello y mandíbula. ¿En qué consiste? Se realizan aplicaciones estratégicas de toxina botulínica en puntos específicos, seleccionados de acuerdo con la anatomía y los movimientos musculares de cada paciente.',
      },
    ],
  },
  {
    number: '03',
    title: 'Calidad y renovación de la piel',
    services: [
      {
        title: 'Dermaplaning',
        description: 'Exfoliación mecánica superficial que elimina células superficiales de la piel y el vello facial fino.',
        note: 'Indicado para: mejorar suavidad, luminosidad y textura de la piel. ¿En qué consiste? Se utiliza un instrumento estéril específico para realizar una exfoliación superficial y controlada.',
      },
      {
        title: 'Microneedling / Dermapen con activos seleccionados',
        description: 'Tratamiento de bioestimulación mediante microperforaciones controladas que favorecen los procesos naturales de renovación de la piel y permiten trabajar con activos seleccionados.',
        note: 'Indicado para: mejorar luminosidad, hidratación, textura y aspecto general de la piel. Puede utilizarse dentro de protocolos de BB Glow según valoración. ¿En qué consiste? Se realizan microcanales controlados mediante Dermapen y se incorporan activos seleccionados según las necesidades de la piel.',
      },
      {
        title: 'Microneedling para cicatrices, estrías y manchas',
        description: 'Protocolo de microneedling diseñado para trabajar alteraciones de textura y determinadas alteraciones pigmentarias.',
        note: 'Indicado para: determinadas cicatrices, estrías y manchas, según su tipo y características. ¿En qué consiste? Se realizan microperforaciones controladas que estimulan los procesos de reparación y remodelación de la piel. El protocolo se adapta a cada caso.',
      },
      {
        title: 'Microneedling + PRP',
        description: 'Combinación de microneedling con plasma rico en plaquetas (PRP), obtenido a partir de una muestra de sangre del propio paciente.',
        note: 'Indicado para: protocolos de bioestimulación y mejora de la calidad y textura de la piel. ¿En qué consiste? Se obtiene una pequeña muestra de sangre, se procesa para obtener el PRP y se combina con el tratamiento de microneedling.',
      },
      {
        title: 'Mesoterapia con ácido hialurónico',
        description: 'Tratamiento orientado a mejorar la hidratación y revitalización de la piel mediante pequeñas aplicaciones de ácido hialurónico.',
        note: 'Indicado para: piel deshidratada, opaca o con pérdida de luminosidad y calidad. ¿En qué consiste? Se realizan múltiples microinyecciones, utilizando un protocolo adaptado a la zona y a las necesidades de cada paciente.',
      },
      {
        title: 'Skinbooster',
        description: 'Tratamiento inyectable diseñado para mejorar la hidratación, elasticidad y calidad general de la piel mediante ácido hialurónico específico para este tipo de tratamiento.',
        note: 'Indicado para: piel deshidratada, opaca, con pérdida de elasticidad o líneas superficiales. ¿En qué consiste? Se realizan pequeñas aplicaciones de producto en puntos determinados para distribuirlo de manera uniforme en la zona a tratar.',
      },
    ],
  },
  {
    number: '04',
    title: 'Armonización facial',
    services: [
      {
        title: 'Relleno de labios con ácido hialurónico',
        description: 'Tratamiento destinado a mejorar la hidratación, definición, simetría y/o volumen de los labios.',
        note: 'Indicado para: pacientes que desean definir el contorno, mejorar proporciones, aportar volumen o conseguir labios más hidratados. ¿En qué consiste? Se aplica ácido hialurónico mediante técnicas de inyección seleccionadas según la anatomía y el objetivo de cada paciente.',
      },
    ],
  },
  {
    number: '05',
    title: 'Medicina capilar',
    services: [
      {
        title: 'PRP capilar',
        description: 'Tratamiento de bioestimulación capilar que utiliza plasma rico en plaquetas obtenido de la propia sangre del paciente.',
        note: 'Indicado para: determinados tipos de caída del cabello y para protocolos destinados a mejorar la calidad y el grosor del cabello. ¿En qué consiste? Se obtiene una muestra de sangre, se procesa para obtener el PRP y posteriormente se realizan microinyecciones en el cuero cabelludo.',
      },
    ],
  },
  {
    number: '06',
    title: 'Tratamientos corporales',
    services: [
      {
        title: 'Mesoterapia corporal',
        description: 'Tratamiento basado en la aplicación localizada de activos mediante pequeñas microinyecciones.',
        note: 'Indicado para: determinados protocolos destinados a mejorar la apariencia y calidad de la piel corporal, de acuerdo con las necesidades de cada paciente. ¿En qué consiste? Se aplican pequeñas cantidades de activos mediante microinyecciones superficiales en la zona seleccionada.',
      },
    ],
  },
];

function Hero() {
  return (
    <section id="inicio" className="relative min-h-[760px] overflow-hidden bg-[#171411] lg:min-h-[840px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(116,72,43,.27),transparent_37%),linear-gradient(110deg,#171411_0%,#171411_39%,rgba(23,20,17,.78)_58%,rgba(23,20,17,.3)_100%)]" />
      <div className="absolute right-0 top-0 h-full w-[72%] overflow-hidden lg:w-[59%]">
        <img src={portraitPath} alt="Dra. María Pía Gelso" className="hero-image h-full w-full object-cover object-top opacity-90 mix-blend-screen" data-testid="img-hero-portrait" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171411] via-[#171411]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171411] via-transparent to-[#171411]/40" />
      </div>
      <div className="relative mx-auto flex min-h-[760px] max-w-[1320px] flex-col justify-end px-5 pb-16 pt-36 sm:px-8 lg:min-h-[840px] lg:justify-center lg:px-12 lg:pb-0">
        <div className="max-w-[640px]">
          <div className="mb-7 flex items-center gap-3" data-testid="text-hero-eyebrow"><span className="h-px w-12 bg-[#cdb38b]" /><span className="eyebrow">Medicina estética integral</span></div>
          <h1 className="max-w-[600px] font-display text-[4.4rem] font-medium leading-[.84] tracking-[-.03em] text-[#f5eee4] sm:text-[6.4rem] lg:text-[7.8rem]" data-testid="text-hero-title">La belleza<br /><em className="text-[#cdb38b]">de lo sutil.</em></h1>
          <p className="mt-8 max-w-[420px] text-[.86rem] leading-7 text-[#d9cfc3] sm:text-[.95rem]">Precisión, armonía y naturalidad para acompañar tu belleza con criterio médico.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={appointmentUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center bg-[#cdb38b] px-6 py-4 text-[.64rem] font-bold uppercase tracking-[.2em] text-[#171411] transition hover:bg-[#f0d9ae]" data-testid="link-hero-appointment">Solicitar un turno <ArrowUpRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
            <a href="#tratamientos" className="inline-flex items-center px-3 py-4 text-[.64rem] font-bold uppercase tracking-[.2em] text-[#e3d6c8] transition hover:text-[#cdb38b]" data-testid="link-hero-treatments">Conocer tratamientos <ArrowDown className="ml-3 h-4 w-4" /></a>
          </div>
        </div>
        <div className="mt-16 flex items-end justify-between border-t border-[#cdb38b]/30 pt-5 lg:absolute lg:bottom-10 lg:left-12 lg:right-12 lg:mt-0">
          <span className="text-[.58rem] font-bold uppercase tracking-[.22em] text-[#cdb38b]">MP 47298</span>
          <span className="hidden text-[.58rem] font-bold uppercase tracking-[.22em] text-[#d9cfc3]/60 sm:block">Medicina estética integral</span>
          <span className="text-[.58rem] font-bold uppercase tracking-[.22em] text-[#d9cfc3]/60">Scroll para explorar <ArrowDown className="ml-2 inline-block h-3.5 w-3.5" /></span>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="border-b border-[#cdb38b]/20 bg-[#1f1a16]">
      <div className="mx-auto grid max-w-[1320px] divide-y divide-[#cdb38b]/20 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.number} delay={`reveal-delay-${index + 1}`} className="flex items-start gap-5 py-8 md:px-8 lg:py-10 first:md:pl-0 last:md:pr-0">
            <span className="font-display text-xl text-[#cdb38b]">{pillar.number}</span>
            <div><h2 className="font-display text-2xl text-[#f5eee4]">{pillar.title}</h2><p className="mt-2 max-w-[250px] text-[.72rem] leading-5 text-[#b7aaa0]">{pillar.copy}</p></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden bg-[#e7ded2] text-[#211b18]">
      <div className="absolute right-0 top-0 hidden h-full w-[37%] bg-[#dacbb9] lg:block" />
      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 lg:px-12">
        <Reveal className="relative order-2 self-end lg:order-1">
          <div className="absolute -left-5 -top-5 h-24 w-24 border-l border-t border-[#9d7b50] sm:-left-8 sm:-top-8" />
          <div className="relative mx-auto max-w-[420px] overflow-hidden bg-[#211b18] lg:mx-0">
            <img src={portraitPath} alt="Dra. María Pía Gelso" className="aspect-[.82] w-full object-cover object-top grayscale-[.1]" data-testid="img-about-portrait" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#211b18] to-transparent p-6 pt-16"><p className="font-display text-2xl text-[#f5eee4]">Dra. María Pía Gelso</p><p className="mt-1 text-[.6rem] uppercase tracking-[.2em] text-[#cdb38b]">MP 47298</p></div>
          </div>
        </Reveal>
        <Reveal className="order-1 flex flex-col justify-center lg:order-2">
          <span className="eyebrow !text-[#94734e]">Una mirada personal</span>
          <h2 className="mt-6 max-w-[630px] font-display text-[3.7rem] leading-[.9] tracking-[-.025em] sm:text-[5.2rem]" data-testid="text-about-title">La estética<br /><em>también es</em><br />escucha.</h2>
          <div className="mt-8 grid max-w-[590px] gap-5 border-t border-[#9d7b50]/40 pt-7 sm:grid-cols-[1fr_1fr]">
            <p className="text-[.83rem] leading-7 text-[#574d46]">Soy la Dra. María Pía Gelso, médica dedicada a la Medicina Estética Integral. Creo en una estética que acompaña, no que transforma quién sos.</p>
            <p className="text-[.83rem] leading-7 text-[#574d46]">Cada tratamiento empieza con una conversación y una evaluación. El objetivo es que te reconozcas en el espejo, con resultados naturales y armónicos.</p>
          </div>
          <a href={appointmentUrl} target="_blank" rel="noreferrer" className="mt-9 inline-flex w-fit items-center border-b border-[#94734e] pb-3 text-[.64rem] font-bold uppercase tracking-[.2em] text-[#4a3b2e] transition hover:border-[#211b18] hover:text-[#211b18]" data-testid="link-about-appointment">Conocé mi enfoque <ArrowUpRight className="ml-3 h-4 w-4" /></a>
        </Reveal>
      </div>
    </section>
  );
}

function TreatmentAccordion() {
  const [open, setOpen] = useState(0);
  const activeTreatment = treatments[open];
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-[.78fr_1.22fr] lg:gap-5">
      <div className="space-y-2">
        {treatments.map((treatment, index) => {
          const expanded = open === index;
          return (
            <button
              type="button"
              key={treatment.number}
              className={`treatment-card group flex w-full items-center gap-4 border px-4 py-4 text-left transition sm:px-5 sm:py-5 ${expanded ? 'treatment-card-active' : ''}`}
              onClick={() => setOpen(index)}
              aria-pressed={expanded}
              data-testid={`button-treatment-${treatment.number}`}
            >
              <span className="font-display text-lg text-[#cdb38b]">{treatment.number}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[1.25rem] leading-[.95] text-[#f5eee4] sm:text-[1.5rem]">{treatment.title}</span>
                <span className="mt-2 block text-[.56rem] font-bold uppercase tracking-[.16em] text-[#9e9185]">{treatment.services.length} {treatment.services.length === 1 ? 'protocolo' : 'protocolos'}</span>
              </span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-[#cdb38b] transition-transform ${expanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
            </button>
          );
        })}
      </div>

      <div className="treatment-detail-panel min-h-[420px] border border-[#cdb38b]/30 bg-[#211b18] p-5 sm:p-7 lg:p-8" aria-live="polite">
        <div className="flex items-start justify-between gap-5 border-b border-[#cdb38b]/25 pb-5">
          <div>
            <span className="eyebrow">Área de tratamiento</span>
            <h3 className="mt-3 max-w-[430px] font-display text-[2rem] leading-[.93] text-[#f5eee4] sm:text-[2.6rem]">{activeTreatment.title}</h3>
          </div>
          <span className="font-display text-4xl text-[#cdb38b]/60">{activeTreatment.number}</span>
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
        <a href={appointmentUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center border-b border-[#cdb38b] pb-2 text-[.6rem] font-bold uppercase tracking-[.18em] text-[#cdb38b] transition hover:text-[#f0d9ae]" data-testid="link-treatment-appointment">Consultar por este protocolo <ArrowUpRight className="ml-3 h-3.5 w-3.5" /></a>
      </div>
    </div>
  );
}

function Treatments() {
  return (
    <section id="tratamientos" className="bg-[#171411]">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-24">
            <div>
              <span className="eyebrow">Tratamientos</span>
              <h2 className="mt-6 max-w-[450px] font-display text-[4rem] leading-[.87] tracking-[-.025em] text-[#f5eee4] sm:text-[5.4rem]" data-testid="text-treatments-title">Tu belleza,<br /><em className="text-[#cdb38b]">en detalle.</em></h2>
            </div>
            <div className="max-w-[570px] lg:pb-2">
              <p className="text-[.86rem] leading-7 text-[#b9aca1]">Cada protocolo se elige con criterio médico y se adapta a lo que tu piel, tu rostro y tu historia necesitan. Conocé las áreas de trabajo y encontrá el punto de partida para tu consulta.</p>
              <div className="mt-6 flex items-center gap-4 text-[.58rem] font-bold uppercase tracking-[.2em] text-[#cdb38b]"><span className="h-px w-10 bg-[#cdb38b]" /> Precisión · Armonía · Naturalidad</div>
            </div>
          </div>
          <TreatmentAccordion />
          <div className="mt-14 grid gap-5 border-t border-[#cdb38b]/20 pt-5 sm:grid-cols-[.9fr_1.1fr] sm:items-center">
            <span className="text-[.6rem] font-bold uppercase tracking-[.2em] text-[#8f8175]">Una estética que se ve y se siente tuya</span>
            <img src={clinicReferencePath} alt="Interior de Gelso Clinic" className="h-24 w-full object-cover object-center opacity-85 sm:h-32" loading="lazy" data-testid="img-clinic-reference" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="metodo" className="bg-[#28201b]">
      <div className="mx-auto grid max-w-[1320px] lg:grid-cols-[1.02fr_.98fr]">
        <Reveal className="relative min-h-[520px] overflow-hidden lg:min-h-[650px]">
          <img src={methodReferencePath} alt="Dra. María Pía Gelso en blanco y negro" className="absolute inset-0 h-full w-full object-cover object-[50%_24%] opacity-80" data-testid="img-method-reference" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#28201b] via-[#28201b]/20 to-transparent" />
          <div className="absolute bottom-8 left-5 right-5 flex items-end justify-between sm:left-8 sm:right-8 lg:left-12 lg:right-12"><span className="eyebrow">El método Gelso</span><span className="font-display text-[5rem] leading-none text-[#cdb38b]/50">03</span></div>
        </Reveal>
        <Reveal className="flex flex-col justify-center px-5 py-20 sm:px-8 md:py-28 lg:px-20">
          <span className="eyebrow">La consulta</span>
          <h2 className="mt-6 font-display text-[3.8rem] leading-[.9] text-[#f5eee4] sm:text-[5rem]" data-testid="text-method-title">Primero,<br /><em className="text-[#cdb38b]">entender.</em></h2>
          <div className="mt-9 space-y-5 text-[.82rem] leading-7 text-[#c3b4a7]">
            <p><span className="mr-2 text-[#cdb38b]">01</span> Escuchamos qué querés mejorar y qué esperás del proceso.</p>
            <p><span className="mr-2 text-[#cdb38b]">02</span> Evaluamos tu rostro, tu piel y tu historia de manera integral.</p>
            <p><span className="mr-2 text-[#cdb38b]">03</span> Diseñamos un plan claro, gradual y exclusivamente tuyo.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-[#dfd2c4] text-[#211b18]">
      <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full border border-[#9d7b50]/25 sm:-right-10 sm:-top-48 sm:h-[620px] sm:w-[620px]" />
      <div className="absolute -right-4 -top-12 h-64 w-64 rounded-full border border-[#9d7b50]/20 sm:right-16 sm:-top-24 sm:h-[420px] sm:w-[420px]" />
      <div className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <Reveal className="max-w-[780px]">
          <span className="eyebrow !text-[#94734e]">Tu próximo paso</span>
          <h2 className="mt-6 font-display text-[4.3rem] leading-[.85] tracking-[-.03em] sm:text-[6.5rem]" data-testid="text-contact-title">Hablemos de<br /><em>tu mejor versión.</em></h2>
          <p className="mt-8 max-w-[470px] text-[.84rem] leading-7 text-[#574d46]">La primera consulta es el espacio para conocernos, evaluar tus necesidades y responder tus preguntas.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={appointmentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center bg-[#211b18] px-6 py-4 text-[.64rem] font-bold uppercase tracking-[.18em] text-[#f5eee4] transition hover:bg-[#4a3b2e]" data-testid="link-contact-whatsapp">Solicitar turno por WhatsApp <ArrowUpRight className="ml-3 h-4 w-4" /></a>
            <a href={phoneUrl} className="inline-flex items-center border border-[#211b18]/40 px-6 py-4 text-[.64rem] font-bold uppercase tracking-[.18em] text-[#211b18] transition hover:border-[#211b18]" data-testid="link-contact-phone">3572 665637</a>
          </div>
        </Reveal>
        <div className="mt-20 grid gap-8 border-t border-[#9d7b50]/35 pt-6 text-[.67rem] font-semibold uppercase tracking-[.16em] text-[#665548] sm:grid-cols-3">
          <div><span className="block mb-2 text-[#94734e]">Ubicación</span><span data-testid="text-location">Pilar, Río Segundo<br />Córdoba, Argentina</span></div>
          <div><span className="block mb-2 text-[#94734e]">Contacto</span><a href={phoneUrl} className="transition hover:text-[#211b18]" data-testid="link-contact-phone-detail">3572 665637</a></div>
          <div><span className="block mb-2 text-[#94734e]">Instagram</span><a href={instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-[#211b18]" data-testid="link-contact-instagram"><Instagram className="h-4 w-4" /> @Dra.gelso</a></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#171411] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div><BrandMark /><p className="mt-5 text-[.6rem] uppercase tracking-[.14em] text-[#887a6f]">Medicina Estética Integral · MP 47298</p></div>
        <div className="max-w-[420px] text-[.62rem] leading-5 text-[#887a6f]"><p>La información de este sitio es educativa y no sustituye una consulta médica. Cada tratamiento requiere evaluación individual.</p><p className="mt-3 text-[#cdb38b]">© {new Date().getFullYear()} Gelso · Pilar, Córdoba</p></div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="site-grain min-h-[100dvh]">
      <Header />
      <main>
        <Hero />
        <Pillars />
        <About />
        <Treatments />
        <Method />
        <Contact />
      </main>
      <Footer />
      <a href={appointmentUrl} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#cdb38b] px-4 py-3 text-[.58rem] font-bold uppercase tracking-[.12em] text-[#171411] shadow-[0_8px_25px_rgba(0,0,0,.28)] transition hover:bg-[#f0d9ae] sm:bottom-7 sm:right-7" data-testid="link-floating-appointment"><Sparkles className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Solicitar turno</span><span className="sm:hidden">Turno</span></a>
    </div>
  );
}

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