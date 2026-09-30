import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site';
import { GALLERY, GALLERY_HIGHLIGHTS, HERO_PETS, OWN_PETS } from '../../content/gallery';
import { HOLIDAY_EXTRAS, SERVICES } from '../../content/services';
import { CtaBand } from '../../shared/cta-band';
import { Icon } from '../../shared/icon';
import { PetPhoto } from '../../shared/pet-photo';
import { PriceTag } from '../../shared/price-tag';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, PetPhoto, PriceTag, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home {
  protected readonly site = SITE;
  protected readonly heroPets = HERO_PETS;
  protected readonly ownPets = OWN_PETS;
  protected readonly highlights = GALLERY_HIGHLIGHTS;
  protected readonly careServices = SERVICES.filter((s) => s.id !== 'ernaehrungsberatung');
  protected readonly holidayExtras = HOLIDAY_EXTRAS;
  /** Photos of client pets (without outtakes and my own cats), rounded down to tens: "über 100". */
  protected readonly clientPhotoCount =
    Math.floor(
      GALLERY.filter((g) => g.category !== 'outtakes' && g.category !== 'eigene').length / 10,
    ) * 10;

  protected readonly reasons = [
    {
      icon: 'home',
      title: 'Das eigene Revier',
      text: 'Ihr Tier bleibt dort, wo es sich auskennt – mit seinen Lieblingsplätzen, Gerüchen und Routinen.',
    },
    {
      icon: 'key',
      title: 'Kein Transport',
      text: 'Keine Fahrt in die Tierpension und kein Umzug von Käfig, Aquarium oder Terrarium.',
    },
    {
      icon: 'heart',
      title: 'Eine feste Bezugsperson',
      text: 'Statt wechselndem Personal kommt immer dieselbe Person: ich. Mit Zeit für jedes Tier.',
    },
  ] as const;

  protected readonly steps = [
    {
      title: 'Anfragen',
      text: 'Rufen Sie an oder schreiben Sie mir. Ich melde mich schnellstmöglich zurück.',
    },
    {
      title: 'Kennenlernen',
      text: 'Ich besuche Sie und Ihr Tier unverbindlich bei Ihnen zu Hause.',
    },
    {
      title: 'Absprechen',
      text: 'Wir klären Zeiten, Futter, Schlüssel und Besonderheiten. Sie erhalten ein individuelles Angebot.',
    },
    {
      title: 'Entspannt losfahren',
      text: 'Sie sind unterwegs, Ihr Tier ist zu Hause bestens versorgt.',
    },
  ] as const;

  /** Slight rotation of each photo on the hero wall – like pictures pinned to a fridge. */
  protected readonly wall = [
    { tilt: -4 },
    { tilt: 3 },
    { tilt: -2 },
    { tilt: 5 },
    { tilt: -5 },
  ] as const;
}
