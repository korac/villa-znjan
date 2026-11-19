import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { UnlockForm } from "./UnlockForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Villa Žnjan",
  robots: { index: false, follow: false },
};

export default async function UnlockPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("unlock");

  return (
    <main className="flex min-h-screen flex-1 items-center py-16">
      <Container>
        <div className="mx-auto w-full max-w-md border border-border bg-surface p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-serif text-3xl leading-tight">
            {t("heading")}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {t("description")}
          </p>
          <Suspense fallback={null}>
            <UnlockForm />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
