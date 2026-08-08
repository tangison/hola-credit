import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Runs",
  description: "Monitor scoring model execution history and performance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
