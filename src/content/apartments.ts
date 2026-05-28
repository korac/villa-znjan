import type { Locale } from "@/i18n/routing";

/**
 * Static source-of-truth for the five fixed apartment units.
 *
 * Apartment identity is a fixed `slug` enum — operational data in Supabase
 * (bookings, availability_blocks, pricing_rules) references units by this slug.
 * Marketing content lives here (not in the DB) because the units are fixed.
 *
 * Photos: drop real files into `public/apartments/<slug>/` and list them in
 * `images`. While `images` is empty, the UI renders elegant stone placeholders.
 */

// Amenity keys map 1:1 to the `amenities` namespace in src/messages/*.json
export type AmenityKey =
  | "wifi"
  | "airConditioning"
  | "kitchen"
  | "seaView"
  | "terrace"
  | "balcony"
  | "parking"
  | "washingMachine"
  | "tv"
  | "coffeeMachine"
  | "dishwasher"
  | "elevator"
  | "petsAllowed"
  | "crib";

export interface ApartmentCopy {
  /** Display name (proper noun — usually identical across locales) */
  name: string;
  /** One-line tagline shown under the name */
  tagline: string;
  /** 2–3 sentence description */
  description: string;
}

export interface Apartment {
  slug: string;
  order: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  sizeM2: number;
  /** Indicative "from" nightly rate in EUR. Live pricing comes from Supabase in Phase 2. */
  basePriceEur: number;
  amenities: AmenityKey[];
  /** Paths under /public (e.g. "/apartments/marina/01.jpg"). Empty → placeholders. */
  images: string[];
  content: Record<Locale, ApartmentCopy>;
}

