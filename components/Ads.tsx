"use client";

import { useEffect, useRef } from "react";

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-4043939286605519";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Layout = "horizontal" | "in-article" | "vertical" | "in-feed" | "square" | "multiplex";

interface AdSlotProps {
  slot: string;
  layout?: Layout;
  className?: string;
  /** Optional visible label so the slot doesn't look broken before ads load. */
  label?: string;
}

const layoutAttrs: Record<Layout, Record<string, string>> = {
  horizontal: {
    "data-ad-format": "horizontal",
    "data-full-width-responsive": "true",
  },
  vertical: {
    "data-ad-format": "vertical",
  },
  square: {
    "data-ad-format": "rectangle",
    "data-full-width-responsive": "true",
  },
  "in-article": {
    "data-ad-format": "fluid",
    "data-ad-layout": "in-article",
  },
  "in-feed": {
    "data-ad-format": "fluid",
    "data-ad-layout-key": "-fb+5w+4e-db+86",
  },
  multiplex: {
    "data-ad-format": "autorelaxed",
  },
};

const minHeights: Record<Layout, string> = {
  horizontal: "min-h-[100px] sm:min-h-[120px]",
  vertical: "min-h-[600px]",
  square: "min-h-[250px]",
  "in-article": "min-h-[200px]",
  "in-feed": "min-h-[120px]",
  multiplex: "min-h-[300px]",
};

export function AdSlot({ slot, layout = "horizontal", className = "", label }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (typeof window === "undefined") return;
    if (!ref.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (err) {
      console.warn("[ads] push failed", err);
    }
  }, []);

  const attrs = layoutAttrs[layout];

  return (
    <aside
      className={`relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${minHeights[layout]} ${className}`}
      aria-label="Advertisement"
    >
      <span className="absolute left-3 top-2 z-10 text-[10px] font-medium uppercase tracking-wider text-slate-400">
        {label ?? "Advertisement"}
      </span>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        {...attrs}
      />
    </aside>
  );
}

// Convenience wrappers for each placement — preconfigured slots from the live WP site.
const SLOTS = {
  homepage: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE || "4412725597",
  article: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE || "3974683846",
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "9948329863",
  feed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FEED || "1230950212",
  multiplex: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MULTIPLEX || "3343309551",
  paragraph: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PARAGRAPH || "9948329863",
};

export const AdHomepage = ({ className = "" }: { className?: string }) => (
  <AdSlot slot={SLOTS.homepage} layout="horizontal" className={className} />
);

export const AdInArticle = ({ className = "" }: { className?: string }) => (
  <AdSlot slot={SLOTS.article} layout="in-article" className={className} />
);

export const AdSidebar = ({ className = "" }: { className?: string }) => (
  <AdSlot slot={SLOTS.sidebar} layout="vertical" className={className} />
);

export const AdInFeed = ({ className = "" }: { className?: string }) => (
  <AdSlot slot={SLOTS.feed} layout="in-feed" className={className} />
);

export const AdMultiplex = ({ className = "" }: { className?: string }) => (
  <AdSlot slot={SLOTS.multiplex} layout="multiplex" className={className} label="More opportunities for you" />
);

export const AdBetweenParagraphs = ({ className = "" }: { className?: string }) => (
  <AdSlot slot={SLOTS.paragraph} layout="horizontal" className={className} />
);
