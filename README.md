# Villa Žnjan

Website for Villa Žnjan, five holiday apartments in Žnjan, Split, run by VISTA DOMUS d.o.o. Live at [villaznjan.com](https://villaznjan.com).

Phase 1 is a marketing site: apartments, villa facilities, location, gallery, FAQ and a contact form that emails enquiries. Online booking and an admin dashboard come in Phase 2.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19, TypeScript), deployed on [Vercel](https://vercel.com)
- [Tailwind CSS 4](https://tailwindcss.com), with the design tokens in `src/app/globals.css` (light and dark palettes)
- [next-intl](https://next-intl.dev) for English, Croatian and German
- [Resend](https://resend.com) for contact-form email, [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) for spam protection
- [PostHog](https://posthog.com) (EU) for analytics

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you need; everything is optional
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Environment variables

All are optional. Without them the site still runs: enquiries are logged to the server console, there is no analytics, and no password gate. See `.env.example`.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends contact-form emails |
| `CONTACT_FROM_EMAIL` | Sender of the enquiry email to the host, e.g. `Villa Žnjan <no-reply@villaznjan.com>` |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries (default `info@villaznjan.com`) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Bot check on the contact form |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key. Cookieless mode must be enabled in the PostHog project settings |
| `SITE_PASSWORD`, `SITE_AUTH_SECRET` | Pre-launch password gate. Unset means the site is public |

Tips:

- Keep `NEXT_PUBLIC_POSTHOG_KEY` out of `.env.local` day to day, or local visits are counted as real ones.
- On Vercel Preview, use Cloudflare's Turnstile test keys (`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`) and leave out `RESEND_API_KEY`, so previews don't send real email.

## Branches and environments

| Branch | Address | Vercel environment |
|---|---|---|
| production branch | [villaznjan.com](https://villaznjan.com) | Production |
| `develop` | [beta.villaznjan.com](https://beta.villaznjan.com) | Preview |
| feature branches | `*.vercel.app` previews | Preview |

Work happens on feature branches, merged into `develop` (beta), then released to the production branch.

Only the Production environment is indexed by search engines: everywhere else, `robots.txt` blocks crawlers and every page carries a `noindex` tag (`IS_PRODUCTION` in `src/lib/seo.ts`). `www.villaznjan.com` redirects to `villaznjan.com` (Vercel domain settings).

## Editing content

Most copy and photos live in plain files, so changes don't need a CMS:

| What | Where |
|---|---|
| Short UI text, headings, buttons, emails (EN/HR/DE) | `src/messages/{en,hr,de}.json` |
| Apartments: details, copy, photo order | `src/content/apartments.ts` |
| `/villa` sections: copy, tags, photos | `src/content/villa.ts` |
| FAQ | `src/content/faq.ts` |
| Privacy policy (update `PRIVACY_UPDATED` with it) | `src/content/privacy.ts` |
| Travel times on the homepage | `src/content/location.ts` |
| Contact details, address, map place ID, check-in/out times | `src/content/site.ts` |
| Homepage gallery tiles | `src/components/home/GallerySection.tsx` |

Copy rule: use a plain hyphen (`-`), never em or en dashes.

### Adding photos

1. Reduce originals before adding them (about 2000px on the long side, metadata stripped). The owner's `reduce-images.js` script (sharp, mozjpeg quality 80) is the reference.
2. Put them under `public/apartments/<apartment>/` or `public/gallery/<topic>/` (pool, breakfast, terrace, gym, sauna, spa, hall, outdoor).
3. List them in the matching content file. The first image is the main photo (and the card image on the homepage).
4. Each photo should exist once: reuse a path rather than adding a copy.

## Analytics and privacy

- PostHog runs cookieless by default (`cookieless_mode: "on_reject"`, opted out by default). Accepting the cookie banner switches it to cookies. It's proxied through `/ingest` on our own domain. Events: `contact_submitted`, `apartment_viewed`, `gallery_opened`, `locale_switched`, `book_now_clicked`.
- The Google map only loads after cookie consent. Until then a placeholder shows. Consent logic is in `src/lib/consent.ts`; visitors can change their choice via "Cookie settings" in the footer.
- The contact form is rate-limited in memory (per IP and per address) and protected by Turnstile.

## SEO

`src/lib/seo.ts` builds each page's metadata: canonical URL on `villaznjan.com`, EN/HR/DE `hreflang` alternates and social share previews. `src/app/sitemap.ts` and `src/app/robots.ts` generate `/sitemap.xml` and `/robots.txt`. Structured data (villa, apartments, FAQ) is in `src/lib/structuredData.ts`.

## Launch checklist

- [ ] Production env vars set in Vercel (see above)
- [ ] `villaznjan.com` primary, `www` redirecting to it
- [ ] Remove `SITE_PASSWORD` / `SITE_AUTH_SECRET` from Production
- [ ] Set `PRIVACY_UPDATED` in `src/content/privacy.ts` to the launch date
- [ ] Add the site to Google Search Console and submit `https://villaznjan.com/sitemap.xml`
- [ ] Run Lighthouse on beta before releasing
