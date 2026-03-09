export const BASE_URL = "https://www.kalicolivings.com";

export type PageKey = "home" | "community" | "blog" | "landlords";

/** OG image filenames in public/assets/og (es: *-es.png, en: *-og.png). Community uses comuniad-og.png (existing filename). */
const OG_IMAGE_MAP: Record<PageKey, { en: string; es: string }> = {
  home: { en: "home-og.png", es: "home-es.png" },
  community: { en: "comuniad-og.png", es: "comunidad-es.png" },
  blog: { en: "blog-og.png", es: "blog-es.png" },
  landlords: { en: "landlords-og.png", es: "landlords-es.png" },
};

export function getOgImageUrl(page: PageKey, locale: "en" | "es"): string {
  const filename = OG_IMAGE_MAP[page][locale];
  return `${BASE_URL}/assets/og/${filename}`;
}

/** SEO meta descriptions for Kali Coliving, per page and locale */
const META_DESCRIPTIONS: Record<PageKey, { en: string; es: string }> = {
  home: {
    en:
      "Kali Coliving – Live together, grow forever. Community-focused coliving in Barcelona. Designed spaces, real connections, and a place to belong. Apply now.",
    es:
      "Kali Coliving – Vive juntos, crece para siempre. Coliving con comunidad en Barcelona. Espacios diseñados, conexiones reales y un lugar donde encajar. Aplica ya.",
  },
  community: {
    en:
      "Meet the Kali community. People who leave a mark. Live with like-minded people in Barcelona and grow through shared experiences and real connections.",
    es:
      "Conoce la comunidad Kali. Personas que dejan huella. Vive con gente con tus mismos valores en Barcelona y crece con experiencias compartidas y conexiones reales.",
  },
  blog: {
    en:
      "Kali Coliving blog – Stories, tips and inspiration about coliving, Barcelona and community life. Culture, gastronomy, entrepreneurship and local plans.",
    es:
      "Blog de Kali Coliving – Historias, consejos e inspiración sobre coliving, Barcelona y vida en comunidad. Cultura, gastronomía, emprendimiento y planes locales.",
  },
  landlords: {
    en:
      "Rent your property with Kali Coliving. Guaranteed rental income, on-time payments and full management. We handle everything so you don't have to worry.",
    es:
      "Alquila tu propiedad con Kali Coliving. Ingresos por alquiler garantizados, pagos a tiempo y gestión integral. Nosotros nos ocupamos de todo para que tú no te preocupes.",
  },
};

export function getMetaDescription(page: PageKey, locale: "en" | "es"): string {
  return META_DESCRIPTIONS[page][locale];
}

/** Page titles for SEO (optional override; nav uses translations) */
const PAGE_TITLES: Record<PageKey, { en: string; es: string }> = {
  home: { en: "Kali Coliving – Live together, grow forever", es: "Kali Coliving – Vive juntos, crece para siempre" },
  community: { en: "Community – Kali Coliving", es: "Comunidad – Kali Coliving" },
  blog: { en: "Blog – Kali Coliving", es: "Blog – Kali Coliving" },
  landlords: { en: "Landlords – Kali Coliving", es: "Propietarios – Kali Coliving" },
};

export function getPageTitle(page: PageKey, locale: "en" | "es"): string {
  return PAGE_TITLES[page][locale];
}
