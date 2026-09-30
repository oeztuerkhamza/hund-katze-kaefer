import {
  afterNextRender,
  ChangeDetectionStrategy,
  DestroyRef,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {
  altText,
  GALLERY,
  GALLERY_CATEGORIES,
  GalleryCategory,
  GalleryImage,
} from '../../content/gallery';
import { CtaBand } from '../../shared/cta-band';
import { Icon } from '../../shared/icon';
import { PageIntro } from '../../shared/page-intro';
import { PetPhoto } from '../../shared/pet-photo';

type Filter = GalleryCategory | 'alle';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink, Icon, PageIntro, PetPhoto, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export default class Gallery {
  private readonly router = inject(Router);

  /** Bound from the query parameter ?kategorie=… (withComponentInputBinding). */
  readonly kategorie = input<string>();

  protected readonly categories = GALLERY_CATEGORIES;
  protected readonly total = GALLERY.length;
  protected readonly counts = Object.fromEntries(
    GALLERY_CATEGORIES.map((c) => [c.id, GALLERY.filter((g) => g.category === c.id).length]),
  ) as Record<GalleryCategory, number>;

  protected readonly filter = computed<Filter>(() => {
    const value = this.kategorie();
    return GALLERY_CATEGORIES.some((c) => c.id === value) ? (value as GalleryCategory) : 'alle';
  });

  /** Visible sections – all categories, or only the selected one. */
  protected readonly sections = computed(() =>
    GALLERY_CATEGORIES.filter((c) => this.filter() === 'alle' || c.id === this.filter()).map(
      (c) => ({ ...c, images: GALLERY.filter((g) => g.category === c.id) }),
    ),
  );

  /** Flat list of visible images – the lightbox steps through it. */
  protected readonly visible = computed(() => this.sections().flatMap((s) => s.images));

  // ── Lightbox ──────────────────────────────────────────────
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('lightbox');
  protected readonly index = signal(0);
  protected readonly current = computed<GalleryImage | undefined>(
    () => this.visible()[this.index()],
  );
  protected readonly currentAlt = computed(() => {
    const img = this.current();
    return img ? altText(img) : '';
  });
  protected readonly currentFailed = signal(false);
  private touchStartX = 0;

  constructor() {
    // Lightbox gestures: arrow keys, click on the dimmed backdrop, swipe (passive listeners).
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.dialog().nativeElement;
      const listeners: [string, EventListener, AddEventListenerOptions?][] = [
        ['keydown', (e) => this.onKeydown(e as KeyboardEvent)],
        ['click', (e) => e.target === el && this.close()],
        [
          'touchstart',
          (e) => (this.touchStartX = (e as TouchEvent).changedTouches[0].clientX),
          { passive: true },
        ],
        [
          'touchend',
          (e) => this.onSwipe((e as TouchEvent).changedTouches[0].clientX),
          { passive: true },
        ],
      ];
      for (const [type, fn, opts] of listeners) el.addEventListener(type, fn, opts);
      destroyRef.onDestroy(() => {
        for (const [type, fn] of listeners) el.removeEventListener(type, fn);
      });
    });
  }

  protected setFilter(value: Filter): void {
    void this.router.navigate([], {
      queryParams: { kategorie: value === 'alle' ? null : value },
      replaceUrl: true,
      preserveFragment: false,
    });
  }

  protected positionOf(image: GalleryImage): number {
    return this.visible().indexOf(image);
  }

  protected open(image: GalleryImage): void {
    this.show(this.positionOf(image));
    this.dialog().nativeElement.showModal();
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  protected step(delta: number): void {
    const count = this.visible().length;
    this.show((this.index() + delta + count) % count);
  }

  private onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') this.step(1);
    if (event.key === 'ArrowLeft') this.step(-1);
  }

  private onSwipe(endX: number): void {
    const dx = endX - this.touchStartX;
    if (Math.abs(dx) > 50) this.step(dx < 0 ? 1 : -1);
  }

  private show(index: number): void {
    this.currentFailed.set(false);
    this.index.set(Math.max(0, index));
  }
}
