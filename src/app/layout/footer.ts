import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LEGAL_NAV, MAIN_NAV, SITE } from '../core/site';
import { EmailLink } from '../shared/email-link';
import { Icon } from '../shared/icon';
import { Ladybug } from '../shared/ladybug';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon, Ladybug, EmailLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly site = SITE;
  protected readonly nav = MAIN_NAV;
  protected readonly legal = LEGAL_NAV;
  protected readonly year = new Date().getFullYear();
}
