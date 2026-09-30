import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CERTIFICATES, groupByYear } from '../../content/certificates';
import { CtaBand } from '../../shared/cta-band';
import { Icon } from '../../shared/icon';
import { PageIntro } from '../../shared/page-intro';

@Component({
  selector: 'app-certificates',
  imports: [RouterLink, Icon, PageIntro, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './certificates.html',
  styleUrl: './certificates.scss',
})
export default class Certificates {
  /** Grouped by year; file paths contain umlauts (e.g. "Unterstützung"), so they are URI-encoded. */
  protected readonly years = groupByYear(CERTIFICATES).map((group) => ({
    ...group,
    items: group.items.map((c) => ({
      ...c,
      href: c.file ? encodeURI(c.file) : null,
      kind: c.file?.toLowerCase().endsWith('.pdf') ? 'PDF' : 'Bild',
    })),
  }));
  protected readonly total = CERTIFICATES.length;
  protected readonly highlights = CERTIFICATES.filter((c) => c.highlight).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}
