import Link from "next/link";
import { ArrowUpRight, Calendar, GraduationCap, MapPin, Wallet } from "lucide-react";
import type { Opportunity } from "@/lib/types";
import { deadlineLabel, typeColors, typeLabels } from "@/lib/utils";

const orgGradients: Record<string, string> = {
  Sasol: "from-rose-500 to-orange-500",
  Absa: "from-red-600 to-rose-600",
  NSFAS: "from-emerald-600 to-teal-600",
  Transnet: "from-amber-500 to-orange-600",
  "Shoprite Holdings": "from-red-500 to-orange-500",
  "Department of Public Service & Administration": "from-sky-600 to-blue-700",
  Discovery: "from-amber-500 to-yellow-500",
  "MTN Foundation": "from-yellow-500 to-amber-600",
  "South African Revenue Service": "from-emerald-700 to-green-800",
  Eskom: "from-blue-600 to-indigo-700",
  "Old Mutual": "from-emerald-600 to-green-700",
  "Netcare Education": "from-blue-500 to-cyan-600",
};

function getOrgInitials(name: string): string {
  return name
    .split(/[\s&-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

interface Props {
  opportunity: Opportunity;
  variant?: "default" | "featured" | "compact";
}

export function OpportunityCard({ opportunity, variant = "default" }: Props) {
  const deadline = deadlineLabel(opportunity.closingDate);
  const gradient = orgGradients[opportunity.organisation] ?? "from-slate-600 to-slate-800";
  const initials = getOrgInitials(opportunity.organisation);

  const deadlineToneClasses =
    deadline.tone === "urgent"
      ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
      : deadline.tone === "soon"
        ? "bg-warm-50 text-warm-700 ring-1 ring-warm-300"
        : "bg-slate-100 text-slate-600 ring-1 ring-slate-200";

  if (variant === "compact") {
    return (
      <Link
        href={`/${opportunity.slug}`}
        className="group flex gap-3 rounded-xl p-3 transition hover:bg-slate-50"
      >
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-sm font-bold text-white shadow-soft`}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 group-hover:text-brand-700 transition">
            {opportunity.title}
          </p>
          <p className="mt-1 truncate text-xs text-slate-500">
            {opportunity.organisation} · {opportunity.location}
          </p>
        </div>
      </Link>
    );
  }

  const featured = variant === "featured";
  const hasImage = Boolean(opportunity.image);

  return (
    <Link
      href={`/${opportunity.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-hover ${featured ? "ring-1 ring-brand-100" : ""}`}
    >
      <div className={`relative h-44 overflow-hidden ${hasImage ? "bg-slate-100" : `bg-gradient-to-br ${gradient}`}`}>
        {hasImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={opportunity.image}
              alt={opportunity.imageAlt || opportunity.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
        )}
        <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-soft backdrop-blur">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${deadline.tone === "urgent" ? "bg-rose-500" : deadline.tone === "soon" ? "bg-warm-500" : "bg-accent-500"}`}
          />
          {deadline.text}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold shadow-soft backdrop-blur ${hasImage ? "bg-white/95 text-slate-900 ring-1 ring-white/20" : "bg-white/95 text-slate-900"}`}>
            {initials}
          </div>
          {featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-warm-500/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-soft backdrop-blur">
              <span className="inline-block h-1 w-1 rounded-full bg-white" /> Featured
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold ring-1 ring-inset ${typeColors[opportunity.type]}`}
          >
            {typeLabels[opportunity.type]}
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{opportunity.category}</span>
        </div>

        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-700 transition text-balance">
          {opportunity.title}
        </h3>

        <p className="mt-1.5 text-sm text-slate-600">{opportunity.organisation}</p>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            {opportunity.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
            {opportunity.minQualification}
          </span>
          {opportunity.stipend && (
            <span className="inline-flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-slate-400" />
              {opportunity.stipend}
            </span>
          )}
          {opportunity.duration && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {opportunity.duration}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${deadlineToneClasses}`}>
            {deadline.text}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-brand-800">
            View
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
