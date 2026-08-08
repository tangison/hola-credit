import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Setup",
  description: "Add team members and assign roles during onboarding.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
