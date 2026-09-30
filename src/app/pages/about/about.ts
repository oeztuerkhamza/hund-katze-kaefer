import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site';
import { OWN_PETS } from '../../content/gallery';
import { CtaBand } from '../../shared/cta-band';
import { Icon } from '../../shared/icon';
import { PetPhoto } from '../../shared/pet-photo';

interface TimelineStep {
  readonly when: string;
  readonly title: string;
  readonly text?: string;
  readonly link?: boolean;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink, Icon, PetPhoto, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export default class About {
  protected readonly site = SITE;
  protected readonly cats = OWN_PETS;

  protected readonly timeline: readonly TimelineStep[] = [
    {
      when: 'Ausbildung',
      title: 'Speditionskauffrau und Fachwirtin für Güterverkehr und Logistik',
    },
    {
      when: 'Elf Jahre',
      title: 'Abteilungsleiterin Logistik bei einem Pharma-Zulieferer',
      text: 'Außenwirtschaft, Kundenbelieferung und Intralogistik – planen, koordinieren, Termine halten.',
    },
    {
      when: '2018',
      title: 'Neuanfang mit den Tieren',
      text: 'Ich entscheide mich, meiner Leidenschaft zu folgen, und mache die Tierbetreuung zu meinem Beruf.',
    },
    {
      when: '2022',
      title: 'Abschluss als Ernährungsberaterin für Katzen',
      text: 'Fernstudium an der Rolf-Schneider-Akademie.',
    },
    {
      when: '2025',
      title: 'Ausbildung zur Mykotherapeutin für Tiere',
    },
    {
      when: 'Laufend',
      title: 'Fortbildungen zu Katzengesundheit, Darm und Ernährung',
      link: true,
    },
  ];

  protected readonly values = [
    { title: 'Zuverlässigkeit', text: 'Was wir vereinbaren, gilt – ohne Wenn und Aber.' },
    { title: 'Pünktlichkeit', text: 'Futter- und Gassizeiten sind feste Termine.' },
    {
      title: 'Vertrauenswürdigkeit',
      text: 'Ihr Zuhause und Ihr Schlüssel sind bei mir in guten Händen.',
    },
    { title: 'Organisation & Absprache', text: 'Jeder Besuch ist geplant, jedes Tier im Blick.' },
    { title: 'Kommunikation', text: 'Offen und klar – vor, während und nach der Betreuung.' },
    { title: 'Professionell von A bis Z', text: 'Versichert, mit klaren AGB und festen Abläufen.' },
  ] as const;
}
