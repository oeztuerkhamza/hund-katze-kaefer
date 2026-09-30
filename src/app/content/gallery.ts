/**
 * Gallery data. Image paths match the folder structure of the old website –
 * copy the existing /Galerie folder into /public and every photo appears automatically.
 * To add a pet: append one line to the matching list.
 */
export type GalleryCategory = 'eigene' | 'hunde' | 'katzen' | 'kleintiere' | 'outtakes';

export interface GalleryImage {
  readonly src: string;
  readonly name: string;
  readonly category: GalleryCategory;
  /** Optional species for a more precise alt text (e.g. "Hamster"). */
  readonly species?: string;
}

export interface GalleryCategoryInfo {
  readonly id: GalleryCategory;
  /** Short label for the filter. */
  readonly label: string;
  /** Section heading. */
  readonly heading: string;
  /** Used in alt texts. */
  readonly care: string;
}

export const GALLERY_CATEGORIES: readonly GalleryCategoryInfo[] = [
  {
    id: 'eigene',
    label: 'Meine eigenen',
    heading: 'Meine eigenen Vierbeiner',
    care: 'eigene Katze',
  },
  { id: 'hunde', label: 'Hunde', heading: 'Hundebetreuung', care: 'Hundebetreuung' },
  { id: 'katzen', label: 'Katzen', heading: 'Katzenbetreuung', care: 'Katzenbetreuung' },
  {
    id: 'kleintiere',
    label: 'Kleintiere',
    heading: 'Kleintierbetreuung',
    care: 'Kleintierbetreuung',
  },
  {
    id: 'outtakes',
    label: 'Outtakes',
    heading: 'Outtakes: lustige Schnappschüsse',
    care: 'Tierbetreuung',
  },
];

type Row = readonly [file: string, name: string, species?: string];

const build = (category: GalleryCategory, rows: readonly Row[]): GalleryImage[] =>
  // No leading slash: resolved against <base href>, so the site also works below a sub-path.
  rows.map(([file, name, species]) => ({ src: `Galerie/${file}`, name, category, species }));

const OWN: Row[] = [
  ['Dexter.jpg', 'Dexter'],
  ['Lucy.jpg', 'Lucy'],
  ['Misu.jpg', 'Misu'],
];

const DOGS: Row[] = [
  ['2024/Paolo.jpg', 'Paolo'],
  ['Tiereneu/Franz-Frida.jpg', 'Franz & Frida'],
  ['2023/TiereNov23/Lissy-und-Gordie-stattLissi.jpg', 'Lissy & Gordie'],
  ['Moritz-Balou.jpg', 'Moritz & Balou'],
  ['nala_donka.jpg', 'Nala & Donka'],
  ['Hecki.jpg', 'Hecki'],
  ['Nudel_Pepper.jpg', 'Nudel & Pepper'],
  ['Shila.jpg', 'Shila'],
  ['Pipa.jpg', 'Pipa'],
  ['Otto.jpg', 'Otto'],
  ['Arielle.jpg', 'Arielle'],
  ['Oscar.jpg', 'Oscar'],
  ['Mina.jpg', 'Mina'],
  ['Susi.jpg', 'Susi'],
  ['Mia.jpg', 'Mia'],
  ['Anton.jpg', 'Anton'],
  ['Anton02.jpg', 'Anton'],
  ['Mylie-Emma.jpg', 'Mylie & Emma'],
  ['Balou.jpg', 'Balou'],
  ['MajaRossi.jpg', 'Maja & Rossi'],
  ['Jack.jpg', 'Jack'],
];

