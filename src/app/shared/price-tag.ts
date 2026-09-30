import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SITE } from '../core/site';

/** Brass price tag with a hole – shaped like a pet's collar tag. */
@Component({
  selector: 'app-price-tag',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="tag">
      <span class="amount">{{ price | currency: 'EUR' : 'symbol' : '1.0-0' }}</span>
      <span class="unit">pro angefangene halbe Stunde</span>
      <span class="note">zzgl. schriftliche Nachbereitung, in der Regel weitere 30 Minuten</span>
    </p>
  `,
  styles: `
    :host {
      display: block;
      justify-self: center;
      width: min(100%, 21rem);
    }
    .tag {
      position: relative;
      display: grid;
      justify-items: center;
      gap: 0.35rem;
      margin: 0;
      padding: 3.4rem var(--space-l) var(--space-l);
      border-radius: 2.25rem 2.25rem 2.25rem 2.25rem / 3rem 3rem 2.25rem 2.25rem;
      background: linear-gradient(155deg, #f6de8e, var(--brass) 40%, #cf9f35);
      box-shadow:
        inset 0 2px 0 rgb(255 255 255 / 0.55),
        inset 0 -3px 0 rgb(0 0 0 / 0.12),
        0 30px 50px -30px rgb(0 0 0 / 0.8);
      color: var(--brass-ink);
      text-align: center;
      rotate: -4deg;
    }
    .tag::before {
      content: '';
      position: absolute;
      top: 1.1rem;
      left: 50%;
      width: 1.3rem;
      height: 1.3rem;
      translate: -50% 0;
      border-radius: 50%;
      background: var(--hole, var(--forest-deep));
      box-shadow: inset 0 2px 3px rgb(0 0 0 / 0.5);
    }
    .amount {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: var(--step-4);
      line-height: 1;
      letter-spacing: -0.03em;
    }
    .unit {
      font-weight: 700;
      font-size: var(--step-1);
      line-height: 1.25;
    }
    .note {
      max-width: 24ch;
      font-size: var(--step--1);
      opacity: 0.85;
    }
  `,
})
export class PriceTag {
  protected readonly price = SITE.pricing.consultationPerHalfHour;
}
