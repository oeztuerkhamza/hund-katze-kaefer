import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Heading block at the top of every sub page. Extra content (buttons, meta) can be projected. */
@Component({
  selector: 'app-page-intro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="intro">
      <div class="container intro__inner">
        <h1>{{ heading() }}</h1>
        @if (lead()) {
          <p class="lead">{{ lead() }}</p>
        }
        <ng-content />
      </div>
    </header>
  `,
  styles: `
    .intro {
      padding-block: var(--space-xl) var(--space-l);
      border-bottom: 1px solid var(--line);
    }
    .intro__inner {
      display: grid;
      gap: var(--space-m);
      justify-items: start;
    }
    h1 {
      max-width: 18ch;
    }
    .lead {
      max-width: 52ch;
    }
  `,
})
export class PageIntro {
  readonly heading = input.required<string>();
  readonly lead = input<string>();
}
