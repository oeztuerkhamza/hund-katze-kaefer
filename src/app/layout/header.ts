import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

import { MAIN_NAV, SITE } from '../core/site';
import { Icon } from '../shared/icon';
import { Ladybug } from '../shared/ladybug';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon, Ladybug],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'site-header',
    role: 'banner',
    '[class.is-open]': 'open()',
    '(document:keydown.escape)': 'open.set(false)',
  },
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly nav = MAIN_NAV;
  protected readonly site = SITE;
  protected readonly open = signal(false);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.open.set(false));
  }

  protected toggle(): void {
    this.open.update((v) => !v);
  }
}
