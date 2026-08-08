import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Health",
  description: "Monitor system health, uptime, and operational status.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
