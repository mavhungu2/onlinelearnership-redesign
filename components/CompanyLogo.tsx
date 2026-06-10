"use client";

import { useState } from "react";

interface Props {
  name: string;
  domain: string;
  className?: string;
}

// logo.dev free public token — grab your own at https://www.logo.dev/ for production use
const LOGO_DEV_TOKEN = process.env.NEXT_PUBLIC_LOGODEV_TOKEN || "pk_X-1ZO13GSgeOoUrIuJ6GMQ";

/**
 * Renders a company logo from logo.dev with a text fallback if loading fails.
 * Logos render at full color, with a subtle hover to brighten them.
 */
export function CompanyLogo({ name, domain, className = "" }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <span
        className={`font-display text-base font-bold text-slate-400 ${className}`}
      >
        {name}
      </span>
    );
  }

  const src = `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&format=png&size=200&retina=true`;

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={`${name} logo`}
      width={200}
      height={200}
      onError={() => setErrored(true)}
      className={`h-10 w-auto max-w-[140px] object-contain opacity-80 transition hover:opacity-100 ${className}`}
      loading="lazy"
    />
  );
}
