import type { MetadataRoute } from "next";
import { IS_PRODUCTION, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Beta, previews and local builds: keep every crawler out.
  if (!IS_PRODUCTION) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Analytics proxy and the pre-launch password page aren't content.
      disallow: ["/ingest/", "/unlock", "/hr/unlock", "/de/unlock"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
