import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { getBlogPosts } from "@/lib/blog";
import BlogPostList from "@/components/BlogPostList";
import {
  BASE_URL,
  getOgImageUrl,
  getMetaDescription,
  getPageTitle,
} from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";

type Locale = "en" | "es";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const lang = locale as Locale;
  const title = getPageTitle("blog", lang);
  const description = getMetaDescription("blog", lang);
  const ogImage = getOgImageUrl("blog", lang);
  const canonical = `${BASE_URL}/${locale}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${BASE_URL}/es/blog`,
        en: `${BASE_URL}/en/blog`,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_US",
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

interface BlogPageProps {
  params: { locale: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = params;
  const t = await getTranslations("pages.blog");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const posts = await getBlogPosts(locale);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Kali Blog",
    url: BASE_URL ? `${BASE_URL}/${locale}/blog` : undefined,
    description: getMetaDescription("blog", locale as Locale),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: BASE_URL ? `${BASE_URL}/${locale}/blog/${post.slug}` : undefined,
      name: post.title,
    })),
  };

  return (
    <main className="px-4 py-10 md:py-16 md:px-20 mx-auto mt-[100px]">
      <JsonLd data={blogSchema} />
      <JsonLd data={itemListSchema} />
      {!user && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-8 md:mb-16">
          <h1 className="md:text-center text-left text-[45px] md:text-[80px] font-bold">
            {t("title")}
          </h1>
        </div>
      )}
      {user && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-16">
          <>
            <h1 className="md:text-center text-left text-[45px] md:text-[80px] font-bold">
              {t("title")}
            </h1>
            <Link
              href="/admin/blog/new"
              className="shrink-0 inline-flex items-center justify-center px-4 py-2.5 rounded-[12px] bg-brown text-white font-semibold hover:bg-brown/90 transition-colors text-sm md:text-base"
            >
              {t("createPost")}
            </Link>
          </>
        </div>
      )}
      <BlogPostList posts={posts} />
    </main>
  );
}
