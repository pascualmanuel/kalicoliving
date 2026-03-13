import type { Metadata } from "next";
import React from "react";
import Script from "next/script";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { BASE_URL } from "@/lib/metadata";

const GA_MEASUREMENT_ID = "G-8181TXVVRV";

export const metadata: Metadata = {
  title: "Kali Coliving",
  description: "Kali Coliving – community-focused coliving spaces.",
  icons: {
    icon: [
      {
        url: "/assets/logos/isoblack.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/logos/isowhite.svg",
        media: "(prefers-color-scheme: dark)",
      },
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
      <body className="overflow-x-hidden">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
