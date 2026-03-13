/** Set NEXT_PUBLIC_BASE_URL in Vercel (e.g. https://www.kalicolivings.com) for OG and canonical URLs. */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export type PageKey =
  | "home"
  | "community"
  | "blog"
  | "landlords"
  | "cookies"
  | "privacy";

/** OG image filenames in public/assets/og (es: *-es.png, en: *-og.png). Community uses comuniad-og.png (existing filename). Legal pages use home as default. */
const OG_IMAGE_MAP: Record<PageKey, { en: string; es: string }> = {
  home: { en: "home-og.png", es: "home-es.png" },
  community: { en: "comuniad-og.png", es: "comunidad-es.png" },
  blog: { en: "blog-og.png", es: "blog-es.png" },
  landlords: { en: "landlords-og.png", es: "landlords-es.png" },
  cookies: { en: "home-og.png", es: "home-es.png" },
  privacy: { en: "home-og.png", es: "home-es.png" },
};

export function getOgImageUrl(page: PageKey, locale: "en" | "es"): string {
  const filename = OG_IMAGE_MAP[page][locale];
  return `${BASE_URL}/assets/og/${filename}`;
}

/** SEO meta descriptions for Kali Coliving, per page and locale */
const META_DESCRIPTIONS: Record<PageKey, { en: string; es: string }> = {
  home: {
    en: "Discover Kali, the coliving that changes how you live. Real community, premium spaces and connections that drive your career forward. Home is waiting.",
    es: "Descubre Kali, el coliving que transforma tu forma de vivir. Comunidad real, espacios premium y conexiones que impulsan tu carrera. Tu próximo hogar te espera.",
  },
  community: {
    en: "Meet the Kali community. Young professionals, real networking and an environment designed to grow together. People who leave a mark.",
    es: "Conoce la comunidad Kali. Jóvenes profesionales, networking real y un entorno diseñado para crecer juntos. Personas que dejan huella.",
  },
  blog: {
    en: "The Kali blog. Culture, food, career growth and plans to make the most of your city. Get inspired and live better every day.",
    es: "El blog de Kali. Cultura, gastronomía, crecimiento profesional y planes para sacarle el máximo a tu ciudad. Inspírate y vive mejor cada día.",
  },
  landlords: {
    en: "Rent your property to Kali and get paid every month, guaranteed. Long-term contracts, full management and zero hassle from day one.",
    es: "Alquila tu propiedad a Kali y cobra cada mes sin preocupaciones. Contratos a largo plazo, pago garantizado y gestión integral de principio a fin.",
  },
  cookies: {
    en: "Learn how Kali Coliving uses cookies to improve your experience. Manage your preferences and find out what data we collect.",
    es: "Descubre cómo Kali Coliving utiliza cookies para mejorar tu experiencia. Gestiona tus preferencias y conoce qué datos recogemos.",
  },
  privacy: {
    en: "Read Kali Coliving's Privacy Policy. Learn how we collect, use and protect your personal data in compliance with GDPR.",
    es: "Lee la Política de Privacidad de Kali Coliving. Descubre cómo recogemos, usamos y protegemos tus datos personales según el RGPD.",
  },
};

export function getMetaDescription(page: PageKey, locale: "en" | "es"): string {
  return META_DESCRIPTIONS[page][locale];
}

const BLOG_POST_INTRO_MAX_LENGTH = 155;
const BLOG_META_SUFFIX = " | Kali Blog";

/**
 * Truncate text at the nearest word boundary before maxLength; add "…" if truncated.
 */
function truncateAtWord(text: string, maxLength: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  const end = lastSpace > 0 ? lastSpace : maxLength;
  return slice.slice(0, end).trim() + "…";
}

/**
 * Strip HTML tags and normalize whitespace to get plain text.
 */
function stripHtmlToPlainText(html: string): string {
  if (!html || !html.trim()) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Build SEO meta description for a blog post.
 * Format: [Post title] — [First 155 chars of intro at word boundary] | Kali Blog
 */
export function getBlogPostMetaDescription(
  title: string,
  introPlainText: string,
): string {
  const intro = introPlainText.trim()
    ? truncateAtWord(introPlainText.trim(), BLOG_POST_INTRO_MAX_LENGTH)
    : "";
  const middle = intro ? ` — ${intro}` : "";
  return `${title}${middle}${BLOG_META_SUFFIX}`;
}

/**
 * Get intro text for meta: use excerpt if present, otherwise first paragraph from content (plain text).
 */
export function getBlogPostIntro(
  excerpt: string | null,
  content: string,
): string {
  if (excerpt && excerpt.trim()) return excerpt.trim();
  return stripHtmlToPlainText(content);
}

/** Page titles for SEO (optional override; nav uses translations) */
const PAGE_TITLES: Record<PageKey, { en: string; es: string }> = {
  home: {
    en: "Kali Coliving – Live together, grow forever",
    es: "Kali Coliving – Live together, grow forever",
  },
  community: {
    en: "Community – Kali Coliving",
    es: "Comunidad – Kali Coliving",
  },
  blog: { en: "Blog – Kali Coliving", es: "Blog – Kali Coliving" },
  landlords: {
    en: "Landlords – Kali Coliving",
    es: "Propietarios – Kali Coliving",
  },
  cookies: {
    en: "Cookie Policy – Kali Coliving",
    es: "Política de Cookies – Kali Coliving",
  },
  privacy: {
    en: "Privacy Policy – Kali Coliving",
    es: "Política de Privacidad – Kali Coliving",
  },
};

export function getPageTitle(page: PageKey, locale: "en" | "es"): string {
  return PAGE_TITLES[page][locale];
}
