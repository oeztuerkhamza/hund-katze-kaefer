import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';

import { SITE } from '../core/site';

/**
 * E-mail link that is only assembled in the browser. The prerendered HTML contains
 * "karin [at] hund-katze-kaefer.de", which keeps simple address harvesters away.
 */
@Component({
  selector: 'app-email-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (ready()) {
      <a [href]="href()" [class]="linkClass()">{{ label() ?? address }}</a>
    } @else {
      <span [class]="linkClass()">{{ label() ?? obfuscated }}</span>
    }
  `,
  styles: `
    a {
      color: inherit;
    }
  `,
})
export class EmailLink {
  readonly label = input<string>();
  readonly subject = input<string>();
  readonly linkClass = input('');

  protected readonly ready = signal(false);
  protected readonly address = `${SITE.email.user}@${SITE.email.domain}`;
  protected readonly obfuscated = `${SITE.email.user} [at] ${SITE.email.domain}`;
  protected readonly href = computed(() => {
    const subject = this.subject();
    return `mailto:${this.address}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
  });

  constructor() {
    afterNextRender(() => this.ready.set(true));
  }
}
