import { buildInquiryMail, formatDate, InquiryForm } from './inquiry-mail';

const TO = { user: 'karin', domain: 'hund-katze-kaefer.de' };

const base: InquiryForm = {
  name: 'Erika Muster',
  email: 'erika@example.org',
  phone: '',
  place: '',
  service: 'Katzenbetreuung',
  animals: [],
  from: '',
  to: '',
  message: '',
};

function decode(mailto: string) {
  const [address, query] = mailto.replace('mailto:', '').split('?');
  const params = new URLSearchParams(query);
  return { address, subject: params.get('subject') ?? '', body: params.get('body') ?? '' };
}

describe('buildInquiryMail', () => {
  it('addresses the mail to the business and names the service in the subject', () => {
    const { address, subject } = decode(buildInquiryMail(base, TO));
    expect(address).toBe('karin@hund-katze-kaefer.de');
    expect(subject).toBe('Anfrage: Katzenbetreuung');
  });

  it('includes all filled-in details', () => {
    const { body } = decode(
      buildInquiryMail(
        {
          ...base,
          phone: '0761 123456',
          place: 'Wiehre',
          animals: ['Hund', 'Katze'],
          from: '2026-10-03',
          to: '2026-10-17',
          message: 'Balu braucht zwei Runden am Tag.',
        },
        TO,
      ),
    );
    expect(body).toContain('Tiere: Hund, Katze');
    expect(body).toContain('Zeitraum: 03.10.2026 bis 17.10.2026');
    expect(body).toContain('Ort / Stadtteil: Wiehre');
    expect(body).toContain('Balu braucht zwei Runden am Tag.');
    expect(body).toContain('Telefon: 0761 123456');
    expect(body).toContain('E-Mail: erika@example.org');
  });

  it('leaves out empty optional fields without creating gaps', () => {
    const { body } = decode(buildInquiryMail(base, TO));
    expect(body).not.toContain('Tiere:');
    expect(body).not.toContain('Zeitraum:');
    expect(body).not.toContain('Telefon:');
    expect(body).not.toMatch(/\n{3,}/);
    expect(body).toContain('Leistung: Katzenbetreuung\n\nViele Grüße');
  });

  it('marks an open-ended period', () => {
    const { body } = decode(buildInquiryMail({ ...base, from: '2026-12-20' }, TO));
    expect(body).toContain('Zeitraum: 20.12.2026 bis offen');
  });
});

describe('formatDate', () => {
  it('turns ISO dates into German dates', () => {
    expect(formatDate('2026-01-09')).toBe('09.01.2026');
  });
});
