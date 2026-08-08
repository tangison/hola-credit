import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description: "Manage team members and their access roles.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
