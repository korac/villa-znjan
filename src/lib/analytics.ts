import posthog from "posthog-js";

/**
 * Custom analytics events. Pageviews are captured automatically; these are
 * the actions worth counting on top. Never put personal data (names, email
 * addresses, message text) in the properties.
 */
export type AnalyticsEvent =
  | "contact_submitted"
  | "apartment_viewed"
  | "gallery_opened"
  | "locale_switched"
  | "book_now_clicked";

/** Sends an event if PostHog is configured; does nothing otherwise. */
export function track(
  event: AnalyticsEvent,
  properties?: Record<string, string | number>,
) {
  if (!posthog.__loaded) return;
  posthog.capture(event, properties);
}
