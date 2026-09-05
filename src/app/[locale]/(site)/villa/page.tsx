import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactSection } from "@/components/ContactSection";
import { VillaFeature } from "@/components/villa/VillaFeature";
import { getVillaSectionsOrdered, villaAmenities } from "@/content/villa";
import { routing, type Locale } from "@/i18n/routing";

// Owner to supply a dedicated villa exterior shot; using an existing hero for now.
const HERO_IMAGE = "/hero3.jpg";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "villa" });
  return {
    title: `${t("hero.heading")} — Villa Žnjan`,
    description: t("hero.subheading"),
  };
}

export default async function VillaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const sections = getVillaSectionsOrdered();

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[52vh] items-end overflow-hidden">
        <Photo
          src={HERO_IMAGE}
          alt={t("villa.hero.heading")}
          index={0}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/35 to-foreground/10" />
        <Container className="relative">
          <div className="max-w-2xl py-16 text-background [text-shadow:0_2px_16px_rgb(0_0_0/0.75)]">
            <p className="text-xs uppercase tracking-[0.3em] text-background/80">
              {t("villa.hero.eyebrow")}
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
              {t("villa.hero.heading")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-background/90">
              {t("villa.hero.subheading")}
            </p>
          </div>
        </Container>
      </section>

      {/* Facility bands — alternating image/text */}
      {sections.map((section, i) => (
        <VillaFeature key={section.key} section={section} index={i} />
      ))}

      {/* Practical house-wide facilities */}
      <section className="border-t border-border py-24">
        <Container>
          <SectionHeading
            title={t("villa.amenities.heading")}
            subtitle={t("villa.amenities.subheading")}
            align="center"
          />
          <ul className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {villaAmenities.map((amenity) => (
              <li key={amenity} className="flex items-center gap-3 text-sm">
                <span className="text-accent" aria-hidden>
                  —
                </span>
                <span>{t(`amenities.${amenity}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactSection className="bg-surface py-24" />
    </main>
  );
}
