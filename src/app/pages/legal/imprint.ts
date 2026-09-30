import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site';
import { EmailLink } from '../../shared/email-link';
import { PageIntro } from '../../shared/page-intro';

/*
 * Vor dem Livegang bitte prüfen (lassen): Angaben sind aus dem bisherigen Impressum übernommen
 * und auf das Digitale-Dienste-Gesetz (DDG) bzw. den Medienstaatsvertrag (MStV) aktualisiert.
 * Falls vorhanden, ergänzen: Umsatzsteuer-ID nach § 27a UStG.
 */
@Component({
  selector: 'app-imprint',
  imports: [PageIntro, EmailLink, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-intro heading="Impressum" />
    <div class="container legal">
      <div class="prose">
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {{ site.legalName }}<br />
          Inhaberin: {{ site.owner }}<br />
          {{ site.address.street }}<br />
          {{ site.address.zip }} {{ site.address.city }}
        </p>

        <h2>Kontakt</h2>
        <p>
          Mobil: <a [href]="site.phone.href">{{ site.phone.display }}</a
          ><br />
          E-Mail: <app-email-link />
        </p>

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>{{ site.owner }}, Anschrift wie oben</p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2 id="haftung">Haftung für Inhalte</h2>
        <p>
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität kann ich jedoch keine Gewähr übernehmen. Die Hinweise zur
          Ernährungsberatung ersetzen keine tierärztliche Untersuchung oder Behandlung.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen
          Einfluss habe. Für diese Inhalte ist stets der jeweilige Anbieter oder Betreiber
          verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden
          mir Rechtsverletzungen bekannt, entferne ich die betreffenden Links umgehend.
        </p>

        <h2 id="urheberrecht">Urheberrecht</h2>
        <p>
          Texte und Fotos auf dieser Website sind urheberrechtlich geschützt. Jede Verwendung
          außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung.
        </p>

        <h2>Bildnachweise</h2>
        <p>Tierfotos: Karin Käfer sowie die jeweiligen Tierhalterinnen und Tierhalter.</p>

        <p class="legal__more">
          Informationen zum Umgang mit Ihren Daten finden Sie in der
          <a routerLink="/datenschutz">Datenschutzerklärung</a>.
        </p>
      </div>
    </div>
  `,
  styleUrl: './legal.scss',
})
export default class Imprint {
  protected readonly site = SITE;
}
