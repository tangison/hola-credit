import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Queue",
  description: "Review applications flagged for manual assessment.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
