import type { Metadata, Viewport } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif-source",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["600"],
});

export const SITE_URL = "https://hola.tangison.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hola Credit · Say hola to the income a payslip never shows",
    template: "%s · Hola Credit",
  },
  description:
    "Cash-flow underwriting for Namibian microlenders and retailers. Hola Credit turns borrower-authorised bank statements into structured evidence: income floor, consistency, volatility and red flags.",
  keywords: [
    "cash-flow underwriting",
    "Namibia",
    "microlending",
    "retail credit",
    "bank statement assessment",
    "self-employed income",
    "Hola Credit",
    "Tangison",
  ],
  authors: [{ name: "Tangison Technologies" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Hola Credit · Say hola to the income a payslip never shows",
    description:
      "Cash-flow underwriting for Namibian microlenders and retailers. Structure the evidence in a bank statement, in plain language.",
    url: SITE_URL,
    siteName: "Hola Credit",
    type: "website",
    locale: "en_NA",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Hola Credit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hola Credit · Cash-flow underwriting for Namibian lenders",
    description:
      "Turn borrower-authorised bank statements into structured cash-flow evidence. Income floor, consistency, volatility, red flags.",
    images: ["/og-default.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#111512",
  width: "device-width",
  initialScale: 1,
};

/* Organisation identity, sitewide. The home page adds SoftwareApplication. */
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hola Credit",
  description:
    "Explainable cash-flow assessments for Namibian lenders and retailers reviewing applicants without fixed salary patterns.",
  url: "https://hola.tangison.com",
  logo: "https://hola.tangison.com/logos/hola-credit-horizontal.svg",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hola@tangison.com",
    telephone: "+264-83-411-522",
    contactType: "sales",
    areaServed: "NA",
    availableLanguage: "en",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Windhoek",
    addressCountry: "NA",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Tangison Technologies",
    url: "https://tangison.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-sand-50"
        >
          Skip to content
        </a>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}.reveal-clip{clip-path:none !important;transform:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
