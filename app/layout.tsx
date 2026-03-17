import type { Metadata } from "next";
import React from "react";
import Script from "next/script";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { BASE_URL } from "@/lib/metadata";

const GTM_ID = "GTM-NTH5NXPW";

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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
