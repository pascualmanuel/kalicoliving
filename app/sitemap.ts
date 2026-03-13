import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/blog";

const LOCALES = ["es", "en"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = BASE_URL || "https://kalicoliving.com";

  const entries: MetadataRoute.Sitemap = [];

  // Home — weekly / 1.0
  for (const locale of LOCALES) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  }

  // Community, Landlords — monthly / 0.8
  for (const locale of LOCALES) {
    entries.push({
      url: `${base}/${locale}/community`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    entries.push({
      url: `${base}/${locale}/landlords`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Blog index — weekly / 0.9
  for (const locale of LOCALES) {
    entries.push({
      url: `${base}/${locale}/blog`,
      lastModified: new Date(),
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
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const post of postsEn) {
    entries.push({
      url: `${base}/en/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
