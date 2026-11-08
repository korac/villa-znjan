import type { AmenityKey } from "@/content/apartments";
import type { Locale } from "@/i18n/routing";

/**
 * Shared villa facilities — the things that belong to the house rather than to
 * any one unit. Rendered as alternating image/text bands on `/villa` and as a
 * three-card teaser row on the homepage.
 *
 * Copy lives here (not in src/messages) for the same reason apartment copy
 * does: the sections are a fixed, small set and the per-locale prose sits
 * better next to its images than split across three message files.
 *
 * Photos live in `public/gallery/<topic>/` (gym, sauna, spa, terrace, ...)
 * and are listed in `images`; the first one is the lead photo here and the
 * homepage teaser card. While `images` is empty the UI renders stone
 * placeholders.
 *
 * Each band renders a mosaic of the first three images; the rest sit behind a
 * "+N" overlay and open in the lightbox. Six to seven photos per section is
 * the expected shape.
 *
 * Copy confirmed by the owner (2026-09-05; breakfast title and the "house"
 * section 2026-11-08).
 */

export interface VillaSectionCopy {
  /** Short label used on the homepage teaser card and as the band eyebrow */
  label: string;
  /** Band heading */
  title: string;
  /** 2–3 sentence description */
  description: string;
  /** One-line summary for the homepage teaser card (homepage sections only) */
  teaser?: string;
  /** Short facts shown under the description, joined with separators */
  details: string[];
}

export interface VillaSection {
  key: string;
  order: number;
  /** Paths under /public (e.g. "/gallery/gym/gym-1.jpg"). Empty → placeholders. */
  images: string[];
  /**
   * Shown as a card in the homepage teaser row. That row is three columns,
   * so it holds the three headline facilities; the rest appear on /villa only.
   */
  onHomepage: boolean;
  content: Record<Locale, VillaSectionCopy>;
}

