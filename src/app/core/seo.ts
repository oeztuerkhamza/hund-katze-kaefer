import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { SITE } from './site';
import { SERVICES } from '../content/services';
import { environment } from '../../environments/environment';

export interface PageSeo {
  readonly description: string;
  /** Adds structured data for the business (JSON-LD). */
  readonly schema?: 'business';
  /** Use the route title as-is instead of appending the brand name. */
  readonly rawTitle?: boolean;
  readonly noindex?: boolean;
  readonly image?: string;
}

const BRAND_SUFFIX = ' | Hund · Katze · Käfer Freiburg';
const DEFAULT_IMAGE = '/og-image.jpg';
const JSON_LD_ID = 'ld-business';

/**
 * Replaces the default TitleStrategy: on every navigation it sets the document title,
 * meta description, canonical URL, Open Graph / Twitter tags, robots and JSON-LD.
 * Runs during prerendering, so every static HTML file ships with complete SEO markup.
 */
@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let route = snapshot.root;
    while (route.firstChild) route = route.firstChild;

    const seo = route.data['seo'] as PageSeo | undefined;
    const pageTitle = this.buildTitle(snapshot) ?? SITE.legalName;
    const fullTitle = seo?.rawTitle ? `${pageTitle} | ${SITE.name}` : pageTitle + BRAND_SUFFIX;
    const path = snapshot.url.split(/[?#]/)[0];
    const canonical = SITE.url + (path === '/' ? '/' : path.replace(/\/$/, ''));
    const image = SITE.url + (seo?.image ?? DEFAULT_IMAGE);
    const noindex = environment.noindex || !!seo?.noindex;

    this.title.setTitle(fullTitle);
    this.setName('description', seo?.description ?? '');
    this.setName('robots', noindex ? 'noindex, follow' : 'index, follow');
    this.setProperty('og:title', fullTitle);
    this.setProperty('og:description', seo?.description ?? '');
    this.setProperty('og:url', canonical);
    this.setProperty('og:image', image);
    this.setName('twitter:title', fullTitle);
    this.setName('twitter:description', seo?.description ?? '');
    this.setCanonical(noindex ? null : canonical);
    this.setJsonLd(seo?.schema === 'business' ? businessSchema() : null);
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name="${name}"`);
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property="${property}"`);
  }

  private setCanonical(href: string | null): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!href) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = href;
  }

  private setJsonLd(data: object | null): void {
    const existing = this.document.getElementById(JSON_LD_ID);
    if (!data) {
      existing?.remove();
      return;
    }
    const script = existing ?? this.document.createElement('script');
    script.id = JSON_LD_ID;
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(data);
    if (!existing) this.document.head.appendChild(script);
  }
}

/** schema.org LocalBusiness as a service-area business (no street address published). */
export function businessSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}/#business`,
    name: SITE.legalName,
    alternateName: SITE.name,
    description:
      'Professionelle Haustierbetreuung bei Ihnen zu Hause in Freiburg und Umgebung sowie zertifizierte Ernährungsberatung für Katzen.',
    url: SITE.url,
    image: SITE.url + DEFAULT_IMAGE,
    logo: SITE.url + '/icons/icon-512.png',
    telephone: SITE.phone.e164,
    email: `${SITE.email.user}@${SITE.email.domain}`,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      postalCode: SITE.address.zip,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: { '@type': 'City', name: 'Freiburg im Breisgau' },
    founder: {
      '@type': 'Person',
      name: SITE.owner,
      jobTitle: 'Tierbetreuerin & Ernährungsberaterin für Katzen',
    },
    knowsAbout: [
      'Katzenernährung',
      'Darmgesundheit bei Katzen',
      'Haustierbetreuung',
      'Hundebetreuung',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leistungen',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.summary },
        ...(s.id === 'ernaehrungsberatung'
          ? {
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: SITE.pricing.consultationPerHalfHour,
                priceCurrency: 'EUR',
                referenceQuantity: { '@type': 'QuantitativeValue', value: 30, unitCode: 'MIN' },
              },
            }
          : {}),
      })),
    },
  };
}
