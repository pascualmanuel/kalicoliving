/**
 * Renders a script tag with JSON-LD structured data for SEO.
 * Use with schema.org types (Organization, WebSite, Article, etc.).
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
