import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingHeader />
      <main id="main-content" className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
