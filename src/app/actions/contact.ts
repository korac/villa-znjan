"use server";

import { site } from "@/content/site";

export type ContactFieldError = "required" | "invalidEmail";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "message", ContactFieldError>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const locale = String(formData.get("locale") ?? "en");
  const token = String(formData.get("cf-turnstile-response") ?? "");
  const honeypot = String(formData.get("company") ?? "");

  // Validation
  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "required";
  if (!email) errors.email = "required";
  else if (!EMAIL_RE.test(email)) errors.email = "invalidEmail";
  if (!message) errors.message = "required";
  if (Object.keys(errors).length > 0) return { status: "error", errors };

  // Honeypot — silently accept (so bots don't learn) but don't send.
  if (honeypot) return { status: "success" };

  // Spam protection (only enforced when configured)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const ok = await verifyTurnstile(turnstileSecret, token);
    if (!ok) return { status: "error" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Villa Žnjan <onboarding@resend.dev>";

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Language: ${locale}`,
    "",
    message,
  ].join("\n");

  try {
    if (apiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: email,
          subject: `New enquiry from ${name} — Villa Žnjan`,
          text,
        }),
      });
      if (!res.ok) {
        console.error("[contact] Resend error:", await res.text());
        return { status: "error" };
      }
    } else {
      // Phase 1 fallback: no email provider configured yet.
      console.info("[contact] message received (RESEND_API_KEY unset):\n", text);
    }
    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed:", err);
    return { status: "error" };
  }
}
