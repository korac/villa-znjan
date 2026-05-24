import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-foreground/60">
        {t("hero.eyebrow")}
      </p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
        {t("hero.title")}
      </h1>
      <p className="mt-4 text-lg text-foreground/70">{t("hero.subtitle")}</p>
    </main>
  );
}
