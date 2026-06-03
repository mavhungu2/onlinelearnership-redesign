"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";

const primaryNav = [
  { label: "Opportunities", href: "/opportunities" },
  { label: "Learnerships", href: "/opportunities?type=learnership" },
  { label: "Internships", href: "/opportunities?type=internship" },
  { label: "Bursaries", href: "/opportunities?type=bursary" },
  { label: "Government", href: "/opportunities?type=government" },
];

const moreNav = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="hidden lg:block border-b border-slate-100">
        <div className="container-page flex h-9 items-center justify-between text-xs text-slate-500">
          <p className="flex items-center gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
            New opportunities added daily · Always free to apply
          </p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-slate-900 transition">About</Link>
            <Link href="/contact" className="hover:text-slate-900 transition">Contact</Link>
            <a
              href="https://whatsapp.com/channel/0029Va9AWd884Om6IBS2ZY1e"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent-700 hover:text-accent-800 transition"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7 0c-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5l.3-.5c.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1.1 2.8 1.2 3 2.1 3.3 5.2 4.6c2.6 1.1 3.1.9 3.7.8.5-.1 1.7-.7 2-1.4.2-.6.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4Z"/>
                <path d="M12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.8L2 22l5.4-1.4c1.3.7 2.9 1.1 4.5 1.1h.1c5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.3c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3a8.3 8.3 0 1 1 7 3.8Z"/>
              </svg>
              WhatsApp Channel
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              More
              <ChevronDown className="h-4 w-4" />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-hover">
                {moreNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/opportunities"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg p-2 text-slate-700 hover:bg-slate-100 transition"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            href="/opportunities"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-slate-800 transition"
          >
            Browse opportunities
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-3">
              {[...primaryNav, ...moreNav].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/opportunities"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-base font-semibold text-white shadow-soft hover:bg-brand-700"
              >
                Browse opportunities
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
