import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="bg-ink text-sand-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <Logo variant="reversed" />
            <p className="text-sm text-sand-400">
              Cash-flow underwriting for Namibian lenders.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
            <Link href="/product" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">
              Product
            </Link>
            <Link href="/for-microlenders" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">
              Microlenders
            </Link>
            <Link href="/for-retailers" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">
              Retailers
            </Link>
            <Link href="/security" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">
              Security
            </Link>
            <Link href="/about" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">
              About
            </Link>
            <Link href="/contact" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui">
              Terms
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-sand-100/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-sand-400">
            <a
              href="https://tangison.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sand-100 transition-colors duration-ui"
            >
              Made by Tangison Studio
            </a>
          </p>
          <p className="text-xs text-sand-400">
            <a href="mailto:hola@tangison.com" className="hover:text-sand-100 transition-colors duration-ui">
              hola@tangison.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
