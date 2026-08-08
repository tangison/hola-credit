import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Hola Credit authentication pages for sign-in, sign-up, and account management.",
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-sand" aria-label="Authentication">
      {children}
    </main>
  );
}
