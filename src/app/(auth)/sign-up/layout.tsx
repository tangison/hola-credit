import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Join the Hola Credit waitlist for early access.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
