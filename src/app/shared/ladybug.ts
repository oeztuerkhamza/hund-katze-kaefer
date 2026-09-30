import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Brand mark: a ladybug ("Glückskäfer") seen from above – a nod to the name Käfer.
 * Pure SVG, scales with font-size.
 */
@Component({
  selector: 'app-ladybug',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 48 48"
      [attr.aria-hidden]="decorative() ? 'true' : null"
      [attr.role]="decorative() ? null : 'img'"
      [attr.aria-label]="decorative() ? null : 'Marienkäfer'"
    >
      <!-- head -->
      <path d="M16.5 13.2a7.5 6.6 0 0 1 15 0z" fill="#1b1f1c" />
      <circle cx="20.6" cy="10.4" r="1.3" fill="#fff" />
      <circle cx="27.4" cy="10.4" r="1.3" fill="#fff" />
      <path
        d="M19.5 7.8 16.8 3.6M28.5 7.8l2.7-4.2"
        stroke="#1b1f1c"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <!-- wing covers -->
      <path
        d="M24 13.2c-9.2 0-15.5 6.8-15.5 15.4C8.5 37.5 15.4 44 24 44s15.5-6.5 15.5-15.4c0-8.6-6.3-15.4-15.5-15.4z"
        fill="var(--ladybug, #d3302a)"
      />
      <path d="M24 13.4V44" stroke="#1b1f1c" stroke-width="1.8" />
      <!-- spots -->
      <circle cx="16.2" cy="22.6" r="3.1" fill="#1b1f1c" />
      <circle cx="31.8" cy="22.6" r="3.1" fill="#1b1f1c" />
      <circle cx="14.9" cy="32.6" r="2.6" fill="#1b1f1c" />
      <circle cx="33.1" cy="32.6" r="2.6" fill="#1b1f1c" />
      <circle cx="20" cy="39.4" r="2" fill="#1b1f1c" />
      <circle cx="28" cy="39.4" r="2" fill="#1b1f1c" />
      <!-- highlight -->
      <path
        d="M13.2 20.4c1.3-2.6 3.6-4.4 6.3-5.1"
        stroke="#fff"
        stroke-opacity=".55"
        stroke-width="1.6"
        stroke-linecap="round"
        fill="none"
      />
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      width: 2.5rem;
      height: 2.5rem;
      flex: none;
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
  `,
})
export class Ladybug {
  readonly decorative = input(true);
}
