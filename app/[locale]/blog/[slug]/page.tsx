import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  getBlogPostBySlug,
  getBlogPosts,
  getPublishedTranslationSibling,
} from "@/lib/blog";
import {
  BASE_URL,
  getBlogPostMetaDescription,
  getBlogPostIntro,
  getOgImageUrl,
} from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import BlogPostTags from "@/components/BlogPostTags";
import { SetBlogAlternateLink } from "@/context/BlogAlternateLocaleContext";

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const post = await getBlogPostBySlug(slug, locale);
  if (!post) return { title: "Not Found" };

  const intro = getBlogPostIntro(post.excerpt, post.content);
  const description = getBlogPostMetaDescription(post.title, intro);
  const title = post.title;
  const canonical = `${BASE_URL}/${locale}/blog/${slug}`;
  const ogImage = getOgImageUrl("blog", locale as "en" | "es");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${BASE_URL}/es/blog/${slug}`,
        en: `${BASE_URL}/en/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: canonical,
      siteName: "Kali Coliving",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = params;
  const t = await getTranslations("nav");
  const tBlog = await getTranslations("pages.blog");

  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug, locale),
    getBlogPosts(locale),
  ]);
  if (!post) notFound();

  const translationSibling = post.translation_key
    ? await getPublishedTranslationSibling(post.translation_key, locale)
    : null;

  const similarPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const imageUrl = post.list_image_url || post.cover_url;
  const translationLabel =
    locale === "es" ? tBlog("readInEnglish") : tBlog("readInSpanish");

  const metaDescription = getBlogPostMetaDescription(
    post.title,
    getBlogPostIntro(post.excerpt, post.content),
  );
  const canonicalUrl = `${BASE_URL}/${locale}/blog/${slug}`;
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(imageUrl ? { image: imageUrl } : {}),
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      "@type": "Organization",
      name: "Kali Coliving",
    },
    publisher: {
      "@type": "Organization",
      name: "Kali Coliving",
    },
    url: canonicalUrl || undefined,
    description: metaDescription,
  };

  return (
    <main className="px-4 py-10 md:py-16 md:px-20 mx-auto mt-[100px] ">
      <JsonLd data={blogPostingSchema} />
      <SetBlogAlternateLink sibling={translationSibling} />
      {/* Breadcrumb */}
      <nav className="mb-4 md:mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-grey/70">
          <li>
            <Link href="/blog" className="hover:underline">
              {t("blog")}
            </Link>
          </li>
          <li aria-hidden="true">
            <svg
              width="5"
              height="9"
              viewBox="0 0 5 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.486 4.088L0 7.504L0.658 8.162L4.746 4.088L0.658 0L0 0.658L3.486 4.088Z"
                fill="#272727"
              />
            </svg>
          </li>
          <li
            className="text-grey font-medium truncate max-w-[200px] md:max-w-none"
            aria-current="page"
          >
            {post.title}
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left column: title + tags (sticky on desktop, hidden as sidebar on mobile) */}
        <aside className="lg:w-[440px] shrink-0">
          <div className="lg:sticky lg:top-24">
            {/* Mobile: title + tags above image */}
            <div className="lg:hidden mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-grey mb-3">
                {post.title}
              </h1>
              <BlogPostTags tags={post.tags} />
            </div>

            {/* Desktop: sticky brown box with title + tags */}
            <div className="hidden lg:block rounded-[20px] bg-brown p-6 md:p-8">
              <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {post.title}
              </p>
              <div className="mt-4">
                <BlogPostTags tags={post.tags} variant="light" />
              </div>
            </div>
          </div>
        </aside>

        {/* Right column: image + content */}
        <article className="flex-1 min-w-0">
          {imageUrl && (
            <div className="relative w-full aspect-[16/10] md:aspect-video rounded-[20px] overflow-hidden bg-gray-200 mb-8">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, calc(100vw - 440px - 6rem)"
                priority
              />
            </div>
          )}

          {/* Desktop: title is in sidebar, so we don't repeat. Mobile: already shown above */}
          <div
            className="prose prose-lg max-w-none text-grey text-[18px] leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_h2]:font-bold [&_h2]:text-[24px] [&_h3]:font-semibold [&_h3]:text-[18px] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-1 [&_a]:text-brown [&_a]:underline [&_a]:font-medium [&_a]:cursor-pointer hover:[&_a]:text-brown/80 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-[12px] [&_img]:my-4"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
        </article>
      </div>

      {/* Similar articles */}
      {similarPosts.length > 0 && (
        <section className="mt-16 md:mt-20 w-full">
          <h2 className="text-left text-[35px] md:text-[45px] font-bold text-grey mb-8">
            {tBlog("similarArticles")}
          </h2>
          <div className="flex flex-row flex-wrap gap-6 md:gap-2 items-start justify-between">
            {similarPosts.map((similar) => (
              <Link
                key={similar.id}
                href={`/blog/${similar.slug}`}
                className="flex flex-col w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33%-1rem)] gap-2 group"
              >
                {similar.image ? (
                  <div className="relative w-full aspect-[4/3] max-h-[315px] overflow-hidden rounded-[20px] bg-gray-100">
                    <Image
                      src={similar.image}
                      alt={similar.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] max-h-[315px] rounded-[20px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    No image
                  </div>
                )}
                <p className="text-[14px] text-grey dark:text-gray-400">
                  {formatDate(similar.publishedAt, locale)}
                  <span className="mx-2">•</span> {similar.readTimeMinutes} min
                  read
                </p>
                <h3 className="text-[24px] font-bold leading-tight text-grey">
                  {similar.title}
                </h3>
                <p className="text-[16px] text-grey dark:text-gray-400 leading-snug">
                  {truncate(similar.excerpt, 80)}
                </p>
                <span className="text-[18px] text-grey font-semibold group-hover:underline">
                  {tBlog("readArticle")} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function formatDate(dateStr: string, locale: string) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function truncate(str: string | null, maxLength: number) {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3).trim() + "...";
}

/** Simple formatting: wrap paragraphs in <p> if content is plain text, or pass through HTML. */
function formatContent(content: string): string {
  if (!content) return "";
  if (content.trim().startsWith("<")) return content;
  return content
    .split(/\n\n+/)
    .map((p) => `<p>${escapeHtml(p.replace(/\n/g, " "))}</p>`)
    .join("");
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (ch) => map[ch] ?? ch);
}
