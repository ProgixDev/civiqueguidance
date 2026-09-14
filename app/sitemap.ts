import type { MetadataRoute } from "next";
import { services } from "./services/[slug]/data";

const BASE_URL = "https://demarchesciviques.fr";

const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.8 },
  { path: "/demande", priority: 0.8 },
  { path: "/faq", priority: 0.7 },
  { path: "/a-propos", priority: 0.6 },
  { path: "/mentions-legales", priority: 0.2 },
  { path: "/conditions-generales-vente", priority: 0.2 },
  { path: "/politique-confidentialite", priority: 0.2 },
  { path: "/politique-cookies", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const serviceEntries = Object.keys(services).map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...serviceEntries];
}
