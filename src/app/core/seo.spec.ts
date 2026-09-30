import { DOCUMENT } from '@angular/common';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { SeoTitleStrategy } from './seo';

@Component({ template: '' })
class Blank {}

describe('SeoTitleStrategy', () => {
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([
          {
            path: '',
            component: Blank,
            title: 'Startseite',
            data: { seo: { description: 'Home', schema: 'business', rawTitle: true } },
          },
          {
            path: 'leistungen',
            component: Blank,
            title: 'Leistungen & Preise',
            data: { seo: { description: 'Alle Leistungen' } },
          },
          {
            path: '404',
            component: Blank,
            title: 'Nicht gefunden',
            data: { seo: { description: 'Weg', noindex: true } },
          },
        ]),
        { provide: TitleStrategy, useClass: SeoTitleStrategy },
      ],
    });
    doc = TestBed.inject(DOCUMENT);
  });

  const meta = (selector: string) => doc.head.querySelector(selector)?.getAttribute('content');

  it('sets title, description and canonical URL for a page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/leistungen');

    expect(TestBed.inject(Title).getTitle()).toBe(
      'Leistungen & Preise | Hund · Katze · Käfer Freiburg',
    );
    expect(meta('meta[name="description"]')).toBe('Alle Leistungen');
    expect(meta('meta[property="og:url"]')).toBe('https://www.hund-katze-kaefer.de/leistungen');
    expect(doc.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.hund-katze-kaefer.de/leistungen',
    );
    expect(doc.getElementById('ld-business')).toBeNull();
  });

  it('adds LocalBusiness structured data on the home page only', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');
    const data = JSON.parse(doc.getElementById('ld-business')!.textContent!);
    expect(data['@type']).toBe('LocalBusiness');
    expect(data.address.streetAddress).toBeUndefined();

    await harness.navigateByUrl('/leistungen');
    expect(doc.getElementById('ld-business')).toBeNull();
  });

  it('marks error pages as noindex without canonical', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/404');
    expect(meta('meta[name="robots"]')).toBe('noindex, follow');
    expect(doc.head.querySelector('link[rel="canonical"]')).toBeNull();
  });
});
