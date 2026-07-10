import type { Locale } from "@/i18n/routing";

/**
 * Static source-of-truth for the five fixed apartment units.
 *
 * Apartment identity is a fixed `slug` enum — operational data in Supabase
 * (bookings, availability_blocks, pricing_rules) references units by this slug.
 * Marketing content lives here (not in the DB) because the units are fixed.
 *
 * Source: owner spec PDF (2026-06-08). Values marked "TBD" below were highlighted
 * yellow in the spec and are pending owner confirmation — the 34 m² for every
 * unit and several bed configurations are placeholders to be verified before
 * launch.
 *
 * Photos: drop real files into `public/apartments/<slug>/` and list them in
 * `images`. While `images` is empty, the UI renders elegant stone placeholders.
 */

// Amenity keys map 1:1 to the `amenities` namespace in src/messages/*.json
export type AmenityKey =
  // Shared villa amenities
  | "wifi"
  | "airConditioning"
  | "tv"
  | "elevator"
  | "parking"
  | "crib"
  // Outdoor + view
  | "seaView"
  | "terrace"
  | "balcony"
  // In-apartment essentials
  | "kitchen"
  | "washingMachine"
  // Kitchen appliances
  | "stove"
  | "oven"
  | "microwave"
  | "refrigerator"
  | "miniFridge"
  | "dishwasher"
  | "kettle"
  | "hairDryer"
  // Villa-wide shared facilities
  | "heatedPool"
  | "outdoorGrill"
  | "sauna"
  | "gym";

export interface ApartmentCopy {
  /** Display name (proper noun — usually identical across locales) */
  name: string;
  /** One-line tagline shown under the name */
  tagline: string;
  /** 2–3 sentence description */
  description: string;
  /** Floor label, e.g. "Ground floor" / "Prizemlje" / "Erdgeschoss" */
  floor: string;
  /** Bed configuration, e.g. "1 × King-size · 2 × Double · 1 × Single" */
  beds: string;
  /** Rooms summary, e.g. "Kitchen, dining, living" */
  rooms: string;
}

export interface Apartment {
  slug: string;
  order: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  /** Square metres. TBD per owner spec — placeholder until verified. */
  sizeM2: number;
  /** Number of balconies + terraces combined. */
  outdoorSpaces: number;
  /** Indicative "from" nightly rate in EUR. Live pricing comes from Supabase in Phase 2. */
  basePriceEur: number;
  amenities: AmenityKey[];
  /** Paths under /public (e.g. "/apartments/palma/01.jpg"). Empty → placeholders. */
  images: string[];
  content: Record<Locale, ApartmentCopy>;
}

// Every guest has access to these regardless of unit, so they appear on every
// apartment page. Listed once and spread into each apartment's amenities below.
const SHARED_AMENITIES: AmenityKey[] = [
  "wifi",
  "airConditioning",
  "tv",
  "parking",
  "crib",
  "heatedPool",
  "outdoorGrill",
  "sauna",
  "gym",
];

