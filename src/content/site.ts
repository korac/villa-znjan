/**
 * Central site contact / identity info. Edit here; consumed by the footer,
 * contact form, location section, and metadata.
 *
 * No phone number is published: guests receive it once a booking is made.
 * Enquiries come in through the contact form / email only.
 */

const address = "Makarska 9A, 21000 Split, Croatia";

export const site = {
  name: "Villa Žnjan",
  email: "info@villaznjan.com",
  addressLines: ["Makarska 9A", "21000 Split", "Croatia"],
  /** Single-line form, used for map deep links */
  address,
  /** Coordinates of the Google Business listing. Used for map links and JSON-LD. */
  coordinates: { lat: 43.5066444, lng: 16.4865571 },
  /**
   * Google place ID for the "Villa Žnjan" Business listing. The single source
   * of truth for every map link: the listing's CID is encoded inside it, so
   * there is no second identifier to keep in sync. Links built from it land on
   * the listing itself rather than on the street address, which means the pin
   * sits on the house and the listing's photos and reviews come with it.
   *
   * See `src/lib/googleMaps.ts` for the URLs built from it.
   */
  placeId: "ChIJzUPXTc1fNRMRrKkZirclfRg",
  social: {
    instagram: "https://instagram.com/",
  },
} as const;
