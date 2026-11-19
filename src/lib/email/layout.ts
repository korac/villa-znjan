/**
 * Shared HTML shell for outgoing email. Table layout and inline styles,
 * because email clients ignore stylesheets and most modern CSS. Colours are
 * the site's light palette, fixed: email clients apply their own dark mode.
 */

const INK = "#262019";
const MUTED = "#6e6557";
const LIMESTONE = "#f7f3ec";
const SAND = "#efe7db";
const BORDER = "#ddd2c0";
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

/** Escapes text for HTML. Every user-supplied value must pass through this. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escaped text with line breaks kept. */
export function multiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

export const styles = {
  p: `margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};`,
  muted: `margin:0 0 8px;font-family:${SANS};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};`,
  quote: `margin:0 0 20px;padding:14px 18px;border-left:2px solid ${BORDER};background:${SAND};font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};`,
  label: `padding:6px 16px 6px 0;font-family:${SANS};font-size:13px;color:${MUTED};white-space:nowrap;vertical-align:top;`,
  value: `padding:6px 0;font-family:${SANS};font-size:15px;color:${INK};`,
  link: `color:${INK};`,
};

export function emailLayout({
  lang,
  preheader,
  body,
}: {
  lang: string;
  /** Inbox preview text, hidden in the email body. */
  preheader: string;
  body: string;
}): string {
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>Villa Žnjan</title>
</head>
<body style="margin:0;padding:0;background:${LIMESTONE};">
<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${LIMESTONE};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr>
          <td style="padding:0 0 24px;font-family:${SERIF};font-size:26px;color:${INK};">Villa Žnjan</td>
        </tr>
        <tr>
          <td style="padding:32px;background:#ffffff;border:1px solid ${BORDER};">
            ${body}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
