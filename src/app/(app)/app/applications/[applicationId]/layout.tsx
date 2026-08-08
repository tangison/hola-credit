import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Details",
  description: "View detailed credit assessment results and borrower information.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
