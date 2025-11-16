import type { MetadataRoute } from "next";

const BASE_URL = "https://toon.fast";

const locales = ["zh", "en"] as const;

const presets = [
  "",
  "toon-to-json",
  "toon-to-csv",
  "json-to-toon",
  "json-to-csv",
  "csv-to-toon",
  "csv-to-json",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const preset of presets) {
      const path = preset ? `/${locale}/${preset}` : `/${locale}`;
      routes.push({
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: preset ? 0.7 : 1.0,
      });
    }
  }

  return routes;
}
