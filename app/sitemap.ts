import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/blog";

const LOCALES = ["es", "en"] as const;

// Without this the sitemap is frozen at build time and new posts need a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = BASE_URL || "https://kalicoliving.com";

  const entries: MetadataRoute.Sitemap = [];

  // Static pages have no real edit date, so they omit lastModified rather than
  // reporting "now" on every request, which search engines learn to ignore.

  // Home — weekly / 1.0
  for (const locale of LOCALES) {
    entries.push({
      url: `${base}/${locale}`,
      changeFrequency: "weekly",
      priority: 1.0,
    });
  }

  // Community, Landlords — monthly / 0.8
  for (const locale of LOCALES) {
    entries.push({
      url: `${base}/${locale}/community`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    entries.push({
      url: `${base}/${locale}/landlords`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Blog index — weekly / 0.9
  for (const locale of LOCALES) {
    entries.push({
      url: `${base}/${locale}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // Blog posts — monthly / 0.7 (fetch from CMS)
  const [postsEs, postsEn] = await Promise.all([
    getBlogPosts("es"),
    getBlogPosts("en"),
  ]);
  for (const post of postsEs) {
    entries.push({
      url: `${base}/es/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const post of postsEn) {
    entries.push({
      url: `${base}/en/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
