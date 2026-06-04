import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
