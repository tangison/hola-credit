import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="bg-ink text-sand-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo variant="reversed" />
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1" aria-label="Footer navigation">
            <Link href="/product" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">Product</Link>
            <Link href="/for-microlenders" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">Microlenders</Link>
            <Link href="/for-retailers" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">Retailers</Link>
            <Link href="/about" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">About</Link>
            <Link href="/contact" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">Contact</Link>
            <Link href="/privacy" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">Privacy</Link>
            <Link href="/terms" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">Terms</Link>
          </nav>
          <a href="mailto:hola@tangison.com" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">hola@tangison.com</a>
        </div>
      </div>
    </footer>
  );
}
