import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Borrower Details",
  description: "View detailed borrower information and assessment history.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
