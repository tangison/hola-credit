import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/product",
  "/for-microlenders",
  "/for-retailers",
  "/how-scoring-works",
  "/security",
  "/resources(.*)",
  "/about",
  "/contact",
  "/brand",
  "/privacy",
  "/terms",
  "/consent",
  "/sitemap",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/onboarding(.*)",
  "/access-pending",
  "/access-denied",
  "/session-expired",
]);

const isAuthRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;

  // Allow public routes without auth
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // For protected routes, check auth
  try {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect_url", pathname);
      return NextResponse.redirect(signInUrl);
    }
  } catch {
    // Clerk not configured - allow all routes in development
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
