export interface InquiryForm {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly place: string;
  readonly service: string;
  readonly animals: readonly string[];
  readonly from: string;
  readonly to: string;
  readonly message: string;
}

/** "2026-10-03" → "03.10.2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${d}.${m}.${y}` : iso;
}

/**
 * Builds a mailto: link with a structured inquiry. Nothing is sent through the website –
 * the visitor's own mail program opens and they send the message themselves.
 */
export function buildInquiryMail(
  form: InquiryForm,
  to: { readonly user: string; readonly domain: string },
): string {
  const period =
    form.from || form.to
      ? `${form.from ? formatDate(form.from) : 'offen'} bis ${form.to ? formatDate(form.to) : 'offen'}`
      : '';

  // null = line omitted, '' = intentional blank line
  const lines: (string | null)[] = [
    'Hallo Frau Käfer,',
    '',
    'ich interessiere mich für Ihre Tierbetreuung.',
    '',
    `Leistung: ${form.service}`,
    form.animals.length ? `Tiere: ${form.animals.join(', ')}` : null,
    period ? `Zeitraum: ${period}` : null,
    form.place.trim() ? `Ort / Stadtteil: ${form.place.trim()}` : null,
    ...(form.message.trim() ? ['', form.message.trim()] : []),
    '',
    'Viele Grüße',
    form.name.trim(),
    form.phone.trim() ? `Telefon: ${form.phone.trim()}` : null,
    `E-Mail: ${form.email.trim()}`,
  ];

  const body = lines.filter((line): line is string => line !== null).join('\n');
  const subject = `Anfrage: ${form.service}`;
  return `mailto:${to.user}@${to.domain}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
