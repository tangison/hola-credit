import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// MVP: No auth wall. All routes are public.
// Clerk middleware removed — waiting list + math captcha instead of signup.

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
