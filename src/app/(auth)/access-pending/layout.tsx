import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Pending",
  description: "Your access request is pending. Explore the demo while you wait.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
