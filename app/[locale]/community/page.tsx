import { useTranslations } from 'next-intl';

export default function CommunityPage() {
  const t = useTranslations('pages.community');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
