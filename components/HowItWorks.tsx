import { CheckCircle2, FileText, Search, Send } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Search 1 200+ verified opportunities by type, location, salary, and qualification level.",
  },
  {
    icon: FileText,
    title: "Review",
    description:
      "Read clear requirements, closing dates, stipends and step-by-step application instructions.",
  },
  {
    icon: Send,
    title: "Apply directly",
    description:
      "We link straight to the employer. No middlemen, no recruitment fees, ever.",
  },
  {
    icon: CheckCircle2,
    title: "Get hired",
    description:
      "Track deadlines, save favourites and apply with confidence to programmes that match you.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/70">
      <div className="container-page py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            How it works
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
            From browsing to hired, in four straightforward steps.
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
              >
                <div className="absolute -top-3 left-6 inline-flex h-7 items-center justify-center rounded-full bg-slate-900 px-3 text-[11px] font-bold uppercase tracking-wider text-white">
                  Step {i + 1}
                </div>
                <div className="mt-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
