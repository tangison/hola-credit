import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your credit assessment activity, recent applications, and quick actions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
