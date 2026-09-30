import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * The whole site is prerendered to static HTML at build time (SSG).
 * The output in dist/…/browser can be uploaded to any static web host (Apache, Netlify, …).
 * Unknown URLs fall back to the prerendered /404 page (see public/.htaccess).
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'leistungen', renderMode: RenderMode.Prerender },
  { path: 'katzen-ernaehrungsberatung', renderMode: RenderMode.Prerender },
  { path: 'ueber-mich', renderMode: RenderMode.Prerender },
  { path: 'galerie', renderMode: RenderMode.Prerender },
  { path: 'zertifikate', renderMode: RenderMode.Prerender },
  { path: 'kontakt', renderMode: RenderMode.Prerender },
  { path: 'impressum', renderMode: RenderMode.Prerender },
  { path: 'datenschutz', renderMode: RenderMode.Prerender },
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
