import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance Setup",
  description: "Configure compliance settings for your organisation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