const CATS: Row[] = [
  ['2024/Atila-Boncuk-Akira.jpg', 'Atila, Boncuk & Akira'],
  ['2024/Bartel.jpg', 'Bartel'],
  ['2024/Miko-Benny.jpg', 'Miko & Benny'],
  ['2024/Rocky.jpg', 'Rocky'],
  ['2023/Jacob.jpg', 'Jacob'],
  ['2023/Nami-Monte.jpg', 'Nami & Monte'],
  ['2023/Balou-Mia.png', 'Balou & Mia'],
  ['2023/TiereNov23/Arya.jpg', 'Arya'],
  ['2023/TiereNov23/BanditoWillow.jpg', 'Bandito & Willow'],
  [
    '2023/TiereNov23/Claerchen-Leo-Noxx-Chanel-Scarlett.jpg',
    'Clärchen, Leo, Noxx, Chanel & Scarlett',
  ],
  ['2023/TiereNov23/Lissy.jpg', 'Lissy'],
  ['2023/TiereNov23/Lulu.jpg', 'Lulu'],
  ['2023/TiereNov23/Momo-Chila.jpg', 'Momo & Chila'],
  ['2023/TiereNov23/Rambo-Pumuckel.jpg', 'Rambo & Pumuckel'],
  ['2022/Chiquita-Shyna.jpg', 'Chiquita & Shyna'],
  ['2022/Jamie-Jerry.jpg', 'Jamie & Jerry'],
  ['2022/Luna-Shiva.jpg', 'Luna & Shiva'],
  ['2022/Maja-Sissy.jpg', 'Maja & Sissy'],
  ['2022/Savitar-Carapino.jpg', 'Savitar & Carapino'],
  ['Tiereneu/2022-Akito-Frodo.jpg', 'Akito & Frodo'],
  ['Tiereneu/2022-Bibi-Tina.jpg', 'Bibi & Tina'],
  ['Tiereneu/2022-Findus.jpg', 'Findus'],
  ['Tiereneu/Basile.jpg', 'Basile'],
  ['Tiereneu/Canny.jpg', 'Canny'],
  ['Tiereneu/Nala-Efie.jpg', 'Nala & Efie'],
  ['Tiereneu/Nera-Caramella-Cappuccio.jpg', 'Nera, Caramella & Cappuccio'],
  ['Curry.jpg', 'Curry'],
  ['Luna_Molly.jpg', 'Luna & Molly'],
  ['Beatlejuice.jpg', 'Beatlejuice'],
  ['Elvis.jpg', 'Elvis'],
  ['Lui-kiki.jpg', 'Lui & Kiki'],
  ['Jule-Carlo-Maxi.jpg', 'Jule, Carlo & Maxi'],
  ['Merlin-Maira.jpg', 'Merlin & Maira'],
  ['Mila-Meeny-Elina.jpg', 'Mila, Meeny & Elina'],
  ['Fritzi-Kudi-Balu.jpg', 'Fritzi, Kudi & Balu'],
  ['Karlson-Lizzy.jpg', 'Karlson & Lizzy'],
  ['Moehre-und-Cebulla.jpg', 'Möhre & Cebulla'],
  ['Milo.jpg', 'Milo'],
  ['Hermia.jpg', 'Hermia'],
  ['Lynix.jpg', 'Lynix'],
  ['Olli.jpg', 'Olli'],
  ['Nubi.jpg', 'Nubi'],
  ['Caruso-Mikesch.jpg', 'Caruso & Mikesch'],
  ['Laney-Hailey.jpg', 'Laney & Hailey'],
  ['Tierbetreuung/Rosi.jpg', 'Rosi'],
  ['Simba.jpg', 'Simba'],
  [
    'Digger-of-Kittenbath-Shiva-of-Backbrook-s-Valley.jpg',
    "Digger of Kitten Bath & Shiva of Backbrook's Valley",
  ],
  ['Rolf-Alfons.jpg', 'Rolf & Alfons'],
  ['Sam-Jamie002.jpg', 'Sam & Jamie'],
  ['Horst.jpg', 'Horst'],
  ['Klecks.jpg', 'Klecks'],
  ['Mausi.jpg', 'Mausi'],
  ['Nala-Flocke.jpg', 'Nala & Flocke'],
  ['Watson-Motte.jpg', 'Watson & Motte'],
  ['Momo-Beppo.jpg', 'Momo & Beppo'],
  ['Nori-Haku.jpg', 'Nori & Haku'],
  ['Perla-Kea.jpg', 'Perla & Kea'],
  ['Susuni.jpg', 'Susuni'],
  ['Zoe.jpg', 'Zoe'],
  ['Emma2.jpg', 'Emma'],
  ['Ginger-Pepper2.jpg', 'Ginger & Pepper'],
  ['Lilly2.jpg', 'Lilly'],
  ['Luna-Lui2.jpg', 'Luna & Lui'],
];

