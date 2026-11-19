import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ApartmentCard } from "@/components/ApartmentCard";
import { Hero } from "@/components/home/Hero";
import { GallerySection } from "@/components/home/GallerySection";
import { VillaTeaser } from "@/components/villa/VillaTeaser";
import { LocationSection } from "@/components/home/LocationSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { getApartmentsOrdered } from "@/content/apartments";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { lodgingBusiness, faqPage } from "@/lib/structuredData";
import { villaSections } from "@/content/villa";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

/** House-wide facilities named in the villa's structured data. */
const HOUSE_AMENITIES = [
  "pool",
  "sauna",
  "gym",
  "outdoorGrill",
  "parking",
  "wifi",
  "airConditioning",
  "elevator",
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tAll = await getTranslations();
  const apartments = getApartmentsOrdered();
  const breakfast = villaSections.find((s) => s.key === "breakfast");

  return (
    <main>
      <JsonLd
        data={lodgingBusiness({
          locale,
          description: tAll("meta.description"),
          amenities: [
            ...(breakfast ? [breakfast.content[locale].label] : []),
            ...HOUSE_AMENITIES.map((key) => tAll(`amenities.${key}`)),
          ],
        })}
      />
      <JsonLd data={faqPage(locale)} />
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

      <ContactSection className="border-t border-border py-24" />

      {/* FAQ - after the contact form, directly before the footer */}
      <FaqSection />
    </main>
  );
}
