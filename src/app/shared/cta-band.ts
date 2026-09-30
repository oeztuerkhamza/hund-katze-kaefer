import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../core/site';
import { EmailLink } from './email-link';
import { Icon } from './icon';
import { Ladybug } from './ladybug';

/** Closing call to action used at the end of most pages. */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink, Icon, EmailLink, Ladybug],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta" aria-labelledby="cta-heading">
      <div class="container cta__inner">
        <div class="cta__text">
          <app-ladybug class="cta__bug" />
          <h2 id="cta-heading">{{ heading() }}</h2>
          <p>{{ text() }}</p>
        </div>
        <div class="cta__actions">
          <a class="cta__phone" [href]="site.phone.href">
            <app-icon name="phone" />
            <span>
              <small>Anrufen</small>
              {{ site.phone.display }}
            </span>
          </a>
          <div class="cta__mail">
            <app-icon name="mail" />
            <span>
              <small>E-Mail</small>
              <app-email-link subject="Anfrage Tierbetreuung" />
            </span>
          </div>
          <a class="btn btn--primary" routerLink="/kontakt" fragment="anfrage">Anfrage senden</a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './cta-band.scss',
})
export class CtaBand {
  readonly heading = input('Lernen wir uns kennen');
  readonly text = input(
    'Ich komme unverbindlich zu Ihnen nach Hause, damit wir uns – und Ihr Tier mich – in Ruhe beschnuppern können.',
  );
  protected readonly site = SITE;
}
