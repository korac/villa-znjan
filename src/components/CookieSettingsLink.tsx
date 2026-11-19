"use client";

import { useTranslations } from "next-intl";
import { openConsentBanner } from "@/lib/consent";

/** Footer link that reopens the cookie banner, so consent can be changed. */
export function CookieSettingsLink() {
  const t = useTranslations("cookies");
  return (
    <button
      type="button"
      onClick={openConsentBanner}
      className="cursor-pointer transition-colors hover:text-foreground"
    >
      {t("settings")}
    </button>
  );
}
