"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/Button";
import {
  CONSENT_OPEN_EVENT,
  setConsent,
  syncAnalytics,
  useConsent,
} from "@/lib/consent";

/**
 * Cookie banner: Accept / Decline with equal weight, plus a link to the
 * privacy policy. Shown until the visitor chooses; reopened from the footer.
 * A card in the bottom-right corner from sm up; full width on phones.
 */
export function CookieBanner() {
  const t = useTranslations("cookies");
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  // Re-apply a stored choice to PostHog on every page load.
  useEffect(() => {
    syncAnalytics(consent);
  }, [consent]);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  if (consent !== "pending" && !reopened) return null;

  const choose = (choice: "granted" | "denied") => {
    setConsent(choice);
    setReopened(false);
  };

  return (
    <div
      role="region"
      aria-label={t("label")}
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:inset-x-auto sm:right-0 sm:p-6"
    >
      <div className="flex flex-col gap-4 border border-border bg-background p-5 shadow-lg sm:w-96">
        <p className="text-sm leading-relaxed text-muted">
          {t("text")}{" "}
          <Link
            href="/privacy"
            className="underline decoration-muted/50 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            {t("privacy")}
          </Link>
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className={buttonClasses("outline", "flex-1 px-5")}
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className={buttonClasses("primary", "flex-1 px-5")}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
