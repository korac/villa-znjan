import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ApartmentCard } from "@/components/ApartmentCard";
import { Hero } from "@/components/home/Hero";
import { GallerySection } from "@/components/home/GallerySection";
import { VillaTeaser } from "@/components/villa/VillaTeaser";
import { LocationSection } from "@/components/home/LocationSection";
import { ContactSection } from "@/components/ContactSection";
import { getApartmentsOrdered } from "@/content/apartments";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const apartments = getApartmentsOrdered();

  return (
    <main>
      <Hero />

      {/* Intro */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              {t("intro.heading")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {t("intro.body")}
            </p>
          </div>
        </Container>
      </section>

      {/* Apartments */}
      <section id="apartments" className="scroll-mt-24 border-t border-border py-24">
        <Container width="narrow">
          <SectionHeading
            eyebrow={t("hero.eyebrow")}
            title={t("units.heading")}
            subtitle={t("units.subheading")}
          />
          {/* Row 1: first two cards span 3/6 each; row 2: last three span 2/6 each. */}
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-6">
            {apartments.map((apartment, i) => (
              <ApartmentCard
                key={apartment.slug}
                apartment={apartment}
                index={i}
                className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Villa facilities teaser → /villa */}
      <VillaTeaser />

      <LocationSection />

      <GallerySection />

      {/* Contact — sits directly before the footer */}
      <ContactSection className="border-t border-border py-24" />
    </main>
  );
}
