import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** A shape is either a path (`d`) or a circle (`c` = [cx, cy, r]); `fill` renders it solid. */
interface Shape {
  readonly d?: string;
  readonly c?: readonly [number, number, number];
  readonly fill?: boolean;
}

const ICONS = {
  check: [{ d: 'M5 12.5l4.5 4.5L19 7.5' }],
  phone: [
    {
      d: 'M6.8 3.5h2.5l1.5 4.1-2.1 1.4a12 12 0 0 0 6.3 6.3l1.4-2.1 4.1 1.5v2.5a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.8 5.7a2 2 0 0 1 2-2.2z',
    },
  ],
  mail: [
    {
      d: 'M4.5 5.5h15a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17V7a1.5 1.5 0 0 1 1.5-1.5z',
    },
    { d: 'M3.6 6.4 12 12.8l8.4-6.4' },
  ],
  pin: [
    { d: 'M12 21s-6.8-6.1-6.8-11.3a6.8 6.8 0 0 1 13.6 0C18.8 14.9 12 21 12 21z' },
    { c: [12, 9.6, 2.4] },
  ],
  home: [{ d: 'M3.5 11 12 4l8.5 7' }, { d: 'M5.8 9.4V20h12.4V9.4' }, { d: 'M10 20v-5h4v5' }],
  heart: [
    {
      d: 'M12 20s-7.5-4.6-7.5-10.1A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z',
    },
  ],
  shield: [
    { d: 'M12 3.5l7 2.8v5.3c0 4.4-3 7.6-7 8.9-4-1.3-7-4.5-7-8.9V6.3z' },
    { d: 'M9 12l2.1 2.1L15.2 10' },
  ],
  receipt: [
    { d: 'M6 3.5h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3z' },
    { d: 'M9 8.5h6M9 12h6M9 15.5h3.5' },
  ],
  award: [{ c: [12, 9, 5.2] }, { d: 'M8.6 13 7.3 20.5l4.7-2.4 4.7 2.4L15.4 13' }],
  calendar: [
    {
      d: 'M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7A1.5 1.5 0 0 1 5 5.5z',
    },
    { d: 'M3.5 10h17M8 3.5v4M16 3.5v4' },
  ],
  clock: [{ c: [12, 12, 8.5] }, { d: 'M12 7.5V12l3 2' }],
  download: [{ d: 'M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14' }],
  file: [{ d: 'M7 3.5h7l4 4v13H7z' }, { d: 'M14 3.5V8h4M9.5 12.5h5M9.5 16h5' }],
  external: [{ d: 'M14 4h6v6M20 4l-8.5 8.5M18 14v5.5H4.5V6H10' }],
  'chevron-left': [{ d: 'M14.5 6 8.5 12l6 6' }],
  'chevron-right': [{ d: 'M9.5 6l6 6-6 6' }],
  close: [{ d: 'M6 6l12 12M18 6 6 18' }],
  menu: [{ d: 'M4 7h16M4 12h16M4 17h16' }],
  key: [{ c: [8, 15.5, 3.8] }, { d: 'M10.8 12.8 19.5 4M16 7.5l2.5 2.5M13.7 9.8l2 2' }],
  leaf: [{ d: 'M5 19C5 11 10 5.5 19.5 5c0 9.5-5.5 14-14.5 14z' }, { d: 'M5 19c3-4.2 6-7 10-9' }],
  paw: [
    { c: [6.4, 10.2, 1.9] },
    { c: [9.8, 6.4, 1.9] },
    { c: [14.2, 6.4, 1.9] },
    { c: [17.6, 10.2, 1.9] },
    {
      d: 'M12 11.8c-2.7 0-5.4 3.3-5.4 5.7 0 1.5 1.1 2.4 2.5 2.4 1.2 0 1.9-.6 2.9-.6s1.7.6 2.9.6c1.4 0 2.5-.9 2.5-2.4 0-2.4-2.7-5.7-5.4-5.7z',
    },
  ],
  cat: [
    {
      d: 'M4.6 19.5c-.1-2.4 0-6.1.5-8.6L4.4 4l4.4 3.1a8.8 8.8 0 0 1 6.4 0L19.6 4l-.7 6.9c.5 2.5.6 6.2.5 8.6z',
    },
    { c: [9.4, 13.2, 0.95], fill: true },
    { c: [14.6, 13.2, 0.95], fill: true },
    { d: 'M11.2 16.1h1.6L12 17z' },
  ],
  dog: [
    { d: 'M7.6 5.6C5.5 5.8 4 7 3.6 9.3L3 13.3c-.1 1 .8 1.6 1.7 1.1L6.6 13' },
    { d: 'M16.4 5.6c2.1.2 3.6 1.4 4 3.7l.6 4c.1 1-.8 1.6-1.7 1.1L17.4 13' },
    {
      d: 'M6.6 9.6c0-2.5 2.4-4.1 5.4-4.1s5.4 1.6 5.4 4.1v5.3c0 2.8-2.4 4.6-5.4 4.6s-5.4-1.8-5.4-4.6z',
    },
    { c: [9.8, 11.4, 0.95], fill: true },
    { c: [14.2, 11.4, 0.95], fill: true },
    { d: 'M10.8 14.9h2.4L12 16.2z' },
  ],
  rabbit: [
    { d: 'M9.6 11.2C8 8.2 7.6 4.2 9 3.7s3 3.4 3 7' },
    { d: 'M14.4 11.2c1.6-3 2-7 .6-7.5S12 7.1 12 10.7' },
    { d: 'M6.3 15.6c0-2.6 2.6-4.7 5.7-4.7s5.7 2.1 5.7 4.7-2.6 4.4-5.7 4.4-5.7-1.8-5.7-4.4z' },
    { c: [10, 15, 0.9], fill: true },
    { c: [14, 15, 0.9], fill: true },
  ],
  bowl: [
    { d: 'M3.5 12.5h17c0 4.2-3.8 7-8.5 7s-8.5-2.8-8.5-7z' },
    { c: [8.6, 9.6, 1.2] },
    { c: [12, 8.4, 1.2] },
    { c: [15.4, 9.6, 1.2] },
  ],
} satisfies Record<string, readonly Shape[]>;

export type IconName = keyof typeof ICONS;

/**
 * Inline SVG icon set (no icon font, no extra requests). Decorative by default;
 * pass `label` when the icon carries meaning on its own.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'icon' },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.aria-hidden]="label() ? null : 'true'"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label() || null"
      focusable="false"
    >
      @for (shape of shapes(); track $index) {
        @if (shape.d) {
          <path [attr.d]="shape.d" [attr.fill]="shape.fill ? 'currentColor' : null" />
        } @else if (shape.c) {
          <circle
            [attr.cx]="shape.c[0]"
            [attr.cy]="shape.c[1]"
            [attr.r]="shape.c[2]"
            [attr.fill]="shape.fill ? 'currentColor' : null"
            [attr.stroke]="shape.fill ? 'none' : null"
          />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      flex: none;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly label = input<string>();
  protected readonly shapes = computed<readonly Shape[]>(() => ICONS[this.name()]);
}
