import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { categories } from "@/lib/data";

const footerSections = [
  {
    title: "Opportunities",
    links: categories.map((c) => ({ label: c.name, href: `/opportunities?type=${c.slug.replace(/s$/, "")}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "Submit an opportunity", href: "/contact" },
      { label: "Advertise with us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms & conditions", href: "/terms" },
      { label: "Cookie policy", href: "/privacy" },
      { label: "POPIA compliance", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="inline-flex">
              <Logo variant="dark" />
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Empowering your future, one opportunity at a time. Verified learnerships,
              internships, bursaries and jobs across South Africa — updated daily.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <a
                href="mailto:info@onlinelearnership.co.za"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail className="h-4 w-4 text-slate-500" />
                info@onlinelearnership.co.za
              </a>
            </div>
            <a
              href="https://whatsapp.com/channel/0029Va9AWd884Om6IBS2ZY1e"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-accent-600"
            >
              Join our WhatsApp channel
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page flex flex-col-reverse items-start gap-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Online Learnership. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span>Built with care for South African youth</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
