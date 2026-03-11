"use client";

const TAG_LABELS: Record<string, string> = {
  culture: "Culture",
  gastro: "Gastro",
  entrepreneur: "Entrepreneur",
  plans: "Plans",
};

function formatContent(content: string): string {
  if (!content || !content.trim()) return "";
  if (content.trim().startsWith("<")) return content;
  return content
    .split(/\n\n+/)
    .map(
      (p) =>
        `<p>${p.replace(/\n/g, " ").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")}</p>`,
    )
    .join("");
}

interface BlogPostPreviewProps {
  title: string;
  content: string;
  coverUrl: string | null;
  listImageUrl: string | null;
  tags: string[];
  locale: string;
}

export default function BlogPostPreview({
  title,
  content,
  coverUrl,
  listImageUrl,
  tags,
  locale,
}: BlogPostPreviewProps) {
  const imageUrl = listImageUrl || coverUrl;
  const displayTitle = title.trim() || "Título del post";

  return (
    <main className="px-4 py-10 md:py-16 md:px-20 mx-auto mt-8 border border-grey/15 rounded-[20px] bg-white/80 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <aside className="lg:w-[440px] shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="lg:hidden mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-grey mb-3">
                {displayTitle}
              </h1>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-brown/80 text-white"
                  >
                    {TAG_LABELS[tag] ?? tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden lg:block rounded-[20px] bg-brown p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {displayTitle}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-[#b08a6e] text-white"
                  >
                    {TAG_LABELS[tag] ?? tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <article className="flex-1 min-w-0">
          {imageUrl && (
            <div className="relative w-full aspect-[16/10] md:aspect-video rounded-[20px] overflow-hidden bg-gray-200 mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none text-grey text-[18px] leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_h2]:font-bold [&_h2]:text-[24px] [&_h3]:font-semibold [&_h3]:text-[18px] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-1 [&_a]:text-brown [&_a]:underline [&_a]:font-medium [&_a]:cursor-pointer hover:[&_a]:text-brown/80 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-[12px] [&_img]:my-4"
            dangerouslySetInnerHTML={{
              __html:
                formatContent(content) ||
                "<p class='text-grey/50'>El contenido aparecerá aquí.</p>",
            }}
          />
        </article>
      </div>
    </main>
  );
}
