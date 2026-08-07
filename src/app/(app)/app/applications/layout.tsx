import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications",
  description: "View and manage credit assessment applications.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
