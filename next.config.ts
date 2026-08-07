import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  /* Disable source maps in production to avoid exposing source code */
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        /* Cache static assets aggressively (1 year immutable) */
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        /* Cache images for 1 year */
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        /* Cache fonts and static assets for 1 year */
        source: "/(favicon.*|apple-touch-icon.*|manifest.*|logos/.*|social/.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        /* HTML pages: short cache, stale-while-revalidate for performance */
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            /*
             * CSP tightened: removed 'unsafe-eval' (not needed in production).
             * 'unsafe-inline' kept for script-src (Next.js requires inline scripts for hydration)
             * and style-src (Tailwind CSS runtime). In a future iteration, nonces can replace
             * these once Next.js supports CSP nonce injection natively.
             * Added: object-src 'none', base-uri 'self'.
             */
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://openrouter.ai; object-src 'none'; base-uri 'self'; frame-ancestors 'none';",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          /* HSTS: enforce HTTPS for 1 year, include subdomains, preload */
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          /* Cache HTML pages: 60s fresh, 300s stale-while-revalidate */
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/verify",
        destination: "/app",
        permanent: false,
      },
      {
        source: "/accept-invitation",
        destination: "/waitlist",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
