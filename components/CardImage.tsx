"use client";

import { useState } from "react";

/**
 * Card image served via wsrv.nl — a free, Cloudflare-backed image proxy that
 * resizes and converts to WebP on the fly with long edge caching.
 *
 * We can't use next/image here: Firebase App Hosting's Next.js adapter
 * disables the built-in optimizer (/_next/image 404s), so <Image> silently
 * falls back to the raw 100KB+ JPEGs from WordPress. wsrv gives us the same
 * wins (right-sizing + modern format ≈ −740KB on mobile per Lighthouse)
 * without depending on the adapter.
 *
 * Falls back to the original WordPress URL if wsrv ever fails.
 */

const WIDTHS = [320, 480, 768] as const;

function optimized(url: string, w: number): string {
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${w}&q=78&output=webp`;
}

interface Props {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function CardImage({ src, alt, priority = false, className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt={alt}
        width={768}
        height={432}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={optimized(src, 768)}
      srcSet={WIDTHS.map((w) => `${optimized(src, w)} ${w}w`).join(", ")}
      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 384px"
      alt={alt}
      width={768}
      height={432}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
