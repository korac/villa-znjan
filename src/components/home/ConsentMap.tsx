"use client";

import { useTranslations } from "next-intl";
import { openConsentBanner, useConsent } from "@/lib/consent";

/**
 * The Google map sets third-party cookies, so it only loads after the
 * visitor accepts cookies. Until then (or after "Decline") a stone
 * placeholder takes its place; the "Find us" button next to it still opens
 * the listing on Google Maps.
 */
export function ConsentMap({ src, title }: { src: string; title: string }) {
  const t = useTranslations("cookies");
  const consent = useConsent();

  if (consent !== "granted") {
    return (
      <div className="flex aspect-[4/3] h-full w-full flex-col items-center justify-center gap-4 bg-surface-deep p-8 text-center lg:aspect-auto">
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          {t("mapPlaceholder")}
        </p>
        <button
          type="button"
          onClick={openConsentBanner}
          className="cursor-pointer text-xs uppercase tracking-[0.18em] text-foreground underline decoration-muted/50 underline-offset-4 transition-colors hover:decoration-foreground"
        >
          {t("settings")}
        </button>
      </div>
    );
  }

  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className="aspect-[4/3] h-full w-full border-0 bg-surface-deep lg:aspect-auto dark:brightness-[0.6]"
    />
  );
}
