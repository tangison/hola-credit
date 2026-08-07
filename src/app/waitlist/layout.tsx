import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description:
    "Join the Hola Credit waitlist. Authorised Namibian lenders and retailers can register for early access to cash-flow assessment tools and pilot access.",
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
