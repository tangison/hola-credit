import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hola Credit",
    template: "%s | Hola Credit",
  },
  description:
    "Explainable cash-flow assessments for Namibian lenders and retailers reviewing applicants without fixed salary patterns.",
  metadataBase: new URL("https://hola.tangison.com"),
  openGraph: {
    title: "Hola Credit",
    description:
      "Explainable cash-flow assessments for Namibian lenders and retailers reviewing applicants without fixed salary patterns.",
    url: "https://hola.tangison.com",
    siteName: "Hola Credit",
    locale: "en_NA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hola Credit",
    description:
      "Explainable cash-flow assessments for Namibian lenders and retailers reviewing applicants without fixed salary patterns.",
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
      <body className="min-h-screen flex flex-col bg-sand text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
