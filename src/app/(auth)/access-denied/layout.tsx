import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Denied",
  description: "You do not have access to this resource. Explore the demo instead.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
