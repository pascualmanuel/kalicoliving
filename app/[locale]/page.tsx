import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('pages.home');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
