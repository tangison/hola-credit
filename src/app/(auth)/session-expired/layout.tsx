import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session Expired",
  description: "Your session has expired. Start a new session or explore the demo.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
