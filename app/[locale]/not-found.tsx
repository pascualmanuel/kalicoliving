"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-5 py-16">
      <div className="max-w-md w-full text-center">
        <p className="text-[#272727]/60 text-lg tracking-[-0.04em] mb-2">404</p>
        <h1 className="recoleta title text-[32px] md:text-[48px] text-[#272727] mb-4">
          {t("title")}
        </h1>
        <p className="text-[#272727] text-[18px] leading-[130%] mb-10">
          {t("description")}
        </p>
        <Link
          href="/"
          className="inline-block bg-white rounded-[12px] font-semibold text-lg px-6 py-3 text-[#272727] border border-[#FFF2E266] hover:bg-[#fafafa] transition-colors"
        >
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
