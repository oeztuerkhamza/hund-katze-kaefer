import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SITE } from '../../core/site';
import { EmailLink } from '../../shared/email-link';
import { PageIntro } from '../../shared/page-intro';

/*
 * Neu verfasste Datenschutzerklärung für die neue, cookie- und trackingfreie Website.
 * Vor dem Livegang bitte prüfen (lassen) und den Hosting-Anbieter (siehe Abschnitt 3) eintragen.
 */
@Component({
  selector: 'app-privacy',
  imports: [PageIntro, EmailLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './privacy.html',
  styleUrl: './legal.scss',
})
export default class Privacy {
  protected readonly site = SITE;
  /** Set the provider name once the hosting is decided, e.g. "IONOS SE, Montabaur". */
  protected readonly hostingProvider: string | null = null;
  protected readonly lastUpdated = 'September 2026';
}
