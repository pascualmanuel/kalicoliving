import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAdminBlogPosts, getTranslationGroupMap } from "@/lib/blog";
import type { AdminBlogPost } from "@/lib/blog";

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
          href="/"
          className="text-sm text-grey/70 hover:text-grey inline-flex items-center gap-1"
        >
          <svg
            className="inline-block"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              d="M6.707 3.293a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 1 0 1.414-1.414L5.414 9H13a1 1 0 1 0 0-2H5.414l1.293-1.293a1 1 0 0 0 0-1.414Z"
              fill="currentColor"
            />
          </svg>
          Volver al home
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="text-grey/70">Aún no hay entradas. Crea la primera.</p>
      ) : (
        <ul className=" flex flex-wrap gap-4">
          {rows.map((row) => {
            const rowKey = row.es?.id ?? row.en?.id ?? "";
            return (
              <li
                key={rowKey}
                className="py-3 px-4 rounded-[12px] border border-grey/10 bg-white hover:border-grey/20 transition-colors max-w-[500px]"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-medium text-grey truncate">
                      {row.title || "(Sin título)"}
                    </span>
                    <span className="text-sm text-grey/60 shrink-0">
                      {formatDate(row.date)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* ES */}
                    {row.es ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-grey/20 bg-grey/5 px-3 py-1.5 text-sm">
                        <span className="font-medium text-grey">ES</span>
                        {row.es.published ? (
                          <span className="text-green-600 text-xs">
                            Publicado
                          </span>
                        ) : (
                          <span className="text-amber-600 text-xs">
                            Borrador
                          </span>
                        )}
                        <Link
                          href={`/admin/blog/${row.es.id}/edit`}
                          className="text-brown hover:underline font-medium text-sm"
                        >
                          Editar
                        </Link>
                        <Link
                          href={`/es/blog/${row.es.slug}`}
                          className="text-brown hover:underline font-medium text-sm"
                        >
                          Ver
                        </Link>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-grey/30 bg-white px-3 py-1.5 text-sm text-grey/70">
                        <span className="font-medium">ES</span>
                        <Link
                          href={`/admin/blog/new?from=${row.en!.id}`}
                          className="text-brown hover:underline font-medium text-sm"
                        >
                          Traducir al español
                        </Link>
                      </span>
                    )}
                    {/* EN */}
                    {row.en ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-grey/20 bg-grey/5 px-3 py-1.5 text-sm">
                        <span className="font-medium text-grey">EN</span>
                        {row.en.published ? (
                          <span className="text-green-600 text-xs">
                            Publicado
                          </span>
                        ) : (
                          <span className="text-amber-600 text-xs">
                            Borrador
                          </span>
                        )}
                        <Link
                          href={`/admin/blog/${row.en.id}/edit`}
                          className="text-brown hover:underline font-medium text-sm"
                        >
                          Editar
                        </Link>
                        <Link
                          href={`/en/blog/${row.en.slug}`}
                          className="text-brown hover:underline font-medium text-sm"
                        >
                          Ver
                        </Link>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-grey/30 bg-white px-3 py-1.5 text-sm text-grey/70">
                        <span className="font-medium">EN</span>
                        <Link
                          href={`/admin/blog/new?from=${row.es!.id}`}
                          className="text-brown hover:underline font-medium text-sm"
                        >
                          Traducir al inglés
                        </Link>
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
