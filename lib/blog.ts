import { supabase } from './supabase';

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
