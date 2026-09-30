import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { altText, GalleryImage } from '../content/gallery';
import { Icon } from './icon';

/**
 * A pet portrait with a brass "collar tag" carrying the pet's name.
 * If the photo file is missing (e.g. before the old /Galerie folder was copied),
 * a friendly placeholder is shown instead of a broken image.
 */
@Component({
  selector: 'app-pet-photo',
  imports: [NgOptimizedImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pet-photo',
    '[class.pet-photo--tagless]': '!showTag()',
    '[style.--tilt]': 'tilt() + "deg"',
  },
  template: `
    <span class="frame">
      @if (!failed()) {
        <img
          [ngSrc]="image().src"
          [alt]="alt()"
          fill
          [priority]="priority()"
          [sizes]="sizes()"
          (error)="failed.set(true)"
        />
      } @else {
        <span class="placeholder" role="img" [attr.aria-label]="alt()">
          <app-icon name="paw" />
        </span>
      }
    </span>
    @if (showTag()) {
      <span class="tag" [attr.aria-hidden]="tagHidden() ? 'true' : null">{{ image().name }}</span>
    }
  `,
  styleUrl: './pet-photo.scss',
})
export class PetPhoto {
  readonly image = input.required<GalleryImage>();
  readonly priority = input(false);
  readonly showTag = input(true);
  /** Hide the tag from screen readers when the name is already in the alt text / caption. */
  readonly tagHidden = input(true);
  readonly tilt = input(0);
  readonly sizes = input('(min-width: 64rem) 20vw, 45vw');

  protected readonly failed = signal(false);
  protected readonly alt = computed(() => altText(this.image()));
}
