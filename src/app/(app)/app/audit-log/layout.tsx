import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Log",
  description: "Review system audit trail for all actions and data access.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
