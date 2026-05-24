"use client";

import { useActionState } from "react";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";
import {
  submitContact,
  type ContactState,
  type ContactFieldError,
} from "@/app/actions/contact";
import { Button } from "@/components/Button";

const initialState: ContactState = { status: "idle" };
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const fieldClasses =
  "w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent";
const labelClasses = "block text-xs uppercase tracking-[0.15em] text-muted";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="border border-accent/30 bg-surface p-8 text-center"
      >
        <p className="font-serif text-2xl text-foreground">✓</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t("success")}
        </p>
      </div>
    );
  }

  const errorFor = (key: ContactFieldError | undefined) =>
    key ? t(key) : undefined;

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot — hidden from users, attracts bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="name" className={labelClasses}>
          {t("name")}
        </label>
        <input id="name" name="name" type="text" className={`mt-2 ${fieldClasses}`} />
        {errorFor(state.errors?.name) && (
          <p className="mt-1 text-xs text-accent">{errorFor(state.errors?.name)}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClasses}>
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-2 ${fieldClasses}`}
          />
          {errorFor(state.errors?.email) && (
            <p className="mt-1 text-xs text-accent">
              {errorFor(state.errors?.email)}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            {t("phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`mt-2 ${fieldClasses}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={`mt-2 resize-none ${fieldClasses}`}
        />
        {errorFor(state.errors?.message) && (
          <p className="mt-1 text-xs text-accent">
            {errorFor(state.errors?.message)}
          </p>
        )}
      </div>

      {turnstileSiteKey && (
        <>
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          />
        </>
      )}

      {state.status === "error" && !state.errors && (
        <p className="text-sm text-accent">{t("error")}</p>
      )}

      <Button type="submit" variant="primary" disabled={pending}>
        {pending ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
