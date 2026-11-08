import type { Locale } from "@/i18n/routing";

/**
 * Homepage FAQ: general questions about staying at the villa. Copy lives
 * here, next to its siblings in all three languages, the same way villa.ts
 * keeps section copy. Rendered by src/components/home/FaqSection.tsx.
 *
 * Owner-confirmed answers (2026-11-08): every guest can use all of the
 * house's facilities free of charge; check-in from 14:00, check-out by
 * 10:00; no pets.
 */

export interface FaqCopy {
  question: string;
  answer: string;
}

export interface FaqItem {
  key: string;
  content: Record<Locale, FaqCopy>;
}

export const faqItems: FaqItem[] = [
  {
    key: "checkInOut",
    content: {
      en: {
        question: "What are the check-in and check-out times?",
        answer: "Check-in is from 2:00 PM and check-out is by 10:00 AM.",
      },
      hr: {
        question: "Kada je check-in, a kada check-out?",
        answer: "Check-in je od 14:00 h, a check-out do 10:00 h.",
      },
      de: {
        question: "Wann sind Check-in und Check-out?",
        answer:
          "Der Check-in ist ab 14:00 Uhr möglich, der Check-out bis 10:00 Uhr.",
      },
    },
  },
  {
    key: "parking",
    content: {
      en: {
        question: "Does Villa Žnjan offer parking?",
        answer: "Yes, free parking is available for all guests.",
      },
      hr: {
        question: "Nudi li Villa Žnjan parking?",
        answer: "Da, parking je besplatan za sve goste.",
      },
      de: {
        question: "Bietet die Villa Žnjan Parkplätze an?",
        answer: "Ja, das Parken ist für alle Gäste kostenlos.",
      },
    },
  },
  {
    key: "grill",
    content: {
      en: {
        question: "Can we use the outdoor grill/barbecue?",
        answer: "Yes, the grill is free for all guests.",
      },
      hr: {
        question: "Možemo li koristiti vanjski roštilj?",
        answer: "Da, roštilj je besplatan za sve goste.",
      },
      de: {
        question: "Dürfen wir den Außengrill benutzen?",
        answer: "Ja, der Grill steht allen Gästen kostenlos zur Verfügung.",
      },
    },
  },
  {
    key: "pets",
    content: {
      en: {
        question: "Does the villa allow pets?",
        answer: "Sorry, pets are not allowed at the villa.",
      },
      hr: {
        question: "Dopušta li vila kućne ljubimce?",
        answer: "Nažalost, kućni ljubimci nisu dopušteni.",
      },
      de: {
        question: "Sind in der Villa Haustiere erlaubt?",
        answer: "Leider sind Haustiere nicht erlaubt.",
      },
    },
  },
];
