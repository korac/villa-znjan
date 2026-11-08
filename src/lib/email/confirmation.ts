import { createTranslator } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { emailLayout, escapeHtml, multiline, styles } from "./layout";

/**
 * Automatic confirmation to the guest, in the site language they used. Copy
 * lives under `email.confirmation` in the message files. Sent from the site's
 * own address, with Reply-To pointing at the host inbox so replies land there.
 */
export async function confirmationEmail({
  locale,
  name,
  message,
}: {
  locale: Locale;
  name: string;
  message: string;
}) {
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "email.confirmation",
  });

  const subject = t("subject");
  const greeting = t("greeting", { name });
  const intro = t("intro");
  const copyLabel = t("copyLabel");
  const addMore = t("addMore");
  const signoff = t("signoff");

  const html = emailLayout({
    lang: locale,
    preheader: intro,
    body: `
      <p style="${styles.p}">${escapeHtml(greeting)}</p>
      <p style="${styles.p}">${escapeHtml(intro)}</p>
      <p style="${styles.p}margin-bottom:8px;">${escapeHtml(copyLabel)}</p>
      <div style="${styles.quote}">${multiline(message)}</div>
      <p style="${styles.p}">${escapeHtml(addMore)}</p>
      <p style="${styles.p}margin:0;">${escapeHtml(signoff)}<br>Villa Žnjan</p>`,
  });

  const text = [
    greeting,
    "",
    intro,
    "",
    copyLabel,
    message,
    "",
    addMore,
    "",
    signoff,
    "Villa Žnjan",
  ].join("\n");

  return { subject, html, text };
}
