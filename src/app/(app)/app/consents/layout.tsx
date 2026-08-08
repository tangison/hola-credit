import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consents",
  description: "Manage data processing consents for borrower information.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
