import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Bookmark,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  Share2,
  Wallet,
} from "lucide-react";
import type { Metadata } from "next";
import { OpportunityCard } from "@/components/OpportunityCard";
import { AdInArticle, AdSidebar } from "@/components/Ads";
import { getOpportunity, getRelatedOpportunitiesFor } from "@/lib/opportunities";
import { deadlineLabel, formatDate, typeColors, typeLabels } from "@/lib/utils";

export async function generateMetadata(
  props: PageProps<"/opportunities/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const data = await getOpportunity(slug);
  if (!data) return { title: "Opportunity not found" };
  return {
    title: data.opportunity.title,
    description: data.opportunity.description.slice(0, 160),
  };
}

export default async function OpportunityDetail(
  props: PageProps<"/opportunities/[slug]">,
) {
  const { slug } = await props.params;
  const data = await getOpportunity(slug);
  if (!data) notFound();
  const { opportunity: opp, richContent } = data;
  const related = await getRelatedOpportunitiesFor(slug, opp);
  const deadline = deadlineLabel(opp.closingDate);

  const orgInitials = opp.organisation
    .split(/[\s&-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const hasStructuredBody =
    opp.requirements.length > 0 || opp.responsibilities.length > 0;

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, rgba(37,99,235,0.5), transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(16,185,129,0.25), transparent 60%)",
          }}
        />
        <div className="container-page relative py-12 lg:py-16">
          <nav className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/opportunities" className="hover:text-white">Opportunities</Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-300">{typeLabels[opp.type]}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold ring-1 ring-inset ${typeColors[opp.type]}`}
            >
              {typeLabels[opp.type]}
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-medium text-slate-200 ring-1 ring-white/10">
              {opp.category}
            </span>
            {opp.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-warm-500/90 px-2.5 py-0.5 font-bold uppercase tracking-wider text-white">
                Featured
              </span>
            )}
          </div>

          <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
            {opp.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-base font-bold text-white ring-1 ring-white/20 backdrop-blur">
                {orgInitials}
              </div>
              <div>
                <p className="text-base font-semibold text-white">{opp.organisation}</p>
                <p className="text-xs text-slate-400">Posted {formatDate(opp.postedDate)}</p>
              </div>
            </div>
            <div className="hidden h-8 w-px bg-white/10 sm:block" />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-slate-400" />
                {opp.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-400" />
                {deadline.text}
              </span>
              {opp.stipend && (
                <span className="inline-flex items-center gap-1.5">
                  <Wallet className="h-4 w-4 text-slate-400" />
                  {opp.stipend}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="min-w-0">
            {hasStructuredBody ? (
              <>
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900">About this opportunity</h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-700">{opp.description}</p>
                </div>

                {opp.requirements.length > 0 && (
                  <Section title="Who can apply">
                    <ul className="space-y-3">
                      {opp.requirements.map((r, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}

                {opp.responsibilities.length > 0 && (
                  <Section title="What you'll do">
                    <ul className="space-y-3">
                      {opp.responsibilities.map((r, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-700">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}

                <Section title="How to apply">
                  <ol className="space-y-4">
                    {opp.howToApply.map((r, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-sm text-slate-700 leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              </>
            ) : richContent ? (
              (() => {
                // Split the rich content on the first separator so we can insert an ad mid-article.
                const sepIdx = richContent.indexOf('<hr class="wp-block-separator');
                const splitPoint = sepIdx > 0 ? sepIdx : richContent.length;
                const beforeAd = richContent.slice(0, splitPoint);
                const afterAd = richContent.slice(splitPoint);
                return (
                  <>
                    <div
                      className="wp-content prose-content"
                      dangerouslySetInnerHTML={{ __html: beforeAd }}
                    />
                    {afterAd && (
                      <div className="my-8">
                        <AdInArticle />
                      </div>
                    )}
                    {afterAd && (
                      <div
                        className="wp-content prose-content"
                        dangerouslySetInnerHTML={{ __html: afterAd }}
                      />
                    )}
                  </>
                );
              })()
            ) : (
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900">About this opportunity</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{opp.description}</p>
              </div>
            )}

            {opp.tags && opp.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tags</span>
                {opp.tags.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Closing date</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900">
                {formatDate(opp.closingDate)}
              </p>
              <p className={`mt-1 inline-flex items-center gap-1.5 text-sm font-medium ${deadline.tone === "urgent" ? "text-rose-600" : deadline.tone === "soon" ? "text-warm-700" : "text-accent-700"}`}>
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${deadline.tone === "urgent" ? "bg-rose-500" : deadline.tone === "soon" ? "bg-warm-500" : "bg-accent-500"}`} />
                {deadline.text}
              </p>

              {(() => {
                const url = opp.applyUrl;
                if (!url) return null;
                let host = "";
                try { host = new URL(url).host.replace(/^www\./, ""); } catch { /* no-op */ }
                const isExternal = host && !host.endsWith("onlinelearnership.co.za");
                return (
                  <>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-accent-600"
                    >
                      {isExternal ? `Apply on ${host}` : "Read full application guide"}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <p className="mt-2 text-center text-[11px] text-slate-500">
                      {isExternal
                        ? "Opens the employer's official application portal in a new tab."
                        : "Opens the full guide on onlinelearnership.co.za."}
                    </p>
                  </>
                );
              })()}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                  <Bookmark className="h-3.5 w-3.5" />
                  Save
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Key facts</h3>
              <dl className="mt-3 divide-y divide-slate-100 text-sm">
                <Fact icon={Building2} label="Employer" value={opp.organisation} />
                <Fact icon={MapPin} label="Location" value={opp.location} />
                <Fact icon={GraduationCap} label="Min. qualification" value={opp.minQualification} />
                {opp.stipend && <Fact icon={Wallet} label="Stipend" value={opp.stipend} />}
                {opp.duration && <Fact icon={Calendar} label="Duration" value={opp.duration} />}
              </dl>
            </div>

            <AdSidebar />

            <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6">
              <h3 className="font-display font-bold text-slate-900">Don&apos;t miss out</h3>
              <p className="mt-1 text-sm text-slate-600">
                Get a daily WhatsApp digest of fresh opportunities like this one.
              </p>
              <a
                href="https://whatsapp.com/channel/0029Va9AWd884Om6IBS2ZY1e"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Join the channel
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50/60">
          <div className="container-page py-16">
            <h2 className="font-display text-2xl font-bold text-slate-900">Related opportunities</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((opp) => (
                <OpportunityCard key={opp.slug} opportunity={opp} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <div className="min-w-0 flex-1">
        <dt className="text-xs text-slate-500">{label}</dt>
        <dd className="text-sm font-semibold text-slate-900">{value}</dd>
      </div>
    </div>
  );
}
