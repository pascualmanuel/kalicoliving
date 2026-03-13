import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import SetHtmlLang from '@/components/SetHtmlLang';
import Navigation from '@/components/Navigation';
import CookieBanner from '@/components/CookieBanner';
import { ApplyPopupProvider } from '@/context/ApplyPopupContext';
import { BlogAlternateLocaleProvider } from '@/context/BlogAlternateLocaleContext';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SetHtmlLang locale={locale} />
      <ApplyPopupProvider>
        <BlogAlternateLocaleProvider>
          <Navigation />
          {children}
          <CookieBanner />
        </BlogAlternateLocaleProvider>
      </ApplyPopupProvider>
    </NextIntlClientProvider>
  );
}
