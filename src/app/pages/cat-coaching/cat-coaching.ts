import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site';
import { CERTIFICATES } from '../../content/certificates';
import { CtaBand } from '../../shared/cta-band';
import { Icon } from '../../shared/icon';
import { PageIntro } from '../../shared/page-intro';
import { PriceTag } from '../../shared/price-tag';

@Component({
  selector: 'app-cat-coaching',
  imports: [RouterLink, CurrencyPipe, Icon, PageIntro, PriceTag, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cat-coaching.html',
  styleUrl: './cat-coaching.scss',
})
export default class CatCoaching {
  protected readonly site = SITE;
  protected readonly certificateCount = CERTIFICATES.length;
  /** Courses on gut health – shown as proof for the specialisation. */
  protected readonly gutCourses = CERTIFICATES.filter((c) =>
    /darm|verdauung|bauchhirn/i.test(c.title),
  )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  protected readonly audiences = [
    {
      icon: 'heart',
      title: 'Gesunde Katzen',
      text: 'Artgerechte, bedarfsgerechte Fütterung, damit Ihre Katze lange gesund bleibt.',
    },
    {
      icon: 'bowl',
      title: 'Kranke Katzen',
      text: 'Fütterungspläne bei akuten und chronischen Erkrankungen – und Diagnosen, verständlich erklärt.',
    },
    {
      icon: 'home',
      title: 'Neue Katzen',
      text: 'Vorbereitung, bevor eine Samtpfote einzieht: Futter, Zubehör und eine katzensichere Wohnung.',
    },
  ] as const;
}
