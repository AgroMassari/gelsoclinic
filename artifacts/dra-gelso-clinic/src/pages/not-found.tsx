import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { SITE_URL } from '@/lib/site-seo';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Página no encontrada | Dra. Gelso';
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', 'La página solicitada no existe. Volvé al inicio del sitio de la Dra. María Pía Gelso.');
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute('content', 'noindex, follow');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, follow';
      document.head.appendChild(meta);
    }
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = `${SITE_URL}/404`;
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#100e0b] px-4">
      <Card className="w-full max-w-md border-[#cdb38b]/25 bg-[#171411] text-[#f5eee4]">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-[#cdb38b]" aria-hidden="true" />
            <h1 className="text-2xl font-display font-medium">Página no encontrada</h1>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#b8aea3]">
            El enlace que seguiste no corresponde a una sección de este sitio. Podés volver al inicio para ver tratamientos, ubicaciones y turnos.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex items-center justify-center border border-[#cdb38b]/60 px-5 py-3 text-[.65rem] font-bold uppercase tracking-[.16em] text-[#f5eee4] transition hover:border-[#cdb38b]"
          >
            Ir al inicio
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
