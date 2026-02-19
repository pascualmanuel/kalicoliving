import { useTranslations } from 'next-intl';

export default function LandlordsPage() {
  const t = useTranslations('pages.landlords');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
