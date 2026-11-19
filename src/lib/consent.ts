"use client";

import { useSyncExternalStore } from "react";
import posthog from "posthog-js";

/**
 * Cookie consent for the two things that set cookies: the embedded Google
 * map and PostHog with cookies. One Accept / Decline covers both.
 *
 * The choice itself is kept in localStorage. Remembering a consent decision
 * is strictly necessary, so it needs no consent of its own.
 *
 * - "pending": no choice yet. Treated exactly like "denied": no map, and
 *   PostHog stays cookieless (it starts opted out, see instrumentation-client).
 * - "granted": map loads; PostHog switches to cookies.
 * - "denied": no map; PostHog stays cookieless.
 */
export type Consent = "pending" | "granted" | "denied";

const KEY = "vz-cookie-consent";
const CHANGE = "vz-consent-change";
const OPEN = "vz-consent-open";

function read(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "pending";
  } catch {
    return "pending";
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE, callback);
  window.addEventListener("storage", callback); // other tabs
  return () => {
    window.removeEventListener(CHANGE, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Current consent. "pending" on the server and before hydration. */
export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, read, () => "pending");
}

/** Keeps PostHog's own opt-in state in line with the stored choice. */
export function syncAnalytics(consent: Consent) {
  if (!posthog.__loaded) return;
  if (consent === "granted") {
    if (!posthog.has_opted_in_capturing()) posthog.opt_in_capturing();
  } else if (posthog.has_opted_in_capturing()) {
    posthog.opt_out_capturing(); // back to cookieless
  }
}

export function setConsent(consent: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, consent);
  } catch {
    // Storage blocked: the choice lasts for this page view only.
  }
  syncAnalytics(consent);
  window.dispatchEvent(new Event(CHANGE));
}

/** Reopens the banner, e.g. from the footer's "Cookie settings" link. */
export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN));
}

export const CONSENT_OPEN_EVENT = OPEN;
