import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 84" role="img" aria-label="Hola Credit" className="h-10 w-auto mx-auto mb-4">
          <g transform="translate(0 10)">
            <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
            <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
          </g>
          <text x="112" y="57" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="44" fontWeight="550" letterSpacing="-1.8">hola credit</text>
        </svg>
        <h1 className="text-2xl font-bold text-ink">Sign in to your account</h1>
        <p className="mt-2 text-sm text-ink/60">Access your organisation&apos;s credit assessment portal</p>
      </div>
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "bg-white border border-sand-300 shadow-sm rounded-lg",
            headerTitle: "text-ink font-semibold",
            headerSubtitle: "text-ink/60",
            formButtonPrimary: "bg-ink hover:bg-ink-50 text-sand-50",
            formFieldInput: "border-sand-300 rounded-md",
            footerActionLink: "text-teal-500 hover:text-teal-600",
          },
        }}
      />
    </div>
  );
}
