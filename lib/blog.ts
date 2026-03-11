import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type BlogPostCategory = 'culture' | 'gastro' | 'entrepreneur' | 'plans';

export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  list_image_url: string | null;
  tags: string[] | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  author: string | null;
  reading_time: number | null;
  locale: string;
  translation_key: string | null;
}

export interface BlogPostListing {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  image: string | null;
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
}

const CATEGORY_TAGS: BlogPostCategory[] = ['culture', 'gastro', 'entrepreneur', 'plans'];

function rowToListing(row: BlogPostRow): BlogPostListing {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    image: row.list_image_url || row.cover_url,
    publishedAt: row.created_at,
    readTimeMinutes: row.reading_time ?? 5,
    tags: row.tags ?? [],
  };
}

/**
 * Fetch published blog posts for a locale, ordered by created_at desc.
 * Use tags for category filter on the client (culture, gastro, entrepreneur, plans).
 */
export async function getBlogPosts(locale: string): Promise<BlogPostListing[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, cover_url, list_image_url, tags, created_at, reading_time')
    .eq('published', true)
    .eq('locale', locale)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getBlogPosts error:', error);
    return [];
  }

  return (data ?? []).map((row: Record<string, unknown>) =>
    rowToListing({
      id: row.id as string,
      slug: row.slug as string,
      title: row.title as string,
      excerpt: row.excerpt as string | null,
      content: '',
      cover_url: row.cover_url as string | null,
      list_image_url: row.list_image_url as string | null,
      tags: row.tags as string[] | null,
      published: true,
      created_at: row.created_at as string,
      updated_at: '',
      author: null,
      reading_time: row.reading_time as number | null,
      locale: '',
      translation_key: null,
    })
  );
}

export type AdminBlogPost = {
  id: string;
  slug: string;
  title: string;
  locale: string;
  published: boolean;
  created_at: string;
  translation_key: string | null;
};

/**
 * Fetch all blog posts for admin (published and draft), any locale.
 * Use with an authenticated Supabase client so RLS allows reading all rows.
 */
export async function getAdminBlogPosts(
  supabaseClient: SupabaseClient
): Promise<AdminBlogPost[]> {
  const { data, error } = await supabaseClient
    .from("blog_posts")
    .select("id, slug, title, locale, published, created_at, translation_key")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAdminBlogPosts error:", error);
    return [];
  }
  return (data ?? []) as AdminBlogPost[];
}

/**
 * For each translation_key, returns the post ids by locale (es/en).
 * Use to know if a post has a translation in the other language.
 */
export async function getTranslationGroupMap(
  supabaseClient: SupabaseClient
): Promise<Record<string, { es?: string; en?: string }>> {
  const { data, error } = await supabaseClient
    .from("blog_posts")
    .select("id, locale, translation_key")
    .not("translation_key", "is", null);

  if (error) {
    console.error("getTranslationGroupMap error:", error);
    return {};
  }

  const map: Record<string, { es?: string; en?: string }> = {};
  for (const row of data ?? []) {
    const key = row.translation_key as string;
    if (!map[key]) map[key] = {};
    map[key][row.locale as "es" | "en"] = row.id;
  }
  return map;
}

/**
 * Fetch a single blog post by id (admin). Returns full row.
 */
export async function getBlogPostById(
  supabaseClient: SupabaseClient,
  postId: string
): Promise<BlogPostRow | null> {
  const { data, error } = await supabaseClient
    .from("blog_posts")
    .select("*")
    .eq("id", postId)
    .maybeSingle();

  if (error) {
    console.error("getBlogPostById error:", error);
    return null;
  }
  return data as BlogPostRow | null;
}

/**
 * Return the published sibling (other locale) for a post with translation_key.
 * Used on the public post page to show "Read in English" / "Leer en español".
 */
export async function getPublishedTranslationSibling(
  translationKey: string,
  currentLocale: string
): Promise<{ slug: string; locale: string } | null> {
  const otherLocale = currentLocale === "es" ? "en" : "es";
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, locale")
    .eq("translation_key", translationKey)
    .eq("locale", otherLocale)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;
  return { slug: data.slug as string, locale: data.locale as string };
}

/**
 * Fetch a single published blog post by slug and locale.
 */
export async function getBlogPostBySlug(
  slug: string,
  locale: string
): Promise<BlogPostRow | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('locale', locale)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    console.error('getBlogPostBySlug error:', error);
    return null;
  }

  return data as BlogPostRow | null;
}

export { CATEGORY_TAGS };
