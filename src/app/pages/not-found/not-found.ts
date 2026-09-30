import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MAIN_NAV } from '../../core/site';
import { Ladybug } from '../../shared/ladybug';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Ladybug],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container nf">
      <app-ladybug class="nf__bug" />
      <h1>Diese Seite ist davongekrabbelt</h1>
      <p class="lead">
        Die Adresse gibt es nicht (mehr). Vielleicht finden Sie hier, was Sie suchen:
      </p>
      <ul class="nf__links">
        <li><a class="btn btn--primary" routerLink="/">Zur Startseite</a></li>
        @for (item of nav; track item.path) {
          <li>
            <a class="btn btn--outline" [routerLink]="item.path">{{ item.label }}</a>
          </li>
        }
        <li><a class="btn btn--outline" routerLink="/kontakt">Kontakt</a></li>
      </ul>
    </section>
  `,
  styles: `
    .nf {
      display: grid;
      justify-items: start;
      gap: var(--space-m);
      padding-block: var(--space-2xl);
    }
    .nf__bug {
      width: 4.5rem;
      height: 4.5rem;
      rotate: 35deg;
    }
    h1 {
      max-width: 16ch;
    }
    .nf__links {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      margin: var(--space-s) 0 0;
      padding: 0;
    }
  `,
})
export default class NotFound {
  protected readonly nav = MAIN_NAV;
}
