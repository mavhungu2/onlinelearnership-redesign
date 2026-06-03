export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="h-44 animate-pulse bg-slate-200" />
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200" />
          <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="h-3 animate-pulse rounded bg-slate-100" />
          <div className="h-3 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="h-5 w-28 animate-pulse rounded-full bg-slate-100" />
          <div className="h-4 w-10 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
