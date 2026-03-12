import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { getAdminBlogPosts, getTranslationGroupMap } from "@/lib/blog";
import type { AdminBlogPost } from "@/lib/blog";
import AdminBlogCard from "./AdminBlogCard";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** One row = one "article" (maybe with ES and/or EN version). */
type ArticleRow = {
  title: string;
  date: string;
  es: AdminBlogPost | null;
  en: AdminBlogPost | null;
};

function buildArticleRows(
  posts: AdminBlogPost[],
  groupMap: Record<string, { es?: string; en?: string }>,
): ArticleRow[] {
  const byId = new Map(posts.map((p) => [p.id, p]));
  const usedIds = new Set<string>();
  const rows: ArticleRow[] = [];

  // Grouped: same translation_key = one article with ES + EN
  for (const [key, group] of Object.entries(groupMap)) {
    const esPost = group.es ? (byId.get(group.es) ?? null) : null;
    const enPost = group.en ? (byId.get(group.en) ?? null) : null;
    if (esPost) usedIds.add(esPost.id);
    if (enPost) usedIds.add(enPost.id);
    const title = esPost?.title ?? enPost?.title ?? "";
    const date =
      [esPost?.created_at, enPost?.created_at].filter(Boolean).sort().pop() ??
      "";
    rows.push({ title, date, es: esPost ?? null, en: enPost ?? null });
  }

  // Standalones: no translation_key
  for (const post of posts) {
    if (usedIds.has(post.id)) continue;
    const title = post.title;
    const date = post.created_at;
    rows.push({
      title,
      date,
      es: post.locale === "es" ? post : null,
      en: post.locale === "en" ? post : null,
    });
  }

  rows.sort((a, b) => (b.date > a.date ? 1 : -1));
  return rows;
}

function getRowImage(row: ArticleRow): string | null {
  const url =
    row.es?.list_image_url ||
    row.es?.cover_url ||
    row.en?.list_image_url ||
    row.en?.cover_url;
  return url ?? null;
}

function getRowExcerpt(row: ArticleRow): string {
  return row.es?.excerpt || row.en?.excerpt || "(Sin descripción)";
}

async function deleteBlogArticle(ids: string[]) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const admin = getAdminClient();
  for (const id of ids) {
    await admin.from("blog_posts").delete().eq("id", id);
  }
  redirect("/admin/blog");
}

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const [posts, groupMap] = await Promise.all([
    getAdminBlogPosts(supabase),
    getTranslationGroupMap(supabase),
  ]);

  const rows = buildArticleRows(posts, groupMap);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-grey">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 rounded-[12px] bg-brown text-white font-semibold hover:bg-brown/90 transition-colors"
        >
          Nuevo post
        </Link>
      </div>

      <div className="mb-6">
        <Link
          href="/admin"
          className="text-sm text-grey/70 hover:text-grey inline-flex items-center gap-1 transition-colors"
        >
          <svg
            className="inline-block h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al dashboard
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="text-grey/70">Aún no hay entradas. Crea la primera.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {rows.map((row) => {
            const rowKey = row.es?.id ?? row.en?.id ?? "";
            return (
              <AdminBlogCard
                key={rowKey}
                title={row.title || "(Sin título)"}
                titleEn={row.en?.title || row.title || "—"}
                date={formatDate(row.date)}
                imageUrl={getRowImage(row)}
                excerpt={getRowExcerpt(row)}
                isPublished={Boolean(row.es?.published || row.en?.published)}
                es={row.es ? { id: row.es.id, slug: row.es.slug } : null}
                en={row.en ? { id: row.en.id, slug: row.en.slug } : null}
                onDelete={deleteBlogArticle}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