export const apartments: Apartment[] = [
  // A1 — Maslina (ground floor, 3BR, family flagship)
  {
    slug: "maslina",
    order: 1,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    sizeM2: 114,
    outdoorSpaces: 1,
    basePriceEur: 390,
    amenities: [
      ...SHARED_AMENITIES,
      "balcony",
      "kitchen",
      "stove",
      "oven",
      "dishwasher",
      "microwave",
      "refrigerator",
      "hairDryer",
      "washingMachine",
    ],
    images: [
      "/apartments/lavanda/1.jpg",
      "/apartments/lavanda/2.jpg",
      "/apartments/lavanda/3.jpg",
      "/apartments/lavanda/4.jpg",
      "/apartments/lavanda/5.jpeg",
      "/apartments/lavanda/6.jpeg",
    ],
    content: {
      en: {
        name: "Maslina",
        tagline: "Family comfort on the garden floor",
        description:
          "Our spacious ground-floor apartment with three bedrooms, two bathrooms, and a balcony overlooking the garden and pool. The right choice for larger families or anyone who simply wants the very best.",
        floor: "Ground floor",
        beds: "1 × King-size · 2 × Double · 1 × Single",
        rooms: "Kitchen, dining, living",
      },
      hr: {
        name: "Maslina",
        tagline: "Obiteljska udobnost u prizemlju",
        description:
          "Prostrani apartman u prizemlju s tri spavaće sobe, dvije kupaonice i balkonom s pogledom na vrt s bazenom. Pravi izbor za veće obitelji ili one koji jednostavno žele ono najbolje.",
        floor: "Prizemlje",
        beds: "1 × King-size · 2 × Double · 1 × Single",
        rooms: "Kuhinja, blagovaonica, dnevni boravak",
      },
      de: {
        name: "Maslina",
        tagline: "Familienkomfort im Erdgeschoss",
        description:
          "Unser geräumiges Erdgeschoss-Apartment mit drei Schlafzimmern, zwei Bädern und einem Balkon mit Blick auf Garten und Pool. Die richtige Wahl für größere Familien oder alle, die einfach das Beste wollen.",
        floor: "Erdgeschoss",
        beds: "1 × King-size · 2 × Double · 1 × Single",
        rooms: "Küche, Esszimmer, Wohnzimmer",
      },
    },
  },

  // A2 — Brnistra (attic, 1BR + sleeping gallery, sea view)
  {
    slug: "brnistra",
    order: 2,
    maxGuests: 4,
    bedrooms: 1,
    bathrooms: 1,
    sizeM2: 63,
    outdoorSpaces: 1,
    basePriceEur: 160,
    amenities: [
      ...SHARED_AMENITIES,
      "terrace",
      "seaView",
      "elevator",
      "kitchen",
      "stove",
      "microwave",
      "refrigerator",
      "kettle",
      "hairDryer",
      "washingMachine",
    ],
    images: [
      "/apartments/marina/1.jpg",
      // "/apartments/marina/2.jpg",
      "/apartments/marina/3.jpg",
      // "/apartments/marina/4.jpg",
      "/apartments/marina/5.jpg",
      // "/apartments/marina/6.jpg",
      "/apartments/marina/7.jpg",
      // "/apartments/marina/8.jpg",
      "/apartments/marina/9.jpg",
    ],
    content: {
      en: {
        name: "Brnistra",
        tagline: "Top-floor terrace with sea view",
        description:
          "An airy attic apartment with one bedroom, a full kitchen, a living room, and a generous terrace looking out to the sea. Ideal for a couple or small family seeking light, comfort, and the nearness of the Adriatic.",
        floor: "Top floor / attic",
        beds: "1 × Double · 3 × Single", // TBD per owner spec
        rooms: "Kitchen, dining, living, sleeping gallery",
      },
      hr: {
        name: "Brnistra",
        tagline: "Potkrovna terasa s pogledom na more",
        description:
          "Prozračan apartman s jednom spavaćom sobom, kuhinjom, dnevnim boravkom te prostranom terasom s pogledom na more. Idealan za par ili manju obitelj koja traži svjetlo, udobnost i blizinu mora.",
        floor: "Treći kat / potkrovlje",
        beds: "1 × Double · 3 × Single",
        rooms: "Kuhinja, blagovaonica, dnevni boravak, spavaća galerija",
      },
      de: {
        name: "Brnistra",
        tagline: "Dachterrasse mit Meerblick",
        description:
          "Ein luftiges Dachgeschoss-Apartment mit einem Schlafzimmer, voll ausgestatteter Küche, Wohnzimmer und einer großzügigen Terrasse mit Blick auf die Adria. Ideal für ein Paar oder eine kleine Familie auf der Suche nach Licht, Komfort und der Nähe zum Meer.",
        floor: "Dachgeschoss",
        beds: "1 × Double · 3 × Single",
        rooms: "Küche, Esszimmer, Wohnzimmer, Schlafgalerie",
      },
    },
  },

  // A3 — Oleandar (attic, hotel-style room with ensuite, archipelago view)
  {
    slug: "oleandar",
    order: 3,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    sizeM2: 21,
    outdoorSpaces: 0,
    basePriceEur: 95,
    amenities: [
      ...SHARED_AMENITIES,
      "seaView",
      "elevator",
      "kettle",
      "miniFridge",
      "hairDryer",
    ],
    images: [],
    content: {
      en: {
        name: "Oleandar",
        tagline: "Quiet hideaway above the archipelago",
        description:
          "A private room with a spacious ensuite bathroom and a view over the Split archipelago. Carefully furnished in warm, natural tones — the perfect base for a couple's escape to the coast.",
        floor: "Top floor / attic",
        beds: "1 × Double",
        rooms: "No additional rooms",
      },
      hr: {
        name: "Oleandar",
        tagline: "Mirno utočište iznad arhipelaga",
        description:
          "Privatna soba s prostranom ensuite kupaonicom te pogledom na splitski arhipelag. Pažljivo opremljena u toplim, prirodnim tonovima — savršena baza za bijeg dvoje na obalu.",
        floor: "Treći kat / potkrovlje",
        beds: "1 × Double",
        rooms: "Nema dodatnih prostorija",
      },
      de: {
        name: "Oleandar",
        tagline: "Ruhiger Rückzugsort über dem Archipel",
        description:
          "Ein privates Zimmer mit geräumigem Ensuite-Bad und Blick auf den Splitter Archipel. Geschmackvoll in warmen, natürlichen Tönen eingerichtet — die perfekte Basis für eine Auszeit zu zweit an der Küste.",
        floor: "Dachgeschoss",
        beds: "1 × Double",
        rooms: "Keine zusätzlichen Räume",
      },
    },
  },

  // A4 — Palma (attic, 2BR, balcony + terrace, sea view)
  {
    slug: "palma",
    order: 4,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    sizeM2: 81,
    outdoorSpaces: 2,
    basePriceEur: 210,
    amenities: [
      ...SHARED_AMENITIES,
      "balcony",
      "terrace",
      "seaView",
      "elevator",
      "kitchen",
      "stove",
      "microwave",
      "refrigerator",
      "kettle",
      "hairDryer",
      "washingMachine",
    ],
    images: [
      "/apartments/adriana/7.jpg",
      "/apartments/adriana/5.jpg",
      "/apartments/adriana/1.jpg",
      // "/apartments/adriana/2.jpg",
      "/apartments/adriana/3.jpg",
      // "/apartments/adriana/4.jpg",
      "/apartments/adriana/6.jpg",
    ],
    content: {
      en: {
        name: "Palma",
        tagline: "Two bedrooms with a sea-frame terrace",
        description:
          "An elegant two-bedroom apartment with a full bathroom and a wide terrace framing the sea. Space enough for the whole family to gather, dine outdoors, and slow down.",
        floor: "Top floor / attic",
        beds: "1 × Double · 2 × Single", // TBD per owner spec
        rooms: "Open-plan kitchen, dining, and living",
      },
      hr: {
        name: "Palma",
        tagline: "Dvije sobe i terasa uz more",
        description:
          "Elegantan apartman s dvije spavaće sobe i kupaonicom te širokom terasom koja uokviruje more. Dovoljno prostora da se cijela obitelj okupi, objeduje na otvorenom i uspori.",
        floor: "Treći kat / potkrovlje",
        beds: "1 × Double · 2 × Single",
        rooms: "Open-space kuhinja, blagovaonica i dnevni boravak",
      },
      de: {
        name: "Palma",
        tagline: "Zwei Schlafzimmer mit Meerblick-Terrasse",
        description:
          "Ein elegantes Apartment mit zwei Schlafzimmern, einem Bad und einer weiten Terrasse, die das Meer einrahmt. Genug Platz, damit die ganze Familie zusammenkommt, draußen speist und zur Ruhe kommt.",
        floor: "Dachgeschoss",
        beds: "1 × Double · 2 × Single",
        rooms: "Offene Küche, Esszimmer und Wohnzimmer",
      },
    },
  },

  // A5 — Lavanda (2nd floor, 1BR + sofa bed, terrace, sea view)
  {
    slug: "lavanda",
    order: 5,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    sizeM2: 58,
    outdoorSpaces: 1,
    basePriceEur: 140,
    amenities: [
      ...SHARED_AMENITIES,
      "terrace",
      "seaView",
      "elevator",
      "kettle",
      "miniFridge",
      "hairDryer",
      "washingMachine",
    ],
    images: [
      "/apartments/jadran/1.JPG",
      "/apartments/jadran/2.JPG",
      "/apartments/jadran/3.JPG",
      "/apartments/jadran/4.JPG",
      "/apartments/jadran/5.JPG",
    ],
    content: {
      en: {
        name: "Lavanda",
        tagline: "Morning light and unhurried breakfasts",
        description:
          "A serene one-bedroom apartment bathed in morning light, with a private terrace and sea view for unhurried breakfasts. Designed for friends and small families who value space, privacy, and a touch of indulgence.",
        floor: "Second floor",
        beds: "1 × King-size · 1 × Sofa bed", // TBD per owner spec
        rooms: "Living room",
      },
      hr: {
        name: "Lavanda",
        tagline: "Jutarnje svjetlo i nesmetani doručci",
        description:
          "Spokojan apartman s jednom spavaćom sobom okupan jutarnjim svjetlom, s privatnom terasom i pogledom na more za nesmetane doručke. Osmišljen za prijatelje i manje obitelji koji cijene prostor, privatnost i dašak luksuza.",
        floor: "2. kat",
        beds: "1 × King-size · 1 × Sofa bed",
        rooms: "Dnevni boravak",
      },
      de: {
        name: "Lavanda",
        tagline: "Morgenlicht und gemütliche Frühstücke",
        description:
          "Ein ruhiges Apartment mit einem Schlafzimmer, durchflutet von Morgenlicht, mit privater Terrasse und Meerblick für gemütliche Frühstücke. Konzipiert für Freunde und kleinere Familien, die Raum, Privatsphäre und ein wenig Luxus schätzen.",
        floor: "Zweite Etage",
        beds: "1 × King-size · 1 × Sofa bed",
        rooms: "Wohnzimmer",
      },
    },
  },
];

export const apartmentSlugs = apartments.map((a) => a.slug);

export function getApartment(slug: string): Apartment | undefined {
  return apartments.find((a) => a.slug === slug);
}

export function getApartmentsOrdered(): Apartment[] {
  return [...apartments].sort((a, b) => a.order - b.order);
}
