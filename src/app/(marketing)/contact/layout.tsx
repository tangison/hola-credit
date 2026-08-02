import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Hola Credit team. Authorised Namibian lenders and retailers interested in cash-flow assessment can reach us at hola@tangison.com.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
