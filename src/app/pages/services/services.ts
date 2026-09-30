import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site';
import { EXTRA_SERVICES, FAQ, HOLIDAY_EXTRAS, SERVICES } from '../../content/services';
import { CtaBand } from '../../shared/cta-band';
import { Icon } from '../../shared/icon';
import { PageIntro } from '../../shared/page-intro';

@Component({
  selector: 'app-services',
  imports: [RouterLink, CurrencyPipe, Icon, PageIntro, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export default class Services {
  protected readonly site = SITE;
  protected readonly services = SERVICES;
  protected readonly extras = EXTRA_SERVICES;
  protected readonly holidayExtras = HOLIDAY_EXTRAS;
  protected readonly faq = FAQ;
}