export const villaSections: VillaSection[] = [
  {
    key: "pool",
    order: 1,
    onHomepage: true,
    // October 2026 shoot. Picked to avoid repeating the homepage hero
    // (aerials, waterfall head-on, villa at night).
    images: [
      "/gallery/pool/DSC07684.jpg",
      "/gallery/pool/DSC07604.jpg",
      "/gallery/pool/DJI_20260615122156_0093_D.jpg",
      "/gallery/pool/DSC07640.jpg",
      "/gallery/pool/DSC07638.jpg",
      "/gallery/pool/DSC07662.jpg",
      "/gallery/pool/DSC04384.jpg",
      "/gallery/pool/DSC07690.jpg",
      "/gallery/pool/DSC07691.jpg",
    ],
    content: {
      en: {
        label: "Pool",
        title: "The pool",
        description:
          "An outdoor pool set in the garden, with sun loungers, shade for the hottest hours, and a view down towards the sea. Open from May through September.",
        teaser: "Open May to September, sun all day.",
        details: [
          "Open May to September",
          "Sun loungers & shade",
          "Towels included",
        ],
      },
      hr: {
        label: "Bazen",
        title: "Bazen",
        description:
          "Vanjski bazen u vrtu, s ležaljkama, hladom za najtoplije sate i pogledom prema moru. Otvoren od svibnja do rujna.",
        teaser: "Otvoren od svibnja do rujna, sunce cijeli dan.",
        details: [
          "Otvoren od svibnja do rujna",
          "Ležaljke i hlad",
          "Ručnici uključeni",
        ],
      },
      de: {
        label: "Pool",
        title: "Der Pool",
        description:
          "Ein Außenpool im Garten, mit Sonnenliegen, Schatten für die heißesten Stunden und Blick hinunter zum Meer. Geöffnet von Mai bis September.",
        teaser: "Geöffnet von Mai bis September, den ganzen Tag Sonne.",
        details: [
          "Geöffnet von Mai bis September",
          "Sonnenliegen & Schatten",
          "Handtücher inklusive",
        ],
      },
    },
  },
  {
    key: "breakfast",
    order: 2,
    onHomepage: true,
    // Buffet in the breakfast room (off the ground-floor hallway); guests eat
    // there or out on the terrace, which has its own section below.
    // breakfast-4 is portrait: it sits past the first three, behind "+N".
    images: [
      "/gallery/breakfast/breakfast-1.jpg",
      "/gallery/breakfast/breakfast-2.jpg",
      "/gallery/breakfast/breakfast-3.jpg",
      "/gallery/breakfast/breakfast-4.jpg",
      "/gallery/breakfast/breakfast-5.jpg",
    ],
    content: {
      en: {
        label: "Breakfast",
        title: "Breakfast to start your day",
        description:
          "Start the day with fresh bread and good coffee, served every morning from 7:00 to 10:00 AM, in the breakfast room or out on the terrace. Included in the price of your stay.",
        teaser: "Fresh, on the terrace - included in the price.",
        details: ["Included in the price", "Served 7:00 - 10:00 AM"],
      },
      hr: {
        label: "Doručak",
        title: "Doručak za dobar početak dana",
        description:
          "Započnite dan svježim kruhom i dobrom kavom, posluženim svako jutro od 7:00 do 10:00, u sobi za doručak ili vani na terasi. Uključeno u cijenu boravka.",
        teaser: "Svjež, na terasi - uključen u cijenu.",
        details: ["Uključen u cijenu", "Od 7:00 do 10:00"],
      },
      de: {
        label: "Frühstück",
        title: "Frühstück für einen guten Start",
        description:
          "Beginnen Sie den Tag mit frischem Brot und gutem Kaffee, jeden Morgen von 7:00 bis 10:00 Uhr serviert, im Frühstücksraum oder draußen auf der Terrasse. Im Preis Ihres Aufenthalts enthalten.",
        teaser: "Frisch, auf der Terrasse - im Preis enthalten.",
        details: ["Im Preis enthalten", "Von 7:00 bis 10:00 Uhr"],
      },
    },
  },
  {
    key: "terrace",
    order: 3,
    onHomepage: false,
    // terrace-coffee is portrait; with three photos it shows as a cropped tile
    // here and in full in the lightbox.
    images: [
      "/gallery/terrace/terrace-2.jpg",
      "/gallery/terrace/terrace-1.jpg",
      "/gallery/terrace/terrace-coffee.jpg",
    ],
    content: {
      en: {
        label: "Terrace",
        title: "The terrace",
        description:
          "A covered terrace with sofas and tables, for breakfast in the open air or for a relaxed coffee.",
        details: ["Covered", "For all guests"],
      },
      hr: {
        label: "Terasa",
        title: "Terasa",
        description:
          "Natkrivena terasa s udobnim kaučima i stolovima, za doručak na otvorenom ili za opuštenu kavu.",
        details: ["Natkrivena", "Za sve goste"],
      },
      de: {
        label: "Terrasse",
        title: "Die Terrasse",
        description:
          "Eine überdachte Terrasse mit Sofas und Tischen, für das Frühstück im Freien oder für einen entspannten Kaffee.",
        details: ["Überdacht", "Für alle Gäste"],
      },
    },
  },
  {
    key: "gymSauna",
    order: 4,
    onHomepage: true,
    // The relaxation room ("spa") is next to the sauna. Portrait shots
    // (sauna-2) sit past the first three, behind "+N", so they open uncropped.
    images: [
      "/gallery/sauna/sauna-1.jpg",
      "/gallery/gym/gym-3.jpg",
      "/gallery/spa/spa-3.jpg",
      "/gallery/gym/gym-2.jpg",
      "/gallery/spa/spa-2.jpg",
      "/gallery/sauna/sauna-2.jpg",
      "/gallery/gym/gym-1.jpg",
      "/gallery/spa/spa-1.jpg",
    ],
    content: {
      en: {
        label: "Gym, fitness & sauna",
        title: "Keep your rhythm",
        description:
          "A Finnish sauna and a compact, well-equipped gym, both free for guests. Train in the morning, unwind in the sauna after a day on the water.",
        teaser: "Finnish sauna and a compact gym, free for guests.",
        details: ["Free for guests", "Finnish sauna", "Fitness equipment"],
      },
      hr: {
        label: "Teretana, fitness i sauna",
        title: "Zadržite svoj ritam",
        description:
          "Finska sauna i kompaktna, dobro opremljena teretana, oboje besplatno za goste. Trenirajte ujutro, opustite se u sauni nakon dana na moru.",
        teaser: "Finska sauna i kompaktna teretana, besplatno za goste.",
        details: ["Besplatno za goste", "Finska sauna", "Fitness oprema"],
      },
      de: {
        label: "Gym, Fitness & Sauna",
        title: "Bleiben Sie in Ihrem Rhythmus",
        description:
          "Eine finnische Sauna und ein kompakter, gut ausgestatteter Fitnessraum, beides kostenfrei für Gäste. Morgens trainieren, nach einem Tag am Wasser in der Sauna entspannen.",
        teaser: "Finnische Sauna und kompakter Fitnessraum, kostenfrei.",
        details: ["Kostenfrei für Gäste", "Finnische Sauna", "Fitnessgeräte"],
      },
    },
  },
  {
    key: "house",
    order: 5,
    onHomepage: false,
    // Shown tiles (owner's pick): hall, elevator, grill. outdoor-grill-1
    // rather than -3, which is already in the homepage Glimpses gallery.
    // The portrait outdoor-grill-2 goes last, so it only opens in the lightbox.
    images: [
      "/gallery/hall/hall-1.jpg",
      "/gallery/hall/elevator-1.jpg",
      "/gallery/outdoor/outdoor-grill-1.jpg",
      "/gallery/outdoor/entrance.jpg",
      "/gallery/outdoor/entrance-steps.jpg",
      "/gallery/hall/hall-2.jpg",
      "/gallery/outdoor/outdoor-grill-3.jpg",
      "/gallery/outdoor/garden-path.jpg",
      "/gallery/outdoor/outdoor-grill-2.jpg",
    ],
    content: {
      en: {
        label: "The house",
        title: "Welcome",
        description:
          "Make yourself at home. There's an elevator for your luggage, and an outdoor grill in the garden for long summer evenings.",
        details: ["Elevator", "Outdoor grill"],
      },
      hr: {
        label: "Kuća",
        title: "Dobrodošli",
        description:
          "Osjećajte se kao kod kuće. Tu je dizalo za vašu prtljagu i vanjski roštilj u vrtu za duge ljetne večeri.",
        details: ["Dizalo", "Vanjski roštilj"],
      },
      de: {
        label: "Das Haus",
        title: "Willkommen",
        description:
          "Fühlen Sie sich wie zu Hause. Es gibt einen Aufzug für Ihr Gepäck und einen Außengrill im Garten für lange Sommerabende.",
        details: ["Aufzug", "Außengrill"],
      },
    },
  },
];

/**
 * Practical house-wide facilities listed as a plain grid on `/villa`.
 * Pool, sauna, gym, elevator and outdoor grill are omitted - they get their
 * own sections above.
 * Keys resolve against the `amenities` namespace in src/messages/*.json.
 */
export const villaAmenities: AmenityKey[] = [
  "wifi",
  "parking",
  "airConditioning",
  "crib",
  "tv",
  "washingMachine",
];

export function getVillaSectionsOrdered(): VillaSection[] {
  return [...villaSections].sort((a, b) => a.order - b.order);
}
