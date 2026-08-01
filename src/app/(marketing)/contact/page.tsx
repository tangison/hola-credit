"use client";

import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";
import { useState } from "react";

const businessTypes = [
  "Microlender",
  "Retail credit provider",
  "Financial services",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Contact</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Request pilot access
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Hola Credit is currently available for pilot evaluation by authorised Namibian lenders and retailers. Submitting this form is a request for pilot access, not open self-service production access. Our team will review your request and respond to discuss next steps.
              </p>
            </div>
          </div>
        </section>

        {/* Form and information */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Form */}
              <div>
                {submitted ? (
                  <div className="bg-sand border border-sand-300 p-8">
                    <h2 className="text-2xl font-bold text-ink mb-4">Request received</h2>
                    <p className="text-ink/70 leading-relaxed mb-4">
                      Thank you for your interest in Hola Credit pilot access. Our team will review your request and respond to the email address you provided. We typically respond within two business days.
                    </p>
                    <p className="text-ink/70 leading-relaxed">
                      If you have an urgent question, contact us directly at{" "}
                      <a href="mailto:hola@tangison.com" className="text-teal-600 hover:text-teal-700 transition-colors duration-ui underline underline-offset-4">
                        hola@tangison.com
                      </a>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="organisation" className="block text-sm font-medium text-ink mb-1">
                        Organisation name
                      </label>
                      <input
                        type="text"
                        id="organisation"
                        name="organisation"
                        required
                        className="w-full rounded-md border border-sand-300 bg-white px-4 py-2.5 text-ink placeholder:text-ink/40 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors duration-ui"
                        placeholder="Registered organisation name"
                      />
                    </div>

                    <div>
                      <label htmlFor="business-type" className="block text-sm font-medium text-ink mb-1">
                        Business type
                      </label>
                      <select
                        id="business-type"
                        name="business-type"
                        required
                        className="w-full rounded-md border border-sand-300 bg-white px-4 py-2.5 text-ink focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors duration-ui"
                      >
                        <option value="" disabled selected>Select your business type</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
                        Work email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-md border border-sand-300 bg-white px-4 py-2.5 text-ink placeholder:text-ink/40 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors duration-ui"
                        placeholder="you@organisation.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-ink mb-1">
                        Your role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        required
                        className="w-full rounded-md border border-sand-300 bg-white px-4 py-2.5 text-ink placeholder:text-ink/40 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors duration-ui"
                        placeholder="e.g. Risk Manager, Loan Officer, Compliance Lead"
                      />
                    </div>

                    <div>
                      <label htmlFor="assessments" className="block text-sm font-medium text-ink mb-1">
                        Expected monthly assessments
                      </label>
                      <input
                        type="text"
                        id="assessments"
                        name="assessments"
                        className="w-full rounded-md border border-sand-300 bg-white px-4 py-2.5 text-ink placeholder:text-ink/40 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors duration-ui"
                        placeholder="Approximate number per month"
                      />
                    </div>

                    <div>
                      <label htmlFor="intended-use" className="block text-sm font-medium text-ink mb-1">
                        Intended use
                      </label>
                      <textarea
                        id="intended-use"
                        name="intended-use"
                        rows={4}
                        className="w-full rounded-md border border-sand-300 bg-white px-4 py-2.5 text-ink placeholder:text-ink/40 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors duration-ui resize-y"
                        placeholder="Briefly describe how your organisation would use Hola Credit alongside your existing assessment process."
                      />
                    </div>

                    <div className="border-l-4 border-teal-400 bg-teal-50 p-4 rounded-r-md">
                      <p className="text-sm text-ink/70 leading-relaxed">
                        This form collects organisational information only. Never submit borrower data, personal financial information, or bank statement details through this form. Borrower data is processed only through the secure application after consent is recorded.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md bg-ink text-sand-50 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
                    >
                      Submit pilot request
                    </button>
                  </form>
                )}
              </div>

              {/* Information */}
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">What happens next</h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Submitting this form is a request for pilot access, not open self-service production access. Our team will review your request, verify that your organisation is an authorised credit provider, and respond to discuss pilot onboarding, configuration, and timeline. Pilot access is designed for organisations that want to evaluate structured cash-flow evidence alongside their existing assessment process before committing to production use.
                </p>
                <p className="text-ink/70 leading-relaxed mb-6">
                  During the pilot, your organisation will have access to the Hola Credit web portal with the same security controls, consent framework, and audit capabilities that apply in production. The assessment results produced during the pilot are real and auditable, but the product is still in development and some features may change before general availability. Your feedback during the pilot will help shape the product.
                </p>

                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-ink mb-2">Contact email</h3>
                    <a
                      href="mailto:hola@tangison.com"
                      className="text-lg text-teal-600 hover:text-teal-700 transition-colors duration-ui underline underline-offset-4"
                    >
                      hola@tangison.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink mb-2">Product domain</h3>
                    <p className="text-ink/70">hola.tangison.com</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink mb-2">Who is this for?</h3>
                    <p className="text-ink/70 leading-relaxed">
                      Authorised Namibian lenders and retail credit providers who want to evaluate structured cash-flow evidence alongside their existing assessment process. This includes microlenders, retail credit teams, and financial services organisations operating under Namibian regulation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Want to learn more before requesting pilot access?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              Explore how Hola Credit works, what the assessment includes, and how it fits alongside your existing credit review process.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/product"
                className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui"
              >
                See how it works
              </Link>
              <Link
                href="/how-scoring-works"
                className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                How scoring works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
