import { emailLayout, escapeHtml, multiline, styles } from "./layout";

/**
 * The enquiry as the host receives it. Written in Croatian: the host reads
 * every enquiry, whichever site language the guest used. Only the guest's own
 * message is passed through as typed. Reply-To is the guest, so replying
 * from the inbox answers them directly.
 */

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  locale: string;
  message: string;
};

/** Site language the guest used, as the host reads it. */
const LOCALE_NAMES_HR: Record<string, string> = {
  en: "engleski",
  hr: "hrvatski",
  de: "njemački",
};

export function enquiryEmail(enquiry: Enquiry) {
  const language = LOCALE_NAMES_HR[enquiry.locale] ?? enquiry.locale;
  const phone = enquiry.phone || "-";
  const subject = `Novi upit od ${enquiry.name} - Villa Žnjan`;

  const rows: [string, string][] = [
    ["Ime", escapeHtml(enquiry.name)],
    [
      "E-mail",
      `<a href="mailto:${escapeHtml(enquiry.email)}" style="${styles.link}">${escapeHtml(enquiry.email)}</a>`,
    ],
    ["Telefon", escapeHtml(phone)],
    ["Jezik stranice", escapeHtml(language)],
  ];

  const html = emailLayout({
    lang: "hr",
    preheader: `${enquiry.name}: ${enquiry.message.slice(0, 120)}`,
    body: `
      <p style="${styles.muted}">Novi upit s web stranice</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="${styles.label}">${label}</td><td style="${styles.value}">${value}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="${styles.muted}">Poruka</p>
      <div style="${styles.quote}">${multiline(enquiry.message)}</div>
      <p style="${styles.p}margin:0;font-size:13px;">Odgovorite izravno na ovaj e-mail i odgovor ide gostu.</p>`,
  });

  const text = [
    "Novi upit s web stranice",
    "",
    `Ime: ${enquiry.name}`,
    `E-mail: ${enquiry.email}`,
    `Telefon: ${phone}`,
    `Jezik stranice: ${language}`,
    "",
    "Poruka:",
    enquiry.message,
    "",
    "Odgovorite izravno na ovaj e-mail i odgovor ide gostu.",
  ].join("\n");

  return { subject, html, text };
}
