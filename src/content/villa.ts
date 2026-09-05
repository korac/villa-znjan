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
 * Photos: drop real files into `public/villa/<key>/` and list them in
 * `images`. While `images` is empty the UI renders stone placeholders.
 *
 * Each band renders a mosaic of the first three images; the rest sit behind a
 * "+N" overlay and open in the lightbox. Six to seven photos per section is
 * the expected shape.
 *
 * Copy confirmed by the owner (2026-09-05).
 */

export interface VillaSectionCopy {
  /** Short label used on the homepage teaser card and as the band eyebrow */
  label: string;
  /** Band heading */
  title: string;
  /** 2–3 sentence description */
  description: string;
  /** One-line summary used on the homepage teaser card */
  teaser: string;
  /** Short facts shown under the description, joined with separators */
  details: string[];
}

export interface VillaSection {
  key: string;
  order: number;
  /** Paths under /public (e.g. "/villa/pool/01.jpg"). Empty → placeholders. */
  images: string[];
  content: Record<Locale, VillaSectionCopy>;
}

export const villaSections: VillaSection[] = [
  {
    key: "pool",
    order: 1,
    images: [],
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
    images: [],
    content: {
      en: {
        label: "Breakfast",
        title: "Mornings on the terrace",
        description:
          "Start the day with fresh bread, local produce, Dalmatian olive oil and good coffee, served on the terrace every morning from 7:00 to 10:00. Included in the price of your stay.",
        teaser: "Fresh, local, on the terrace - included in the price.",
        details: ["Included in the price", "Served 7:00 - 10:00"],
      },
      hr: {
        label: "Doručak",
        title: "Jutra na terasi",
        description:
          "Započnite dan svježim kruhom, domaćim namirnicama, dalmatinskim maslinovim uljem i dobrom kavom, posluženim na terasi svako jutro od 7:00 do 10:00. Uključeno u cijenu boravka.",
        teaser: "Svjež, domaći, na terasi - uključen u cijenu.",
        details: ["Uključen u cijenu", "Posluženo 7:00 - 10:00"],
      },
      de: {
        label: "Frühstück",
        title: "Morgen auf der Terrasse",
        description:
          "Beginnen Sie den Tag mit frischem Brot, regionalen Produkten, dalmatinischem Olivenöl und gutem Kaffee, jeden Morgen von 7:00 bis 10:00 Uhr auf der Terrasse serviert. Im Preis Ihres Aufenthalts enthalten.",
        teaser: "Frisch, regional, auf der Terrasse - im Preis enthalten.",
        details: ["Im Preis enthalten", "Serviert 7:00 - 10:00"],
      },
    },
  },
  {
    key: "gymSauna",
    order: 3,
    images: [],
    content: {
      en: {
        label: "Gym & sauna",
        title: "Keep your rhythm",
        description:
          "A Finnish sauna and a compact, well-equipped gym, both free for guests. Train in the morning, unwind in the sauna after a day on the water.",
        teaser: "Finnish sauna and a compact gym, free for guests.",
        details: ["Free for guests", "Finnish sauna"],
      },
      hr: {
        label: "Teretana i sauna",
        title: "Zadržite svoj ritam",
        description:
          "Finska sauna i kompaktna, dobro opremljena teretana, oboje besplatno za goste. Trenirajte ujutro, opustite se u sauni nakon dana na moru.",
        teaser: "Finska sauna i kompaktna teretana, besplatno za goste.",
        details: ["Besplatno za goste", "Finska sauna"],
      },
      de: {
        label: "Gym & Sauna",
        title: "Bleiben Sie in Ihrem Rhythmus",
        description:
          "Eine finnische Sauna und ein kompakter, gut ausgestatteter Fitnessraum, beides kostenfrei für Gäste. Morgens trainieren, nach einem Tag am Wasser in der Sauna entspannen.",
        teaser: "Finnische Sauna und kompakter Fitnessraum, kostenfrei.",
        details: ["Kostenfrei für Gäste", "Finnische Sauna"],
      },
    },
  },
];

/**
 * Practical house-wide facilities listed as a plain grid on `/villa`.
 * Pool, sauna and gym are omitted — they get their own sections above.
 * Keys resolve against the `amenities` namespace in src/messages/*.json.
 */
export const villaAmenities: AmenityKey[] = [
  "wifi",
  "parking",
  "elevator",
  "airConditioning",
  "outdoorGrill",
  "crib",
  "tv",
  "washingMachine",
];

export function getVillaSectionsOrdered(): VillaSection[] {
  return [...villaSections].sort((a, b) => a.order - b.order);
}
