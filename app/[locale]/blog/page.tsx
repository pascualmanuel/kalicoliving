import { useTranslations } from 'next-intl';

export default function BlogPage() {
  const t = useTranslations('pages.blog');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