const SMALL: Row[] = [
  ['2023/TiereNov23/Erna-Henning.jpg', 'Erna & Henning'],
  ['Tiereneu/2022-Degus.jpg', 'Degus'],
  ['Tiereneu/Sam-Lia-Luis-Lissy-Polly.jpg', 'Sam, Lia, Luis, Lissy & Polly'],
  ['Bugs-Joschi.jpg', 'Bugs & Joschi', 'Kaninchen'],
  ['Edi-Lola.jpg', 'Edi & Lola'],
  ['Gwyn-Helja.jpg', 'Gwyn & Helja', 'Meerschweinchen'],
  ['Woody.jpg', 'Woody', 'Hamster'],
  ['Diana.jpg', 'Diana', 'Ratte'],
  ['Ameisen-Farm-Tierbetreuung.jpg', 'Ameisenkolonie'],
  ['Piti.jpg', 'Piti'],
  ['ElliotIsabella.jpg', 'Elliot & Isabella'],
  ['Tierbetreuung/Flausch-Snowpea.jpg', 'Flausch & Snowpea'],
  ['Babyschildkroete-Laura.jpg', 'Babyschildkröte Laura'],
  ['Sonnensittiche.jpg', 'Sonnensittiche'],
  ['SchlappiFreund.jpg', 'Schlappi & Kumpel'],
  ['Winnie.jpg', 'Winnie'],
  ['BlaugenickSperlingspapageien.jpg', 'Blaugenick-Sperlingspapageien'],
  ['Oehrchen-Ringel-Ranja-Tui.jpg', 'Öhrchen, Ringel, Ranja & Tui'],
  ['Taggeckos.jpg', 'Taggeckos'],
  ['Schildkroeten.jpg', 'Schildkröten'],
  ['Tom-Jerry.jpg', 'Tom & Jerry'],
];

const OUTTAKES: Row[] = [
  ['2025/Catoftheday.jpg', '#CatOfTheDay'],
  ['2024/Klamottentausch.jpg', 'Klamottentausch'],
  ['2024/Abendroutine.jpg', 'Abendroutine'],
  ['2024/AuchanXmasimEinsatz.jpg', 'Auch an X-Mas im Einsatz!'],
  ['2024/Carnivore.jpg', 'Aber du bist ein Carnivore …'],
  ['2023/TiereNov23/OuttakesKatze01.jpg', 'Made my day!'],
  ['2023/TiereNov23/OuttakesKatze02.jpg', 'Ich schau dir in die Augen, Kleines …'],
  ['2023/KundeistKoenig.jpg', '2023: Kunde ist (immer noch) König!'],
  ['Outtakes-Kunde-ist-Koenig.jpg', '2021: Kunde ist König!'],
  ['abgeschleckt.jpg', 'Abgeschleckt'],
  ['Schrei-nach-Liebe.jpg', 'Schrei nach Liebe'],
  ['Tierbetreuung-Kuessen-verboten.jpg', 'Küssen verboten'],
  ['Wo-ist-die-Ratte-Tierbetreuung.jpg', 'Wo ist die Ratte?'],
  ['Outtakes-drei-gegen-einen.jpg', 'Drei gegen einen'],
  ['hang-in-there-muede.jpg', 'Müde? Hang in there!'],
  ['Outtake-guckst-du.jpg', 'Guckst du!'],
  ['Tierbetreuung/Mama.jpg', 'Mama?!'],
  ['Tierbetreuung/Outtakes-FrauFutter.jpg', 'Frau, gib Futter!'],
  ['Tierbetreuung/OuttakesRosi.jpg', 'High Five'],
  ['Tierbetreuung/Outtakes-Gaehnen.jpg', 'Roarwww!'],
  ['Kommt-ein-Leckerli-geflogen.jpg', 'Kommt ein Leckerli geflogen …'],
  ['Outtakes-Ach-Du-lieber-Schwan.jpg', 'Ach du lieber Schwan!'],
  ['Outtakes-Wieder-mal-gewaschen.jpg', 'Wieder mal gewaschen!'],
];

export const GALLERY: readonly GalleryImage[] = [
  ...build('eigene', OWN),
  ...build('hunde', DOGS),
  ...build('katzen', CATS),
  ...build('kleintiere', SMALL),
  ...build('outtakes', OUTTAKES),
];

export const OWN_PETS = build('eigene', OWN);

const pick = (...names: string[]): GalleryImage[] =>
  names.map((n) => {
    const found = GALLERY.find((g) => g.name === n);
    if (!found) throw new Error(`Gallery image "${n}" not found`);
    return found;
  });

/** Pets on the home page hero wall. */
export const HERO_PETS = pick('Paolo', 'Arya', 'Woody', 'Nala & Donka', 'Bartel');

/** Hand-picked photos for the home page gallery teaser. */
export const GALLERY_HIGHLIGHTS = pick(
  'Franz & Frida',
  'Jacob',
  'Sonnensittiche',
  'Mia',
  'Momo & Chila',
  'Bugs & Joschi',
);

export function altText(img: GalleryImage): string {
  if (img.category === 'outtakes') return `Schnappschuss aus der Tierbetreuung: ${img.name}`;
  if (img.category === 'eigene') return `${img.name}, Katze von Karin Käfer`;
  const care = GALLERY_CATEGORIES.find((c) => c.id === img.category)?.care ?? 'Tierbetreuung';
  const who = img.species ? `${img.species} ${img.name}` : img.name;
  return `${who} – ${care} in Freiburg`;
}
