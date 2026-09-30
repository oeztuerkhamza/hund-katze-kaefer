/**
 * Central business data. Everything that appears in several places (header, footer,
 * contact page, imprint, structured data) is maintained here – change it once.
 */
export const SITE = {
  name: 'Hund · Katze · Käfer',
  legalName: 'Hund – Katze – Käfer Tierbetreuung Freiburg',
  claim: 'Tierbetreuung bei Ihnen zu Hause',
  url: 'https://www.hund-katze-kaefer.de',
  owner: 'Karin Käfer',
  phone: { display: '0179 6664262', href: 'tel:+491796664262', e164: '+49 179 6664262' },
  /** Stored in parts so the address is only assembled in the browser (light spam protection). */
  email: { user: 'karin', domain: 'hund-katze-kaefer.de' },
  address: {
    street: 'Draisstraße 9',
    zip: '79106',
    city: 'Freiburg im Breisgau',
    cityShort: 'Freiburg',
    region: 'Baden-Württemberg',
    country: 'DE',
  },
  serviceArea: 'Freiburg und Umgebung',
  /** Existing PDFs from the old site – copy the /PDF folder into /public. */
  documents: {
    terms: 'PDF/NEU2025AGB-Hund-Katze-Kaefer.pdf',
    inquiry: 'PDF/Anfrage-Hund-Katze-Kaefer.pdf',
  },
  pricing: {
    consultationPerHalfHour: 25,
    travelPerKm: 0.7,
  },
  links: {
    academy: 'https://www.naturheilkundeschule.de',
    catRescue: 'https://www.katzen-not-hilfe-breisgau.de',
  },
  foundedYear: 2018,
} as const;

export interface NavItem {
  readonly label: string;
  readonly path: string;
}

export const MAIN_NAV: readonly NavItem[] = [
  { label: 'Leistungen', path: '/leistungen' },
  { label: 'Katzen-Coaching', path: '/katzen-ernaehrungsberatung' },
  { label: 'Über mich', path: '/ueber-mich' },
  { label: 'Galerie', path: '/galerie' },
  { label: 'Zertifikate', path: '/zertifikate' },
];

export const LEGAL_NAV: readonly NavItem[] = [
  { label: 'Impressum', path: '/impressum' },
  { label: 'Datenschutz', path: '/datenschutz' },
];
