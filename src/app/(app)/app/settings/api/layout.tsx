import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Settings",
  description: "Configure API access, webhooks, and integration settings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
