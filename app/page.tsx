import Link from "next/link";
import { ArrowRight, Building2, Flame } from "lucide-react";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CompanyLogo } from "@/components/CompanyLogo";
import { OpportunityCard } from "@/components/OpportunityCard";
import { WhatsAppBanner } from "@/components/WhatsAppBanner";
import { HowItWorks } from "@/components/HowItWorks";
import { AdHomepage } from "@/components/Ads";
import { sectors } from "@/lib/data";
import { listOpportunities } from "@/lib/opportunities";

const trustedEmployers = [
  { name: "Sasol", domain: "sasol.com" },
  { name: "Absa", domain: "absa.co.za" },
  { name: "Discovery", domain: "discovery.co.za" },
  { name: "MTN", domain: "mtn.com" },
  { name: "Eskom", domain: "eskom.co.za" },
  { name: "Old Mutual", domain: "oldmutual.com" },
  { name: "Transnet", domain: "transnet.net" },
  { name: "SARS", domain: "sars.gov.za" },
  { name: "Netcare", domain: "netcare.co.za" },
];

export default async function Home() {
  const opportunities = await listOpportunities({ perPage: 24 });
  const featured = (opportunities.filter((o) => o.featured).slice(0, 3).length > 0
    ? opportunities.filter((o) => o.featured).slice(0, 3)
    : opportunities.slice(0, 3));
  const latest = opportunities.slice(0, 6);
  const closingSoon = [...opportunities]
    .sort((a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime())
    .slice(0, 5);

  return (
    <>
      <Hero />

      <section className="border-b border-slate-100 bg-white py-12">
        <div className="container-page">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            Listing opportunities from South Africa&apos;s top employers
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {trustedEmployers.map((emp) => (
              <CompanyLogo key={emp.name} name={emp.name} domain={emp.domain} />
            ))}
          </div>
        </div>
      </section>

      {/* AdSense — between hero and featured */}
      <div className="container-page pt-8">
        <AdHomepage />
      </div>

      <section className="container-page py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-warm-50 px-3 py-1 text-xs font-semibold text-warm-700 ring-1 ring-warm-300">
              <Flame className="h-3.5 w-3.5" />
              Featured this week
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
              The opportunities everyone is talking about.
            </h2>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 transition"
          >
            See all opportunities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((opp) => (
            <OpportunityCard key={opp.slug} opportunity={opp} variant="featured" />
          ))}
        </div>
      </section>

      <CategoryGrid />

      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                  Latest opportunities
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance">
                  Fresh listings, just posted.
                </h2>
              </div>
              <Link
                href="/opportunities"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {latest.map((opp) => (
                <OpportunityCard key={opp.slug} opportunity={opp} />
              ))}
            </div>
          </div>

          <aside className="min-w-0 space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-slate-900">Closing soon</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700 ring-1 ring-rose-200">
                  <span className="h-1 w-1 rounded-full bg-rose-500" />
                  Urgent
                </span>
              </div>
              <div className="mt-3 divide-y divide-slate-100">
                {closingSoon.map((opp) => (
                  <OpportunityCard key={opp.slug} opportunity={opp} variant="compact" />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                Sectors hiring now
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Filter opportunities by the industry that interests you.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sectors.slice(0, 8).map((s) => (
                  <Link
                    key={s}
                    href={`/opportunities?q=${encodeURIComponent(s)}`}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 transition hover:ring-brand-300 hover:text-brand-700"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <HowItWorks />
      <WhatsAppBanner />
    </>
  );
}
