import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Application",
  description: "Start a new credit assessment application for a borrower.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
