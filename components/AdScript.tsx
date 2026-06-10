"use client";

import { useEffect } from "react";

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-4043939286605519";

/**
 * Loads the Google AdSense script once, after the page has finished loading
 * and the main thread is idle. adsbygoogle.js was responsible for most of the
 * long main-thread tasks Lighthouse flagged (TBT/INP) — deferring it past
 * `load` keeps the critical rendering path clean. Individual <AdSlot>s queue
 * their pushes into window.adsbygoogle, which the script drains on arrival,
 * so slots render exactly as before, just without blocking startup.
 */
export function AdScript() {
  useEffect(() => {
    if (!ADSENSE_CLIENT) return;
    if (document.getElementById("adsbygoogle-js")) return;

    const inject = () => {
      if (document.getElementById("adsbygoogle-js")) return;
      const s = document.createElement("script");
      s.id = "adsbygoogle-js";
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    };

    const idle = (cb: () => void) => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => void })
        .requestIdleCallback;
      if (ric) ric(cb);
      else setTimeout(cb, 200);
    };

    if (document.readyState === "complete") {
      idle(inject);
    } else {
      window.addEventListener("load", () => idle(inject), { once: true });
    }
  }, []);

  return null;
}
