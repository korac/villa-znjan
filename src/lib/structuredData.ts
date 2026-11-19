import { site } from "@/content/site";
import type { Apartment, ApartmentCopy } from "@/content/apartments";
import { faqItems } from "@/content/faq";
import type { Locale } from "@/i18n/routing";
import { placeUrl } from "@/lib/googleMaps";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

/**
 * schema.org structured data. The villa is described once as a
 * LodgingBusiness with a stable @id; apartment pages point back to it, so
 * search engines see one place with five units rather than six unrelated
 * things. No ratings or prices: Google ignores self-hosted reviews for
 * businesses, and prices aren't published yet.
 */

export const VILLA_ID = `${SITE_URL}/#villa`;

const feature = (name: string) => ({
  "@type": "LocationFeatureSpecification",
  name,
  value: true,
});

export function lodgingBusiness({
  locale,
  description,
  amenities,
}: {
  locale: Locale;
  description: string;
  /** Localised names of house-wide amenities */
  amenities: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": VILLA_ID,
    name: site.name,
    url: absoluteUrl(locale, "/"),
    description,
    image: [`${SITE_URL}/hero1.jpg`, `${SITE_URL}/hero2.jpg`, `${SITE_URL}/og-image.jpg`],
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Makarska 9A",
      postalCode: "21000",
      addressLocality: "Split",
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coordinates.lat,
      longitude: site.coordinates.lng,
    },
    hasMap: placeUrl(),
    checkinTime: site.checkInTime,
    checkoutTime: site.checkOutTime,
    petsAllowed: false,
    amenityFeature: amenities.map(feature),
  };
}

export function faqPage(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.content[locale].question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.content[locale].answer,
      },
    })),
  };
}

export function apartmentSchema({
  locale,
  apartment,
  copy,
  amenities,
}: {
  locale: Locale;
  apartment: Apartment;
  copy: ApartmentCopy;
  /** Localised names of this apartment's amenities */
  amenities: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: `${copy.name} - ${site.name}`,
    url: absoluteUrl(locale, `/apartments/${apartment.slug}`),
    description: copy.description,
    image: apartment.images.slice(0, 6).map((src) => `${SITE_URL}${src}`),
    numberOfBedrooms: apartment.bedrooms,
    numberOfBathroomsTotal: apartment.bathrooms,
    occupancy: { "@type": "QuantitativeValue", maxValue: apartment.maxGuests },
    floorSize: {
      "@type": "QuantitativeValue",
      value: apartment.sizeM2,
      unitCode: "MTK",
    },
    petsAllowed: false,
    amenityFeature: amenities.map(feature),
    containedInPlace: { "@id": VILLA_ID },
  };
}
