import { CERTIFICATES, groupByYear } from './certificates';
import { altText, GALLERY, GALLERY_CATEGORIES, GALLERY_HIGHLIGHTS, HERO_PETS } from './gallery';

describe('gallery data', () => {
  it('keeps the image paths of the old website', () => {
    expect(GALLERY.length).toBeGreaterThan(100);
    for (const img of GALLERY) {
      expect(img.src).toMatch(/^Galerie\/.+\.(jpe?g|png)$/);
    }
  });

  it('has no duplicate files', () => {
    const files = GALLERY.map((g) => g.src);
    expect(new Set(files).size).toBe(files.length);
  });

  it('only uses known categories', () => {
    const ids = GALLERY_CATEGORIES.map((c) => c.id);
    expect(GALLERY.every((g) => ids.includes(g.category))).toBeTrue();
  });

  it('resolves the hand-picked photos', () => {
    expect(HERO_PETS.length).toBe(5);
    expect(GALLERY_HIGHLIGHTS.length).toBe(6);
  });

  it('writes descriptive alt texts', () => {
    const hamster = GALLERY.find((g) => g.name === 'Woody')!;
    expect(altText(hamster)).toBe('Hamster Woody – Kleintierbetreuung in Freiburg');
    const outtake = GALLERY.find((g) => g.category === 'outtakes')!;
    expect(altText(outtake)).toContain('Schnappschuss');
  });
});

describe('certificates', () => {
  it('groups by year, newest first', () => {
    const years = groupByYear(CERTIFICATES);
    const labels = years.map((y) => y.year);
    expect(labels).toEqual([...labels].sort().reverse());
    for (const group of years) {
      const dates = group.items.map((c) => c.date);
      expect(dates).toEqual([...dates].sort().reverse());
    }
  });

  it('counts every certificate exactly once', () => {
    const total = groupByYear(CERTIFICATES).reduce((sum, y) => sum + y.items.length, 0);
    expect(total).toBe(CERTIFICATES.length);
  });

  it('only links to files inside /Zertifikate', () => {
    for (const c of CERTIFICATES.filter((c) => c.file)) {
      expect(c.file).toMatch(/^Zertifikate\//);
    }
  });
});
