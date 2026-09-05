/**
 * Central site contact / identity info. Edit here; consumed by the footer,
 * contact form, and metadata.
 *
 * No phone number is published: guests receive it once a booking is made.
 * Enquiries come in through the contact form / email only.
 */
export const site = {
  name: "Villa Žnjan",
  email: "info@villaznjan.com",
  addressLines: ["Makarska 9A", "21000 Split", "Croatia"],
  social: {
    instagram: "https://instagram.com/",
  },
} as const;
