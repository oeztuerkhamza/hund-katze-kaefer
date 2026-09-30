import { Routes } from '@angular/router';

import { PageSeo } from './core/seo';

/** Every route carries its own SEO data; SeoTitleStrategy applies it on navigation. */
const seo = (data: PageSeo) => ({ seo: data });

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home'),
    title: 'Tierbetreuung Freiburg – Hund, Katze & Kleintier bei Ihnen zu Hause',
    data: seo({
      description:
        'Liebevolle Tierbetreuung in Freiburg und Umgebung: Katzenbetreuung, Gassi-Service und Kleintierbetreuung bei Ihnen zu Hause – plus zertifizierte Ernährungsberatung für Katzen.',
      schema: 'business',
      rawTitle: true,
    }),
  },
  {
    path: 'leistungen',
    loadComponent: () => import('./pages/services/services'),
    title: 'Leistungen & Preise',
    data: seo({
      description:
        'Katzenbetreuung, Gassi-Service, Kleintierbetreuung, Ernährungsberatung für Katzen und Urlaubs-Extras: alle Leistungen und Preise von Hund · Katze · Käfer in Freiburg.',
    }),
  },
  {
    path: 'katzen-ernaehrungsberatung',
    loadComponent: () => import('./pages/cat-coaching/cat-coaching'),
    title: 'Cat Coaching & Ernährungsberatung für Katzen',
    data: seo({
      description:
        'Zertifizierte Ernährungsberatung für Katzen in Freiburg: artgerechte Fütterung, Begleitung bei Krankheit und Spezialisierung auf Darmgesundheit. 25 € pro angefangene halbe Stunde.',
    }),
  },
  {
    path: 'ueber-mich',
    loadComponent: () => import('./pages/about/about'),
    title: 'Über mich – Karin Käfer',
    data: seo({
      description:
        'Karin Käfer, Ihre Tierbetreuerin in Freiburg: vom Logistik-Management zur professionellen Haustierbetreuung – zuverlässig, pünktlich und mit viel Herz.',
    }),
  },
  {
    path: 'galerie',
    loadComponent: () => import('./pages/gallery/gallery'),
    title: 'Galerie meiner Schützlinge',
    data: seo({
      description:
        'Hunde, Katzen, Kleintiere und lustige Outtakes: Ein Blick auf die Tiere, die Hund · Katze · Käfer in Freiburg regelmäßig betreut.',
    }),
  },
  {
    path: 'zertifikate',
    loadComponent: () => import('./pages/certificates/certificates'),
    title: 'Zertifikate & Weiterbildungen',
    data: seo({
      description:
        'Abschluss als Ernährungsberaterin für Katzen und laufende Fortbildungen zu Katzengesundheit, Darmgesundheit und Tierernährung – alle Nachweise im Überblick.',
    }),
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./pages/contact/contact'),
    title: 'Kontakt & Anfrage',
    data: seo({
      description:
        'Tierbetreuung in Freiburg anfragen: Rufen Sie an, schreiben Sie eine E-Mail oder nutzen Sie das Anfrageformular für ein unverbindliches Kennenlernen.',
    }),
  },
  {
    path: 'impressum',
    loadComponent: () => import('./pages/legal/imprint'),
    title: 'Impressum',
    data: seo({ description: 'Impressum von Hund · Katze · Käfer – Tierbetreuung Freiburg.' }),
  },
  {
    path: 'datenschutz',
    loadComponent: () => import('./pages/legal/privacy'),
    title: 'Datenschutzerklärung',
    data: seo({
      description: 'Datenschutzerklärung von Hund · Katze · Käfer – Tierbetreuung Freiburg.',
    }),
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found'),
    title: 'Seite nicht gefunden',
    data: seo({ description: 'Diese Seite existiert nicht (mehr).', noindex: true }),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found'),
    title: 'Seite nicht gefunden',
    data: seo({ description: 'Diese Seite existiert nicht (mehr).', noindex: true }),
  },
];
