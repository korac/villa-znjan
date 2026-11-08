"use server";

import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { allow, DAY_MS, MINUTE_MS } from "@/lib/rateLimit";
import { sendEmail } from "@/lib/email/send";
import { enquiryEmail } from "@/lib/email/enquiry";
import { confirmationEmail } from "@/lib/email/confirmation";

export type ContactFieldError = "required" | "invalidEmail";

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Set for failures that are not field errors, so the form can explain. */
  reason?: "rateLimited";
  errors?: Partial<Record<"name" | "email" | "message", ContactFieldError>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Per visitor IP: a few messages in a burst, a handful per day. */
const SUBMIT_RULES = [
  { limit: 3, windowMs: 10 * MINUTE_MS },
  { limit: 10, windowMs: DAY_MS },
];

/**
 * Per recipient address, for the automatic confirmation only. Stops the form
 * being used to flood a stranger's inbox: the enquiry still reaches the host,
 * the extra confirmations are just not sent.
 */
const CONFIRMATION_RULES = [{ limit: 2, windowMs: DAY_MS }];

async function verifyTurnstile(secret: string, token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/** Client IP. On Vercel, x-forwarded-for is set by the platform. */
async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Newlines stripped from the name: it ends up in a subject line.
  const name = String(formData.get("name") ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const rawLocale = String(formData.get("locale") ?? "");
  const locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;
  const token = String(formData.get("cf-turnstile-response") ?? "");
  const honeypot = String(formData.get("company") ?? "");

  // Validation
  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "required";
  if (!email) errors.email = "required";
  else if (!EMAIL_RE.test(email)) errors.email = "invalidEmail";
  if (!message) errors.message = "required";
  if (Object.keys(errors).length > 0) return { status: "error", errors };

  // Honeypot - silently accept (so bots don't learn) but don't send.
  if (honeypot) return { status: "success" };

  // Checked before Turnstile so a flood doesn't also hammer Cloudflare.
  if (!allow(`ip:${await clientIp()}`, SUBMIT_RULES)) {
    return { status: "error", reason: "rateLimited" };
  }

  // Spam protection (only enforced when configured)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const ok = await verifyTurnstile(turnstileSecret, token);
    if (!ok) return { status: "error" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const hostAddress = process.env.CONTACT_TO_EMAIL ?? site.email;
  // Enquiries reach the host from a no-reply sender: replying goes to the
  // guest via Reply-To, and mail from info@ to info@ could trip spoofing
  // filters. Confirmations come from the site's own address instead (always
  // on the verified domain, even when CONTACT_TO_EMAIL routes enquiries
  // elsewhere), with Reply-To on the host inbox so the guest's "just reply to
  // this email" lands somewhere they can see.
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Villa Žnjan <onboarding@resend.dev>";
  const confirmationFrom = `Villa Žnjan <${site.email}>`;

  const enquiry = enquiryEmail({ name, email, phone, locale, message });

  if (!apiKey) {
    // No email provider configured (local development without a key).
    console.info(
      "[contact] message received (RESEND_API_KEY unset):\n",
      enquiry.text,
    );
    return { status: "success" };
  }

  // The enquiry to the host is the part that matters: if it fails, the guest
  // is told so they can try again or email directly.
  try {
    await sendEmail(apiKey, {
      from,
      to: hostAddress,
      replyTo: email,
      ...enquiry,
    });
  } catch (err) {
    console.error("[contact] enquiry send failed:", err);
    return { status: "error" };
  }

  // The confirmation is a courtesy. A failure is logged, never shown: the
  // enquiry itself has already arrived.
  if (allow(`confirm:${email.toLowerCase()}`, CONFIRMATION_RULES)) {
    try {
      await sendEmail(apiKey, {
        from: confirmationFrom,
        to: email,
        replyTo: hostAddress,
        ...(await confirmationEmail({ locale, name, message })),
      });
    } catch (err) {
      console.error("[contact] confirmation send failed:", err);
    }
  }

  return { status: "success" };
}
