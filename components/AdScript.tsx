import Script from "next/script";

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-4043939286605519";

/**
 * Loads the Google AdSense script once globally. Enables Auto Ads (if turned on
 * in the AdSense console) as well as manual ad slots placed via <AdSlot />.
 *
 * Loaded with strategy="afterInteractive" so it doesn't block first paint.
 */
export function AdScript() {
  if (!ADSENSE_CLIENT) return null;
  return (
    <Script
      id="adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
