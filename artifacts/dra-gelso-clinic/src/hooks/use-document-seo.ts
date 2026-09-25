import { useEffect } from 'react';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL, structuredDataJson } from '@/lib/site-seo';

type PageSeoProfile = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  injectStructuredData?: boolean;
};

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useDocumentSeo(profile: PageSeoProfile) {
  useEffect(() => {
    const title = profile.title ?? DEFAULT_TITLE;
    const description = profile.description ?? DEFAULT_DESCRIPTION;
    const canonical = profile.canonical ?? `${SITE_URL}/`;
    const robots = profile.robots ?? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

    document.title = title;
    upsertMeta('description', description);
    upsertMeta('robots', robots);
    upsertMeta('og:title', title, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:url', canonical, 'property');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', description);
    upsertLink('canonical', canonical);

    if (profile.injectStructuredData) {
      let script = document.getElementById('structured-data') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = structuredDataJson();
    }
  }, [profile.title, profile.description, profile.canonical, profile.robots, profile.injectStructuredData]);
}
