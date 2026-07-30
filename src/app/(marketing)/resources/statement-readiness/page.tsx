import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";

export default function StatementReadinessPage() {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-500 mb-4 tracking-wide uppercase">Resources / Statement readiness</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Statement readiness
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                A bank statement that cannot be read or processed benefits no one. This guide explains what makes a bank statement usable for cash-flow assessment, covers the supported file types and quality requirements, and provides practical guidance for staff preparing or collecting statements from applicants.
              </p>
            </div>
          </div>
        </section>

        {/* Supported file types */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Supported file types
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Hola Credit accepts bank statements in three file formats: PDF, PNG, and JPEG. PDF is the preferred format because it preserves the original layout, text encoding, and page structure of the bank statement. Most Namibian banks allow customers to download their statements as PDFs from their online banking portals, and this is the most reliable way to produce a usable file.
                </p>
                <p className="text-ink/70 leading-relaxed mb-6">
                  PNG and JPEG are supported for cases where the applicant does not have access to a PDF download — for example, when the statement is only available as a printed document that must be photographed. Image-based uploads go through OCR (optical character recognition) as a fallback, which is less reliable than direct PDF text extraction. If a PDF is available, it should always be preferred over a photograph.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The system validates the file type on the server side. Files that are not PDF, PNG, or JPEG will be rejected at upload. Renaming a file extension does not change the actual file format — the system checks the file contents, not the extension. If a file is password-protected, the password must be removed before upload because the system cannot process encrypted files.
                </p>
              </div>
              <div>
                <div className="space-y-4">
                  {[
                    { format: "PDF", note: "Preferred. Preserves layout, text encoding, and page structure. Download from the bank's online portal." },
                    { format: "PNG", note: "Supported. Lossless image format suitable for photographs of printed statements. Use good lighting and avoid shadows." },
                    { format: "JPEG", note: "Supported. Lossy image format. Acceptable but may introduce compression artefacts that reduce OCR accuracy. Prefer PNG over JPEG for photographs." },
                  ].map((item) => (
                    <div key={item.format} className="border border-sand-300 p-5 bg-sand-50">
                      <p className="font-semibold text-ink mb-1">{item.format}</p>
                      <p className="text-sm text-ink/70 leading-relaxed">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* File quality */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">File quality requirements</h2>
            <div className="space-y-16">
              {[
                {
                  title: "Complete statement period",
                  description:
                    "The statement must cover the full period required for assessment. Most cash-flow assessments require three to six months of transaction history. If the statement covers only a partial period, the assessment will have less data to work with, and the results may be flagged as insufficient. Check that the statement includes all pages — a missing page means missing transactions, and the assessment will not be able to account for the gap. Staff should verify that the statement period matches the required assessment window before submitting the file.",
                },
                {
                  title: "Readable text and clear images",
                  description:
                    "For PDF statements, the text must be selectable and not rendered as a scanned image. Some bank statements are produced as image-only PDFs, which require OCR and are less reliable. If the PDF text can be selected and copied in a PDF reader, it is a text-based PDF and will process more reliably. For image-based uploads (PNG and JPEG), the photograph must be sharp, well-lit, and free of shadows, glare, or obstructions. The text should be legible at normal viewing size. Blurry or skewed photographs significantly reduce OCR accuracy and may cause the extraction to fail or produce low-confidence results.",
                },
                {
                  title: "Unmodified and unredacted",
                  description:
                    "The statement must be an unmodified original from the bank. Cropping, redacting, or altering the statement in any way may remove transactions or metadata that the assessment needs, and it may also raise concerns about the integrity of the evidence. If the applicant is concerned about privacy, they should be reassured that the statement is processed only for the defined credit assessment purpose, under the consent they have granted, and that the raw file is retained only for the period necessary to support the assessment. Staff should not crop, annotate, or redact any part of the statement before uploading.",
                },
              ].map((item, i) => (
                <div key={i} className="grid lg:grid-cols-[120px_1fr] gap-6">
                  <div className="text-5xl font-bold text-sand-300">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-ink mb-3">{item.title}</h3>
                    <p className="text-ink/70 leading-relaxed max-w-2xl">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common extraction issues */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Common extraction issues
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Even with a well-prepared file, some extraction issues are common. Understanding these issues helps staff set realistic expectations and take corrective action where possible. The most frequent problems are: image-only PDFs that require OCR instead of direct text extraction, photographs with poor lighting or skew that reduce OCR accuracy, statements that span multiple files where one file is missing, and password-protected files that the system cannot open.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  When the extraction encounters a problem, it does not silently guess. Low-confidence transactions are flagged for human review, and insufficient data is reported as insufficient rather than dressed up as a definitive result. The assessment shows which transactions were extracted with confidence, which were flagged, and which could not be extracted at all. This transparency ensures that the lender can see the limitations of the data and make an informed decision.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Bank format support
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Hola Credit is designed to work with statements from Namibian banks. The initial launch supports statements from FNB Namibia, Bank Windhoek, Standard Bank Namibia, and Nedbank Namibia. The extraction and categorisation process is tuned for Namibian transaction patterns, currency, and banking formats, not adapted from a generic international template.
                </p>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Each bank formats its statements differently — different column layouts, different date formats, different transaction descriptions, and different page structures. The extraction system is trained to handle these variations, but format accuracy is measured separately for each bank. If a bank changes its statement format, the extraction may produce lower-confidence results until the system is updated to match the new format.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Statements from banks outside Namibia, or from banks not yet supported, may produce unreliable results. The system will attempt extraction, but the assessment will flag the data as coming from an unsupported format. Staff should check that the statement is from a supported bank before uploading, and contact Hola Credit if they need support for a bank that is not yet on the list.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical guidance for staff */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Practical guidance for staff</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                When collecting or preparing a bank statement for cash-flow assessment, follow these steps to give the assessment the best chance of producing reliable results. First, always prefer a PDF download from the bank's online portal over a photograph of a printed statement. The PDF preserves the original layout and text encoding, which makes extraction more reliable. Second, verify that the statement covers the full assessment period — typically three to six months — and that no pages are missing. Third, ensure the file is not password-protected, and do not crop, redact, or annotate the statement.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                If a photograph is the only option, take it in good lighting with the camera directly above the document, avoiding shadows and glare. Ensure all four corners of the page are visible and the text is legible at normal viewing size. If the statement spans multiple pages, photograph each page separately and upload them as separate files. Do not combine multiple pages into a single image by stitching them together, as this can distort the layout and reduce OCR accuracy.
              </p>
              <p className="text-ink/70 leading-relaxed">
                After upload, the system will process the file and report any issues. If the extraction encounters problems, the assessment will flag the affected transactions and report the confidence level. Staff should review the assessment, check the flagged transactions, and if necessary, request a better-quality statement from the applicant. The assessment is only as good as the data it receives — preparing a good statement is the most effective way to improve the result.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about statement preparation?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              If your team needs additional guidance on statement readiness or extraction quality, contact us to discuss your requirements.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui"
              >
                Request pilot access
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                All resources
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
