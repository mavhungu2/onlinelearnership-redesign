export default function Loading() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="container-page relative py-12 lg:py-16">
          <div className="h-3 w-40 animate-pulse rounded bg-white/10" />
          <div className="mt-6 flex gap-2">
            <div className="h-5 w-20 animate-pulse rounded-full bg-white/10" />
            <div className="h-5 w-24 animate-pulse rounded-full bg-white/10" />
          </div>
          <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-white/10" />
          <div className="mt-2 h-10 w-1/2 animate-pulse rounded bg-white/10" />
          <div className="mt-6 flex items-center gap-3">
            <div className="h-12 w-12 animate-pulse rounded-xl bg-white/10" />
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="space-y-4">
            <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-slate-100" />
            <div className="mt-8 h-6 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
          </article>
          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
              <div className="mt-2 h-8 w-32 animate-pulse rounded bg-slate-200" />
              <div className="mt-6 h-11 w-full animate-pulse rounded-xl bg-slate-200" />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="h-9 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-9 animate-pulse rounded-xl bg-slate-100" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
              <div className="mt-3 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-full animate-pulse rounded bg-slate-100"
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
