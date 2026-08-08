import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organisation Settings",
  description: "Configure your organisation profile and business details.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
