import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kali Coliving',
  description: 'Kali Coliving – community-focused coliving spaces.',
  icons: {
    icon: [
      { url: '/assets/logos/isoblack.svg', media: '(prefers-color-scheme: light)' },
      { url: '/assets/logos/isowhite.svg', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}

