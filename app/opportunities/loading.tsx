import { SkeletonCard } from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-page py-12 sm:py-16">
          <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-10 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
          <div className="mt-8 h-14 w-full animate-pulse rounded-2xl bg-white shadow-card" />
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-full animate-pulse rounded-lg bg-slate-100"
                />
              ))}
            </div>
          </aside>
          <div>
            <div className="flex justify-between border-b border-slate-200 pb-4">
              <div className="h-4 w-48 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
