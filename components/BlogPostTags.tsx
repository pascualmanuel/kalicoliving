import { getTranslations } from 'next-intl/server';

const KNOWN_TAGS = ['culture', 'gastro', 'entrepreneur', 'plans'] as const;

interface BlogPostTagsProps {
  tags: string[] | null;
  variant?: 'default' | 'light';
}

export default async function BlogPostTags({ tags, variant = 'default' }: BlogPostTagsProps) {
  const t = await getTranslations('pages.blog.categories');
  const list = tags ?? [];

  if (list.length === 0) return null;

  const isLight = variant === 'light';

  return (
    <div className="flex flex-wrap gap-2">
      {list.map((tag) => {
        const key = tag.toLowerCase();
        const label = KNOWN_TAGS.includes(key as (typeof KNOWN_TAGS)[number])
          ? t(key as 'culture' | 'gastro' | 'entrepreneur' | 'plans')
          : tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

        return (
          <span
            key={tag}
            className={
              isLight
                ? 'inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-[#b08a6e] text-black'
                : 'inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-brown/80 text-white'
            }
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
