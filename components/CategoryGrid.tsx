import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  GraduationCap,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Briefcase,
  Wallet,
  Award,
  Wrench,
  Building2,
};

const accentClasses: Record<string, { bg: string; text: string; ring: string }> = {
  brand: { bg: "bg-brand-50", text: "text-brand-700", ring: "ring-brand-100" },
  accent: { bg: "bg-accent-50", text: "text-accent-700", ring: "ring-accent-100" },
  warm: { bg: "bg-warm-50", text: "text-warm-700", ring: "ring-warm-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", ring: "ring-purple-100" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-100" },
  sky: { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-100" },
};

export function CategoryGrid() {
  return (
    <section className="container-page py-20">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            Browse by type
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
            The pathway that fits where you are right now.
          </h2>
        </div>
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 transition"
        >
          View all categories
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] ?? Briefcase;
          const tone = accentClasses[category.accent];
          return (
            <Link
              key={category.slug}
              href={`/opportunities?type=${category.slug.replace(/s$/, "")}`}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-hover"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset ${tone.bg} ${tone.ring}`}
              >
                <Icon className={`h-6 w-6 ${tone.text}`} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {category.description}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className={`inline-flex items-center gap-1 text-xs font-semibold ${tone.text}`}>
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${tone.bg.replace("bg-", "bg-").replace("-50", "-500")}`} />
                  {category.count} open
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
