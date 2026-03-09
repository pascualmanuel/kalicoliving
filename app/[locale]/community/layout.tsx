import type { Metadata } from "next";
import { BASE_URL, getOgImageUrl, getMetaDescription, getPageTitle } from "@/lib/metadata";

type Locale = "en" | "es";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const lang = locale as Locale;
  const title = getPageTitle("community", lang);
  const description = getMetaDescription("community", lang);
  const ogImage = getOgImageUrl("community", lang);
  const canonical = `${BASE_URL}/${locale}/community`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${BASE_URL}/es/community`,
        en: `${BASE_URL}/en/community`,
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

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
