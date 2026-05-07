import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

const ptSans = PT_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
  display: "swap",
});

import { AnimationLayer } from "@/components/animation-layer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";
import { ThemeProvider } from "@/components/theme-provider";
import { brand } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(brand.domain),
  robots: { index: false, follow: false },
  title: {
    default: "Mister FAPC — клининг для юридических лиц",
    template: "%s | Mister FAPC"
  },
  description: "B2B-клининг для офисов, складов, производств и коммерческих объектов: регламент, чек-листы, персональный менеджер и контроль качества.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: brand.name,
    title: "Mister FAPC — клининг для юридических лиц",
    description: "Управляемая чистота для бизнеса: смета, договор, SLA, контроль и закрывающие документы."
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    legalName: brand.legalName,
    url: brand.domain,
    email: brand.email,
    telephone: brand.mainPhone
  };

  return (
    <html lang="ru" suppressHydrationWarning className={ptSans.variable}>
      <body>
        <ThemeProvider>
          <AnimationLayer />
          <JsonLd data={organizationSchema} />
          {/* TODO: set NEXT_PUBLIC_YANDEX_METRIKA_ID before production launch. */}
          {process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ? (
            <Script id="ym-placeholder" strategy="afterInteractive">
              {`window.misterFapcMetrikaId='${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}'`}
            </Script>
          ) : null}
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyMobileCta />
        </ThemeProvider>
      </body>
    </html>
  );
}
