import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organisation Setup",
  description: "Set up your organisation details for the Hola Credit demo.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
