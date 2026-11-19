import posthog from "posthog-js";

/**
 * PostHog analytics (EU cloud), initialised once in the browser before the
 * app hydrates. Next.js runs this file automatically.
 *
 * - Consent-based, cookieless by default ('on_reject'): every visitor starts
 *   opted out, which in this mode means cookieless capture - no cookies or
 *   browser storage, unique visitors counted from a privacy-preserving hash
 *   on PostHog's servers. That covers visitors who decline the cookie banner
 *   and those who never answer it. Only after "Accept" does the banner call
 *   posthog.opt_in_capturing(), and PostHog switches to normal cookies.
 *   Cookieless mode also has to be switched on in the PostHog project
 *   settings, or PostHog drops every cookieless event.
 * - Traffic goes through our own domain (/ingest, see next.config.ts) so ad
 *   blockers that block posthog.com don't silently drop it.
 * - No session recording and no person profiles: aggregate analytics only.
 *
 * Without NEXT_PUBLIC_POSTHOG_KEY nothing loads and `track()` is a no-op.
 */
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  posthog.init(key, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    // Pinned so an SDK upgrade can't change behaviour silently. Includes
    // capture_pageview: "history_change", which counts client-side
    // navigations as pageviews.
    defaults: "2026-08-30",
    cookieless_mode: "on_reject",
    opt_out_capturing_by_default: true,
    person_profiles: "identified_only",
    disable_session_recording: true,
  });
}
