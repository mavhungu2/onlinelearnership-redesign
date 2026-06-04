const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-4043939286605519";

/**
 * Loads the Google AdSense script once globally.
 *
 * We deliberately use a raw <script> element (not next/script's <Script />)
 * because Next.js adds a `data-nscript` attribute that the AdSense loader
 * does not recognise and warns about ("AdSense head tag doesn't support
 * data-nscript attribute"). The native <script async> + React's built-in
 * script deduping in modern versions handles this perfectly.
 */
export function AdScript() {
  if (!ADSENSE_CLIENT) return null;
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
