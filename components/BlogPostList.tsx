"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useState } from "react";
import type { BlogPostListing, BlogPostCategory } from "@/lib/blog";

type CategoryKey = "all" | BlogPostCategory;

const CATEGORY_KEYS: CategoryKey[] = [
  "all",
  "culture",
  "gastro",
  "entrepreneur",
  "plans",
];

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

function postMatchesCategory(
  post: BlogPostListing,
  category: CategoryKey,
): boolean {
  if (category === "all") return true;
  const tag = category.toLowerCase();
  return post.tags.some((t) => t.toLowerCase() === tag);
}

interface BlogPostListProps {
  posts: BlogPostListing[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  const t = useTranslations("pages.blog");
  const locale = useLocale();
  const [category, setCategory] = useState<CategoryKey>("all");

  const filteredPosts =
    category === "all"
      ? posts
      : posts.filter((p) => postMatchesCategory(p, category));

  return (
    <>
      <div className="flex flex-wrap md:justify-center justify-start gap-2 mb-10">
        {CATEGORY_KEYS.map((key) => {
          const isSelected = category === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base font-medium border transition-colors ${
                isSelected
                  ? "bg-red text-white font-semibold border-red hover:bg-red-hover"
                  : "text-black border-[#d3d3d3] hover:border-gray-400"
              }`}
            >
              {t(`categories.${key}`)}
            </button>
          );
        })}
      </div>

      <div className="flex flex-row flex-wrap gap-6 md:gap-2 items-start justify-between">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33%-1rem)]"
          >
            <Link
              href={`/${locale}/blog/${post.slug}`}
              className="flex flex-col gap-2 group"
            >
              {post.image ? (
                <div className="relative w-full aspect-[4/3] max-h-[315px] overflow-hidden rounded-[20px] bg-gray-100">
                  <Image
                    src={post.image}
                    alt=""
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
                {formatDate(post.publishedAt, locale)}
                <span className="mx-2">•</span> {post.readTimeMinutes} min read
              </p>
              <h2 className="text-[24px] font-bold leading-tight">
                {post.title}
              </h2>
              <p className="text-[16px] text-grey dark:text-gray-400 leading-snug">
                {truncate(post.excerpt, 80)}
              </p>
              <span className="text-[18px] text-grey font-semibold ">
                {t("readArticle")}&nbsp;&nbsp;→
              </span>
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No posts in this category yet.
        </p>
      )}
    </>
  );
}
