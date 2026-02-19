'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    router.push(pathname, { locale: newLocale });
  };

  return (
    <nav className="p-4 border-b">
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:underline">{t('home')}</Link>
        <Link href="/landlords" className="hover:underline">{t('landlords')}</Link>
        <Link href="/blog" className="hover:underline">{t('blog')}</Link>
        <Link href="/community" className="hover:underline">{t('community')}</Link>
        <button 
          onClick={toggleLocale}
          className="ml-auto px-3 py-1 border rounded hover:bg-gray-100"
        >
          {locale === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </nav>
  );
}
