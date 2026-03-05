"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useState } from "react";

type CategoryKey = "all" | "culture" | "gastro" | "entrepreneur" | "plans";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  readTimeMinutes: number;
  category: CategoryKey;
}

// Mock data – replace with Sanity fetch when ready
const MOCK_POSTS: BlogPost[] = [
  {
    slug: "welcome-to-kali",
    title: "Welcome to Kali Coliving",
    description:
      "Discover how we build community and make Madrid feel like home for digital nomads and remote workers.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600",
    publishedAt: "2025-12-19",
    readTimeMinutes: 5,
    category: "culture",
  },
  {
    slug: "madrid-food-guide",
    title: "Best spots for food in Madrid",
    description:
      "A curated list of our favorite cafés, markets and restaurants near Kali. From tapas to specialty coffee.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
    publishedAt: "2025-12-15",
    readTimeMinutes: 7,
    category: "gastro",
  },
  {
    slug: "remote-work-tips",
    title: "Remote work and coliving: why it works",
    description:
      "How coliving supports focus, accountability and balance when you work from anywhere.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
    publishedAt: "2025-12-10",
    readTimeMinutes: 4,
    category: "entrepreneur",
  },
  {
    slug: "flexible-plans",
    title: "Flexible plans for every stay",
    description:
      "Whether you need a month or a year, we have a plan that fits. Compare options and find your fit.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
    publishedAt: "2025-12-05",
    readTimeMinutes: 3,
    category: "plans",
  },
];

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

function truncate(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3).trim() + "...";
}

export default function BlogPage() {
  const t = useTranslations("pages.blog");
  const locale = useLocale();
  const [category, setCategory] = useState<CategoryKey>("all");

  const filteredPosts =
    category === "all"
      ? MOCK_POSTS
      : MOCK_POSTS.filter((post) => post.category === category);

  return (
    <main className="px-4 py-10 md:py-16 md:px-20 mx-auto mt-[100px] ">
      <h1 className="text-center text-3xl md:text-[80px] font-bold  mb-8 md:mb-16">
        {t("title")}
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORY_KEYS.map((key) => {
          const isSelected = category === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`px-5 py-2.5 rounded-full text-base font-medium border transition-colors ${
                isSelected
                  ? "bg-red text-white font-semibold border-red"
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
            key={post.slug}
            className="flex flex-col w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33%-1rem)]  "
          >
            <Link
              href={`/${locale}/blog/${post.slug}`}
              className="flex flex-col gap-2 group"
            >
              <div className="relative w-full aspect-[4/3] max-h-[315px] overflow-hidden rounded-[20px] bg-gray-100">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="text-[14px] text-grey dark:text-gray-400">
                {formatDate(post.publishedAt, locale)}
                <span className="mx-2">•</span> {post.readTimeMinutes} min read
              </p>
              <h2 className="text-[24px] font-bold leading-tight">
                {post.title}
              </h2>
              <p className="text-[16px] text-grey dark:text-gray-400 leading-snug">
                {truncate(post.description, 80)}
              </p>
              <span className="text-[18px] text-grey font-semibold group-hover:underline">
                {t("readArticle")} →
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
    </main>
  );
}
