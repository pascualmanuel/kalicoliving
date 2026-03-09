import type { Metadata } from "next";
import {
  BASE_URL,
  getOgImageUrl,
  getMetaDescription,
  getPageTitle,
} from "@/lib/metadata";
import HomePageContent from "./HomePageContent";

type Locale = "en" | "es";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const lang = locale as Locale;
  const title = getPageTitle("home", lang);
  const description = getMetaDescription("home", lang);
  const ogImage = getOgImageUrl("home", lang);
  const canonical = `${BASE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
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

export default function HomePage() {
  return <HomePageContent />;
}
