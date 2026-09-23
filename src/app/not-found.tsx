import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-5 py-32 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-teal-600">404</p>
              <h1 className="mt-5 max-w-xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-ink sm:text-5xl">
                This page did not make it through underwriting.
              </h1>
              <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-ink/65">
                The address exists nowhere on our books. The statements, however, are all accounted for.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="press group inline-flex items-center justify-center gap-2 rounded-none bg-ink px-7 py-3.5 text-sm font-bold text-sand-50 hover:bg-ink-50"
                >
                  Back to the home page
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center rounded-none border border-sand-400 px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-ui hover:border-ink"
                >
                  See the product
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[320px]">
              <img
                src="/images/landing/searching-404.webp"
                alt="Illustration of a man searching under a table for something that is not there"
                width={768}
                height={768}
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
