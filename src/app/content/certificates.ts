/**
 * Further education & certificates. PDF/PNG paths match the old website –
 * copy the existing /Zertifikate folder into /public. Paths have no leading slash,
 * so they are resolved against <base href>.
 * New entry: add one object; the page sorts and groups by year automatically.
 */
export interface Certificate {
  /** ISO date of the (first) course day – used for sorting. */
  readonly date: string;
  /** Human readable date, e.g. for multi-day courses. */
  readonly dateLabel: string;
  readonly title: string;
  readonly by: string;
  readonly file?: string;
  readonly highlight?: boolean;
}

export const CERTIFICATES: readonly Certificate[] = [
  {
    date: '2022-08-17',
    dateLabel: '17.08.2022',
    title: 'Katzen mit Schilddrüsenüberfunktion richtig managen',
    by: 'Dr. Yasmin Diepenbruck',
    file: 'Zertifikate/Katze-Schilddruesenueberfunktion.pdf',
  },
  {
    date: '2022-09-24',
    dateLabel: '24.09.2022',
    title: 'Abschlussprüfung „Ernährungsberaterin für Katzen“',
    by: 'Rolf-Schneider-Akademie',
    file: 'Zertifikate/ErnaehrungsberaterinKatzen.png',
    highlight: true,
  },
  {
    date: '2022-10-01',
    dateLabel: '01.10.2022',
    title: 'Impfberatung in der Tierheilpraxis',
    by: 'Webinar Rolf-Schneider-Akademie',
  },
  {
    date: '2023-02-05',
    dateLabel: '05.02.2023',
    title: 'Erkrankungen der Katze',
    by: 'Dipl.-Tzt. Sabine Schroll',
    file: 'Zertifikate/ErkrankungenderKatze.pdf',
  },
  {
    date: '2023-02-10',
    dateLabel: '10.02.2023',
    title: 'Katzenspezial: Nierenerkrankungen und Nierendiät bei Katzen',
    by: 'Webinar Rolf-Schneider-Akademie',
  },
  {
    date: '2023-02-26',
    dateLabel: '26.02.2023',
    title: 'Traumabehandlung der Katze',
    by: 'Dipl.-Tzt. Sabine Schroll',
    file: 'Zertifikate/Katzentrauma.pdf',
  },
  {
    date: '2023-03-28',
    dateLabel: '28.03.2023',
    title: 'Virusbedingte Infektionen und Hautschädigungen bei Katzen',
    by: 'Dipl.-Tierärztin Sabine Schroll',
    file: 'Zertifikate/ZertifikatVirusinfektionKatze.png',
  },
  {
    date: '2023-04-19',
    dateLabel: '19.04.–17.05.2023',
    title: 'Darmaufbau bei Hunden und Katzen',
    by: 'Tierheilpraxis Prester',
    file: 'Zertifikate/Tierheilpraxis.png',
    highlight: true,
  },
  {
    date: '2024-03-07',
    dateLabel: '07.03.2024',
    title: 'Verdauungs(patho)physiologie – Energiezentrale Darm',
    by: 'Enterosam® VET-Praxis-Web-Seminar, Michaela Eckert & Ronja Uhlein',
    file: 'Zertifikate/2024-03-07-Verdauungspathophysioligie-EnergeizentraleDarm.pdf',
  },
  {
    date: '2024-03-16',
    dateLabel: '16.03.2024',
    title: 'Animalicum – Der „Tier & Wir“-Kongress: „Wie geht’s dir, Tier, mit uns?“',
    by: 'Tanja Warter, Tierärztin & Journalistin',
    file: 'Zertifikate/Animalicum2024.pdf',
  },
  {
    date: '2024-04-09',
    dateLabel: '09.04.2024',
    title: 'Dermatologie trifft Fütterung',
    by: 'foten GmbH, Dr. Rebecca Huhmann',
    file: 'Zertifikate/2024-04-09-DermatologietrifftFuetterung.pdf',
  },
  {
    date: '2024-04-18',
    dateLabel: '18.04.2024',
    title: 'Grundkurs Darmgesundheit bei Hund und Katze',
    by: 'Enterosam® VET-Praxis-Web-Seminar, Michaela Eckert & Ronja Uhlein',
    file: 'Zertifikate/2024-04-18-GrundkursdarmgesundheitHundKatze.pdf',
  },
  {
    date: '2024-05-21',
    dateLabel: '21.05.2024',
    title: 'Omega-3 – zwischen Mythen und Wahrheiten',
    by: 'foten GmbH, Dr. Jessica Farger',
    file: 'Zertifikate/2024-05-21-Omega3zwischenMythenundWahrheit.pdf',
  },
  {
    date: '2024-09-11',
    dateLabel: '11.09.2024',
    title: 'Gesundheitliche Unterstützung bei Qualzuchten durch Omega-3',
    by: 'foten GmbH, Nane Schomburg',
    file: 'Zertifikate/2024-09-11-GesundheitlicheUnterstützungQualzuchtenOmega-3.pdf',
  },
  {
    date: '2024-09-26',
    dateLabel: '26.09.2024',
    title: 'Allergien und andere Unverträglichkeiten – SOS des Immunsystems',
    by: 'Enterosam® VET-Praxis-Web-Seminar, Michaela Eckert & Dr. Astrid Heckers',
    file: 'Zertifikate/2024-09-26-AllergienundandereUnverträglichkeiten-SOSImmunsystems.pdf',
  },
  {
    date: '2024-10-17',
    dateLabel: '17.10.2024',
    title: 'Therapiepläne gestalten – Fell- und Fäzes-Fälle',
    by: 'Enterosam® VET-Praxis-Web-Seminar, Michaela Eckert & Julia Larissa Back',
    file: 'Zertifikate/2024-10-17-Therapieplaenegestalten.pdf',
  },
  {
    date: '2024-10-26',
    dateLabel: '26.–27.10.2024',
    title: 'Labordiagnostik für Tierheilpraktiker (Basiskurs)',
    by: 'Kathi Timmer & Dr. med. vet. Tina Hawacker',
    file: 'Zertifikate/2024-10-24-Labordiagnostik.png',
  },
  {
    date: '2024-11-13',
    dateLabel: '13.11.2024',
    title: 'Omega-3 in der Tiermedizin: aktuelle Forschung und therapeutische Potenziale',
    by: 'foten GmbH, Dr. Jessica Farger',
    file: 'Zertifikate/2024-11-13-Omega3.pdf',
  },
  {
    date: '2024-11-19',
    dateLabel: '19.11.2024',
    title: 'Die Darm-Hirn-Achse – V wie Verhalten, V wie Verdauung (Teil 1)',
    by: 'Enterosam® VET-Praxis-Web-Seminar, Michaela Eckert & Ronja Uhlein',
    file: 'Zertifikate/Zertifikate2025/Darm-Hirn-AchseTeil1.pdf',
  },
  {
    date: '2025-01-11',
    dateLabel: '11.01.2025',
    title: 'Hilfe für die Psyche: Nahrungsergänzung für Katzen',
    by: 'Happy Miez, Sabine Schroll',
    file: 'Zertifikate/Zertifikate2025/Psyche-NahrungsergaenzungenKatzen.pdf',
  },
  {
    date: '2025-01-21',
    dateLabel: '21.01.2025',
    title: 'Allergologie meets Ernährung',
    by: 'foten GmbH, Dr. Rebecca Huhmann',
    file: 'Zertifikate/Zertifikate2025/Allergologie.pdf',
  },
  {
    date: '2025-01-23',
    dateLabel: '23.01.2025',
    title: 'Das Bauchhirn – V wie Verhalten, V wie Verdauung (Teil 2)',
    by: 'Enterosam® VET-Praxis-Web-Seminar, Ronja Uhlein & Michaela Eckert',
    file: 'Zertifikate/Zertifikate2025/Bauchhirn-Teil2.pdf',
  },
  {
    date: '2025-02-02',
    dateLabel: '02.02.2025',
    title: 'Ausbildung zur Mykotherapeutin für Tiere',
    by: 'vetwissen, Petra Scharl',
    file: 'Zertifikate/Zertifikate2025/MykotherapeutinfuerTiere.pdf',
    highlight: true,
  },
];

export interface CertificateYear {
  readonly year: string;
  readonly items: readonly Certificate[];
}

/** Newest first, grouped by year. */
export function groupByYear(list: readonly Certificate[]): CertificateYear[] {
  const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date));
  const groups = new Map<string, Certificate[]>();
  for (const c of sorted) {
    const year = c.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), c]);
  }
  return [...groups].map(([year, items]) => ({ year, items }));
}
