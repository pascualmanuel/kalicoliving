import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/blog";
import BlogPostList from "@/components/BlogPostList";

interface BlogPageProps {
  params: { locale: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const t = await getTranslations("pages.blog");
  const posts = await getBlogPosts(params.locale);

  return (
    <main className="px-4 py-10 md:py-16 md:px-20 mx-auto mt-[100px]">
      <h1 className="md:text-center text-left text-[45px] md:text-[80px] font-bold mb-8 md:mb-16">
        {t("title")}
      </h1>
      <BlogPostList posts={posts} />
    </main>
  );
}
