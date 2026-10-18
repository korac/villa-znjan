import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";

/**
 * Google Maps URLs for the villa, built from `site.ts`.
 *
 * Two different endpoints, deliberately:
 *
 * - `placeUrl()` uses the documented Maps URLs API, which is stable, keyless
 *   and free. It is what the "Find us" button opens.
 * - `embedUrl()` uses the keyless `output=embed` endpoint - the one the Maps
 *   UI hands out under "Share > Embed a map". The official Maps Embed API
 *   would need an API key, and a key needs a billing account on the Cloud
 *   project even though Embed API usage itself is free. This endpoint is NOT
 *   documented by Google and carries no stability guarantee, so if the map
 *   ever goes blank, suspect this URL first.
 *
 * The keyless endpoint does not understand `place_id:` queries - it silently
 * drops them and renders an unpinned map (or, with no viewport given, a world
 * map). Verified, not assumed. So the embed queries by name + address, which
 * resolves to the listing and drops a labelled pin with its info card. That is
 * why `site.placeId` appears in `placeUrl()` only.
 *
 * Note that the embed loads Google scripts and sets Google's own cookies as
 * soon as the iframe mounts. The iframe is lazy-loaded, so that happens when
 * the section scrolls into view rather than on page load, but it still needs
 * covering in the privacy policy and a cookie notice.
 */

const ZOOM = 15;

function center(): string {
  const { lat, lng } = site.coordinates;
  return `${lat},${lng}`;
}

/** Canonical link to the Google Business listing. */
export function placeUrl(): string {
  const params = new URLSearchParams({
    api: "1",
    query: center(),
    query_place_id: site.placeId,
  });
  return `https://www.google.com/maps/search/?${params}`;
}

/**
 * Map for the iframe. `hl` localises the pin's info card and its buttons;
 * without `z` the embed picks its own zoom.
 */
export function embedUrl(locale: Locale): string {
  const params = new URLSearchParams({
    q: `${site.name}, ${site.address}`,
    z: String(ZOOM),
    hl: locale,
    output: "embed",
  });
  return `https://www.google.com/maps?${params}`;
}
