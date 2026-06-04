import Link from "next/link";
import { ChevronDown, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { Fragment } from "react";
import { OpportunityCard } from "@/components/OpportunityCard";
import { AdInFeed, AdSidebar } from "@/components/Ads";
import { categories, sectors } from "@/lib/data";
import { listOpportunities } from "@/lib/opportunities";
import type { Opportunity } from "@/lib/types";
import { typeLabels } from "@/lib/utils";

const provinces = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Nationwide",
];

interface SearchParams {
  type?: string;
  q?: string;
  location?: string;
}

function applyLocationFilter(items: Opportunity[], location?: string) {
  if (!location) return items;
  return items.filter((o) => o.location === location);
}

export default async function OpportunitiesPage(props: PageProps<"/opportunities">) {
  const searchParams = (await props.searchParams) as SearchParams;
  const all = await listOpportunities({ perPage: 48, type: searchParams.type, search: searchParams.q });
  const filtered = applyLocationFilter(all, searchParams.location);
  const totalCount = all.length;
  const activeType = searchParams.type;
  const activeLocation = searchParams.location;
  const activeQ = searchParams.q;

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-page py-12 sm:py-16">
          <nav className="text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-700">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-700">Opportunities</span>
          </nav>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl text-balance">
            {activeType ? `${typeLabels[activeType] ?? "All"} opportunities` : "All opportunities"}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Browse verified opportunities across South Africa. Use the filters
            to narrow by type, province, or qualification level.
          </p>

          <form
            action="/opportunities"
            method="get"
            className="mt-8 grid gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-card sm:grid-cols-[1fr_auto_auto] sm:items-center"
          >
            {activeType && <input type="hidden" name="type" value={activeType} />}
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                name="q"
                defaultValue={activeQ}
                placeholder="Search by keyword, organisation, sector…"
                className="w-full rounded-xl px-11 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-slate-50"
              />
            </div>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                name="location"
                defaultValue={activeLocation ?? ""}
                className="w-full appearance-none rounded-xl bg-slate-50 px-10 py-3 text-sm font-medium text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-brand-200 sm:min-w-[180px]"
              >
                <option value="">All provinces</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Apply filters
            </button>
          </form>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Filters
                </h2>
              </div>

              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Type</h3>
                <ul className="mt-3 space-y-1">
                  <li>
                    <Link
                      href={`/opportunities${activeQ ? `?q=${encodeURIComponent(activeQ)}` : ""}`}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium ${!activeType ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      All types · {totalCount}
                    </Link>
                  </li>
                  {categories.map((c) => {
                    const slug = c.slug.replace(/s$/, "");
                    const isActive = activeType === slug;
                    return (
                      <li key={c.slug}>
                        <Link
                          href={`/opportunities?type=${slug}${activeQ ? `&q=${encodeURIComponent(activeQ)}` : ""}`}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"}`}
                        >
                          <span>{c.name}</span>
                          <span className={`text-xs ${isActive ? "text-brand-700" : "text-slate-400"}`}>{c.count}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Sector</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {sectors.map((s) => (
                    <Link
                      key={s}
                      href={`/opportunities?q=${encodeURIComponent(s)}`}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-brand-100 hover:text-brand-700 transition"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Qualification</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {["Grade 12 / Matric", "Certificate", "Diploma", "Degree", "Postgraduate"].map((q) => (
                    <li key={q} className="flex items-center gap-2">
                      <input
                        id={`qual-${q}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <label htmlFor={`qual-${q}`} className="cursor-pointer">{q}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-col items-start justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
                {totalCount} opportunities
              </p>
              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="sort" className="text-slate-500">Sort by</label>
                <div className="relative">
                  <select
                    id="sort"
                    defaultValue="newest"
                    className="appearance-none rounded-lg bg-slate-100 px-3 py-1.5 pr-8 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-brand-200"
                  >
                    <option value="newest">Newest first</option>
                    <option value="closing">Closing soonest</option>
                    <option value="stipend">Highest stipend</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="font-display text-lg font-semibold text-slate-900">
                  No opportunities matched your search.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Try clearing some filters or browse all opportunities.
                </p>
                <Link
                  href="/opportunities"
                  className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  View all opportunities
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {filtered.map((opp, i) => (
                    <Fragment key={opp.slug}>
                      <OpportunityCard opportunity={opp} />
                      {/* Inline ad every 8 cards (after positions 8, 16, 24...) — full row span */}
                      {(i + 1) % 8 === 0 && i < filtered.length - 1 && (
                        <div className="sm:col-span-2">
                          <AdInFeed />
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
                {/* Bottom-of-list ad */}
                {filtered.length > 4 && (
                  <div className="mt-10">
                    <AdSidebar />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
