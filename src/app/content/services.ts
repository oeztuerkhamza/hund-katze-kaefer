import { IconName } from '../shared/icon';

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly icon: IconName;
  /** One sentence for cards and structured data. */
  readonly summary: string;
  readonly body: string;
  readonly points: readonly string[];
  readonly note?: string;
}

export const SERVICES: readonly Service[] = [
  {
    id: 'katzenbetreuung',
    title: 'Katzenbetreuung',
    icon: 'cat',
    summary:
      'Füttern, Katzenklo, Spielen und Schmusen – ganz nach Ihren Vorgaben, ein- oder zweimal täglich.',
    body: 'Ihre Katzen bleiben in ihrem Revier und behalten ihren Rhythmus. Ich halte mich an Ihre Routinen und schaue überall nach dem Rechten. Wie viele Besuche pro Tag sinnvoll sind, besprechen wir gemeinsam.',
    points: [
      'Füttern nach Ihrem Plan',
      'Katzentoilette reinigen',
      'Spiel- und Kuscheleinheiten',
      '1 oder 2 Besuche am Tag',
    ],
  },
  {
    id: 'hundebetreuung',
    title: 'Gassi-Service & Hundebetreuung',
    icon: 'dog',
    summary:
      'Gassirunden zu Ihren Wunschzeiten in der gewohnten Umgebung Ihres Hundes – bei jedem Wetter.',
    body: 'Ob Berufsalltag oder Urlaub: Ich gehe mit Ihrem Hund – oder Ihren Hunden – zu den vereinbarten Zeiten auf die vertrauten Runden. Wind und Wetter sind dabei kein Grund zum Ausfallen.',
    points: ['Feste Gassizeiten', 'Vertraute Wege', 'Auch mehrere Hunde', 'Bei Wind und Wetter'],
  },
  {
    id: 'kleintierbetreuung',
    title: 'Kleintierbetreuung',
    icon: 'rabbit',
    summary:
      'Kaninchen, Meerschweinchen, Vögel, Fische oder Reptilien – versorgt in Käfig, Voliere, Aquarium oder Terrarium.',
    body: 'Käfige, Aquarien und Terrarien zu transportieren ist aufwendig und für die Tiere stressig. Deshalb komme ich zu Ihnen und versorge Ihre Kleintiere dort, wo sie zu Hause sind.',
    points: [
      'Käfige & Volieren',
      'Aquarien & Terrarien',
      'Futter & frisches Wasser',
      'Auch Exoten',
    ],
  },
  {
    id: 'ernaehrungsberatung',
    title: 'Ernährungsberatung für Katzen',
    icon: 'bowl',
    summary:
      'Zertifizierte, individuelle Beratung zur Fütterung – für gesunde Katzen und bei akuten oder chronischen Erkrankungen.',
    body: 'Als ausgebildete Ernährungsberaterin für Katzen stimme ich jede Empfehlung auf Ihre Samtpfote ab – von der gesunden Grundversorgung bis zum Fütterungsplan bei Krankheit.',
    points: [
      'Artgerechte Fütterung',
      'Begleitung bei Erkrankungen',
      'Spezialisierung Darmaufbau',
      'Vorbereitung auf Neuzugänge',
    ],
    note: 'Eine Beratung ersetzt nicht den Besuch in der Tierarztpraxis.',
  },
];

export const EXTRA_SERVICES: readonly { title: string; text: string }[] = [
  { title: 'Medikamentengabe', text: 'Hilfe bei der Gabe verordneter Medikamente.' },
  {
    title: 'Vergesellschaftung',
    text: 'Begleitung, wenn eine neue Katze zu Ihrer bestehenden Katze zieht.',
  },
  { title: 'Kot-, Urin- & Fellanalysen', text: 'Organisation von Analysen für Katzen.' },
  {
    title: 'Wohnungscheck für neue Katzenhalter',
    text: 'Ist die Wohnung katzensicher? Wo stehen Katzenklo, Futter- und Wasserplätze am besten?',
  },
];

export const HOLIDAY_EXTRAS: readonly string[] = [
  'Blumen gießen',
  'Mülltonnen rausstellen',
  'Briefkasten leeren',
  'Kurz nach dem Rechten sehen',
];

export interface Faq {
  readonly q: string;
  readonly a: string;
}

export const FAQ: readonly Faq[] = [
  {
    q: 'Wie läuft das Kennenlernen ab?',
    a: 'Ich komme unverbindlich zu Ihnen nach Hause. So lernen Ihr Tier und ich uns in Ruhe kennen, und wir besprechen Abläufe, Futter, Schlüsselübergabe und Besonderheiten.',
  },
  {
    q: 'Was kostet die Tierbetreuung?',
    a: 'Das hängt von Tierart, Umfang der Betreuung und Anfahrt ab. Nach dem Kennenlernen erhalten Sie ein individuelles Angebot. Die Preise für die Ernährungsberatung finden Sie oben.',
  },
  {
    q: 'Sind Sie versichert?',
    a: 'Ja. Ich bin rundum versichert – Sie beauftragen eine professionelle, offiziell angemeldete Tierbetreuung.',
  },
  {
    q: 'Kann ich die Betreuung steuerlich absetzen?',
    a: 'Die Tierbetreuung bei Ihnen zu Hause gilt als haushaltsnahe Dienstleistung und kann in der Steuererklärung angegeben werden (§ 35a EStG).',
  },
  {
    q: 'In welchem Gebiet sind Sie unterwegs?',
    a: 'In Freiburg und der näheren Umgebung. Fragen Sie einfach an – bei längeren Anfahrten finden wir gemeinsam eine Lösung.',
  },
  {
    q: 'Ersetzt die Ernährungsberatung den Tierarzt?',
    a: 'Nein. Die Beratung ergänzt die tierärztliche Behandlung – etwa, indem ich Diagnosen verständlich erkläre und einen passenden Fütterungsplan mit Ihnen erarbeite.',
  },
];
