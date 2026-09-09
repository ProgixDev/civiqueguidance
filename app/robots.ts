import type { MetadataRoute } from "next";

const BASE_URL = "https://demarchesciviques.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/compte", "/admin", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
