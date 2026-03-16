"use client";

import Link from "next/link";

export default function RootNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 py-16 bg-[#FFF2E2]">
      <div className="max-w-md w-full text-center">
        <p className="text-[#272727]/60 text-lg tracking-tight mb-2">404</p>
        <h1 className="recoleta title text-[32px] md:text-[48px] text-[#272727] mb-4">
          Page not found
        </h1>
        <p className="text-[#272727] text-[18px] leading-[130%] mb-10">
          The page you&apos;re looking for doesn&apos;t exist.
          <br />
          La página que buscas no existe.
        </p>
        <Link
          href="/en"
          className="inline-block bg-red text-white rounded-[12px] font-semibold text-lg px-6 py-3 hover:bg-red-hover transition-colors"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
