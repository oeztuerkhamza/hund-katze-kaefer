import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './layout/footer';
import { Header } from './layout/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#inhalt" (click)="skipToContent($event)">Zum Inhalt springen</a>
    <app-header />
    <main id="inhalt" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100svh;
    }
    main {
      flex: 1;
      outline: none;
    }
  `,
})
export class App {
  private readonly document = inject(DOCUMENT);

  /** With <base href="/"> a plain "#inhalt" link would navigate to the home page – focus instead. */
  protected skipToContent(event: Event): void {
    event.preventDefault();
    const main = this.document.getElementById('inhalt');
    main?.focus();
    main?.scrollIntoView();
  }
}
