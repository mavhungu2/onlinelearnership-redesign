import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { stats } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(37,99,235,0.4), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(16,185,129,0.25), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-page relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brand-200 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            14 new opportunities added today
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Find your next{" "}
            <span className="relative inline-block">
              <span className="relative bg-gradient-to-r from-accent-300 via-accent-400 to-brand-300 bg-clip-text text-transparent">
                opportunity
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 10 Q 75 2 150 6 T 298 4"
                  stroke="url(#g)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="300" y2="0">
                    <stop offset="0" stopColor="#34d399" />
                    <stop offset="1" stopColor="#93c5fd" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br className="hidden sm:block" />
            in South Africa.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 text-pretty">
            Verified learnerships, internships, bursaries and graduate programmes —
            updated daily. No fees. No spam. Just real opportunities for South African youth.
          </p>

          <form
            action="/opportunities"
            method="get"
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 rounded-2xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur-md sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                name="q"
                placeholder="Try 'engineering learnership in Gauteng'"
                className="w-full rounded-xl bg-white px-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-accent-600"
            >
              Search
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-slate-400">
            <span>Popular:</span>
            {["NSFAS 2027", "Sasol learnership", "DPSA circular", "MTN bursary", "Discovery internship"].map(
              (term) => (
                <Link
                  key={term}
                  href={`/opportunities?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  {term}
                </Link>
              ),
            )}
          </div>
        </div>

        <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur"
            >
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {stat.label}
              </dt>
              <dd className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
