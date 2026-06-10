import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Card images are served from the WordPress install on Hostinger as raw
  // JPEGs. Routing them through the Next image optimizer re-sizes per device
  // and converts to WebP — Lighthouse measured ~740KB of savings on mobile.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.onlinelearnership.co.za",
        pathname: "/wp-content/**",
      },
    ],
    // WP uploads are effectively immutable (new uploads get new filenames),
    // so let the optimizer cache aggressively.
    minimumCacheTTL: 86400,
  },

  // Override Next.js's default no-cache headers so Firebase's CDN actually
  // caches our rendered HTML. We manage data freshness via our own in-memory
  // cache in lib/wp.ts (5 min TTL), so 5 min edge cache is safe.
  //
  // s-maxage:                edge CDN cache duration (300s = 5 min)
  // stale-while-revalidate:  serve stale up to 1 day while refreshing in bg
  // max-age=0:               browser doesn't cache (so new visits always get fresh edge content)
  async headers() {
    const cacheable = "public, max-age=0, s-maxage=300, stale-while-revalidate=86400";
    const longCache = "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";
    const securityHeaders = [
      // Force HTTPS for a year (Lighthouse: "Use a strong HSTS policy")
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      // Block clickjacking (Lighthouse: "Mitigate clickjacking with XFO or CSP")
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      // Origin isolation without breaking AdSense popups (Lighthouse: COOP)
      { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ];
    return [
      {
        // Security headers on every route
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // All page routes: cache at edge for 5 min
        source: "/((?!_next/|api/|.*\\..*).*)",
        headers: [{ key: "Cache-Control", value: cacheable }],
      },
      {
        // Static info pages can cache much longer
        source: "/(about|contact|privacy|terms)",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        // sitemap & robots also fine to cache
        source: "/(sitemap.xml|robots.txt|ads.txt)",
        headers: [{ key: "Cache-Control", value: cacheable }],
      },
      {
        // Static assets in /public (logo etc.) — cache for a day at browser,
        // a month at edge (Lighthouse: "Use efficient cache lifetimes")
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // We previously published /opportunities/<slug> during the redesign phase.
      // Now detail pages live at /<slug> to match the original WordPress URLs.
      {
        source: "/opportunities/:slug",
        destination: "/:slug",
        permanent: true,
      },
      // WordPress category archives → opportunities listing (best-fit equivalent)
      {
        source: "/category/:slug",
        destination: "/opportunities",
        permanent: true,
      },
      // WordPress tag archives → opportunities listing
      {
        source: "/tag/:slug",
        destination: "/opportunities",
        permanent: true,
      },
      // WordPress date archives → home
      {
        source: "/:year(\\d{4})/:month(\\d{2})",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})",
        destination: "/",
        permanent: true,
      },
      // WordPress feed URLs → home (or you can drop these if you want them to 404)
      {
        source: "/feed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/comments/feed",
        destination: "/",
        permanent: true,
      },
      // WordPress author pages → about
      {
        source: "/author/:slug",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
