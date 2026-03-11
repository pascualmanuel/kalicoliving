"use client";

import { createContext, useContext, useState, useEffect } from "react";

/** When on a blog post, this holds the pathname + locale of the translation so the nav switcher can link there. */
export type AlternateLink = { pathname: string; locale: string };

const BlogAlternateLocaleContext = createContext<{
  alternateLink: AlternateLink | null;
  setAlternateLink: (link: AlternateLink | null) => void;
} | null>(null);

export function useBlogAlternateLocale() {
  const ctx = useContext(BlogAlternateLocaleContext);
  return ctx ?? { alternateLink: null, setAlternateLink: () => {} };
}

export function BlogAlternateLocaleProvider({ children }: { children: React.ReactNode }) {
  const [alternateLink, setAlternateLink] = useState<AlternateLink | null>(null);
  return (
    <BlogAlternateLocaleContext.Provider value={{ alternateLink, setAlternateLink }}>
      {children}
    </BlogAlternateLocaleContext.Provider>
  );
}

/** Call from the blog post page (server) with translationSibling so the nav switcher goes to the correct URL. */
export function SetBlogAlternateLink({
  sibling,
}: {
  sibling: { slug: string; locale: string } | null;
}) {
  const { setAlternateLink } = useBlogAlternateLocale();
  useEffect(() => {
    const link =
      sibling != null
        ? { pathname: `/blog/${sibling.slug}`, locale: sibling.locale }
        : null;
    setAlternateLink(link);
    return () => setAlternateLink(null);
  }, [sibling?.slug, sibling?.locale, setAlternateLink]);
  return null;
}
