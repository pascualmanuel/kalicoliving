import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/blog";
import BlogPostList from "@/components/BlogPostList";
import { BASE_URL, getOgImageUrl, getMetaDescription, getPageTitle } from "@/lib/metadata";

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
  const posts = await getBlogPosts(locale);

  return (
    <main className="px-4 py-10 md:py-16 md:px-20 mx-auto mt-[100px]">
      <h1 className="md:text-center text-left text-[45px] md:text-[80px] font-bold mb-8 md:mb-16">
        {t("title")}
      </h1>
      <BlogPostList posts={posts} />
    </main>
  );
}
