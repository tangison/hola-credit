import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Borrowers",
  description: "Browse and manage borrower records and assessment history.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
