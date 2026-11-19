import type { Locale } from "@/i18n/routing";

/**
 * Travel times from the villa, shown in the homepage location section.
 *
 * Times rather than distances: "12 minutes on foot" answers the question a
 * guest is actually asking, where "600 m" makes them do the arithmetic.
 *
 * Indexable text alongside the map, not instead of it - a map cannot answer
 * "how far is the beach" at a glance.
 *
 * Confirmed by the owner (2026-09-05).
 */

export type TravelMode = "walk" | "drive";

export interface DestinationCopy {
  label: string;
}

export interface Destination {
  key: string;
  minutes: number;
  mode: TravelMode;
  content: Record<Locale, DestinationCopy>;
}

export const destinations: Destination[] = [
  {
    key: "beach",
    minutes: 10,
    mode: "walk",
    content: {
      en: { label: "Žnjan beach" },
      hr: { label: "Plaža Žnjan" },
      de: { label: "Strand Žnjan" },
    },
  },
  {
    key: "oldTown",
    minutes: 15,
    mode: "drive",
    content: {
      en: { label: "Split old town" },
      hr: { label: "Stari grad Split" },
      de: { label: "Altstadt von Split" },
    },
  },
  {
    key: "ferryPort",
    minutes: 15,
    mode: "drive",
    content: {
      en: { label: "Ferry port" },
      hr: { label: "Trajektna luka" },
      de: { label: "Fährhafen" },
    },
  },
  {
    key: "airport",
    minutes: 30,
    mode: "drive",
    content: {
      en: { label: "Split airport" },
      hr: { label: "Zračna luka Split" },
      de: { label: "Flughafen Split" },
    },
  },
];
