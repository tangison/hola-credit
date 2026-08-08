import type { Metadata } from "next";
import "./globals.css";

/* Structured data for Hola Credit organisation */
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hola Credit",
  description:
    "Explainable cash-flow assessments for Namibian lenders and retailers reviewing applicants without fixed salary patterns.",
  url: "https://hola.tangison.com",
  logo: "https://hola.tangison.com/logos/hola-credit-logo-horizontal.svg",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hola@tangison.com",
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
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Hola Credit",
  description:
    "Cash-flow assessment platform for Namibian lenders and retailers.",
  url: "https://hola.tangison.com",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    category: "Pilot access",
    description: "Available for pilot evaluation by authorised Namibian lenders and retailers.",
  },
};

export const metadata: Metadata = {
  title: {
    default: "Hola Credit",
    template: "%s | Hola Credit",
  },
  description:
    "Explainable cash-flow assessments for Namibian lenders and retailers reviewing applicants without fixed salary patterns. Structure evidence from bank statements to support informed lending decisions.",
  metadataBase: new URL("https://hola.tangison.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/logos/hola-credit-favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Hola Credit",
    description:
      "Explainable cash-flow assessments for Namibian lenders and retailers reviewing applicants without fixed salary patterns. Structure evidence from bank statements to support informed lending decisions.",
    url: "https://hola.tangison.com",
    siteName: "Hola Credit",
    locale: "en_NA",
    type: "website",
    images: ["/social/hola-credit-social-en.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hola Credit",
    description:
      "Explainable cash-flow assessments for Namibian lenders and retailers reviewing applicants without fixed salary patterns. Structure evidence from bank statements to support informed lending decisions.",
    images: ["/social/hola-credit-social-en.svg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/logos/hola-credit-favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" as="image" href="/images/cash-flow-to-clear-signal-1280.webp" type="image/webp" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-sand text-ink font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-teal-400 focus:text-ink focus:font-semibold focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