export const apartments: Apartment[] = [
  {
    slug: "lavanda",
    order: 1,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    sizeM2: 34,
    basePriceEur: 120,
    amenities: [
      "wifi",
      "airConditioning",
      "kitchen",
      "balcony",
      "tv",
      "coffeeMachine",
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
        name: "Lavanda",
        tagline: "An intimate retreat for two",
        description:
          "A serene one-bedroom hideaway bathed in morning light, with a private balcony for unhurried breakfasts. Thoughtfully furnished in warm, natural tones — the perfect base for a couple's escape to the coast.",
      },
      hr: {
        name: "Lavanda",
        tagline: "Intimno utočište za dvoje",
        description:
          "Spokojan apartman s jednom spavaćom sobom okupan jutarnjim svjetlom, s privatnim balkonom za nesmetane doručke. Pažljivo opremljen u toplim, prirodnim tonovima — savršena baza za bijeg dvoje na obalu.",
      },
      de: {
        name: "Lavanda",
        tagline: "Ein intimer Rückzugsort für zwei",
        description:
          "Ein ruhiges Apartment mit einem Schlafzimmer, durchflutet von Morgenlicht, mit privatem Balkon für gemütliche Frühstücke. Geschmackvoll in warmen, natürlichen Tönen eingerichtet — die perfekte Basis für eine Auszeit zu zweit an der Küste.",
      },
    },
  },
  {
    slug: "marina",
    order: 2,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    sizeM2: 63,
    basePriceEur: 160,
    amenities: [
      "wifi",
      "airConditioning",
      "kitchen",
      "seaView",
      "balcony",
      "tv",
      "coffeeMachine",
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
        name: "Marina",
        tagline: "Sea views and open living",
        description:
          "An airy one-bedroom apartment with a generous living space that opens to glimpses of the Adriatic. Ideal for a couple or small family seeking light, comfort, and the sound of the sea nearby.",
      },
      hr: {
        name: "Marina",
        tagline: "Pogled na more i otvoren prostor",
        description:
          "Prozračan apartman s jednom spavaćom sobom i prostranim dnevnim boravkom koji se otvara prema pogledu na Jadran. Idealan za par ili manju obitelj koja traži svjetlo, udobnost i blizinu mora.",
      },
      de: {
        name: "Marina",
        tagline: "Meerblick und offenes Wohnen",
        description:
          "Ein luftiges Apartment mit einem Schlafzimmer und großzügigem Wohnbereich, der den Blick auf die Adria freigibt. Ideal für ein Paar oder eine kleine Familie auf der Suche nach Licht, Komfort und der Nähe zum Meer.",
      },
    },
  },
  {
    slug: "maslina",
    order: 3,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    sizeM2: 68,
    basePriceEur: 210,
    amenities: [
      "wifi",
      "airConditioning",
      "kitchen",
      "terrace",
      "tv",
      "coffeeMachine",
      "washingMachine",
      "dishwasher",
      "parking",
    ],
    images: [],
    content: {
      en: {
        name: "Maslina",
        tagline: "Family comfort under the olive tree",
        description:
          "A spacious two-bedroom apartment opening onto a sun-dappled terrace, named for the olive groves that define this coast. Room for the whole family to gather, dine outdoors, and slow down.",
      },
      hr: {
        name: "Maslina",
        tagline: "Obiteljska udobnost pod maslinom",
        description:
          "Prostran apartman s dvije spavaće sobe koji se otvara na sunčanu terasu, nazvan po maslinicima koji obilježavaju ovu obalu. Dovoljno prostora da se cijela obitelj okupi, objeduje na otvorenom i uspori.",
      },
      de: {
        name: "Maslina",
        tagline: "Familienkomfort unter dem Olivenbaum",
        description:
          "Ein geräumiges Apartment mit zwei Schlafzimmern und sonniger Terrasse, benannt nach den Olivenhainen dieser Küste. Platz für die ganze Familie, um zusammenzukommen, draußen zu speisen und zur Ruhe zu kommen.",
      },
    },
  },
  {
    slug: "adriana",
    order: 4,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    sizeM2: 82,
    basePriceEur: 250,
    amenities: [
      "wifi",
      "airConditioning",
      "kitchen",
      "seaView",
      "terrace",
      "tv",
      "coffeeMachine",
      "washingMachine",
      "dishwasher",
      "parking",
      "crib",
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
        name: "Adriana",
        tagline: "Refined living with two bathrooms",
        description:
          "An elegant two-bedroom residence with two full bathrooms and a wide terrace framing the sea. Designed for families and friends who value space, privacy, and a touch of indulgence.",
      },
      hr: {
        name: "Adriana",
        tagline: "Profinjeno življenje s dvije kupaonice",
        description:
          "Elegantan apartman s dvije spavaće sobe i dvije kupaonice te širokom terasom koja uokviruje more. Osmišljen za obitelji i prijatelje koji cijene prostor, privatnost i dašak luksuza.",
      },
      de: {
        name: "Adriana",
        tagline: "Gehobenes Wohnen mit zwei Bädern",
        description:
          "Eine elegante Residenz mit zwei Schlafzimmern, zwei Bädern und einer weiten Terrasse, die das Meer einrahmt. Konzipiert für Familien und Freunde, die Raum, Privatsphäre und ein wenig Luxus schätzen.",
      },
    },
  },
  {
    slug: "jadran",
    order: 5,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    sizeM2: 105,
    basePriceEur: 390,
    amenities: [
      "wifi",
      "airConditioning",
      "kitchen",
      "seaView",
      "terrace",
      "tv",
      "coffeeMachine",
      "washingMachine",
      "dishwasher",
      "parking",
      "elevator",
      "crib",
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
        name: "Penthouse Jadran",
        tagline: "The crown of Villa Žnjan",
        description:
          "Our top-floor penthouse with three bedrooms, a sweeping sea-view terrace, and the finest finishes in the house. The definitive choice for larger families or those who simply want the very best.",
      },
      hr: {
        name: "Penthouse Jadran",
        tagline: "Kruna Ville Žnjan",
        description:
          "Naš penthouse na posljednjem katu s tri spavaće sobe, prostranom terasom s pogledom na more i najljepšim detaljima u kući. Pravi izbor za veće obitelji ili one koji jednostavno žele ono najbolje.",
      },
      de: {
        name: "Penthouse Jadran",
        tagline: "Die Krone der Villa Žnjan",
        description:
          "Unser Penthouse im obersten Stock mit drei Schlafzimmern, einer weitläufigen Terrasse mit Meerblick und der edelsten Ausstattung im Haus. Die erste Wahl für größere Familien oder alle, die einfach das Beste wollen.",
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
