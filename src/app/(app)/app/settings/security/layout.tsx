import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Settings",
  description: "Manage security settings including API keys and access controls.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
