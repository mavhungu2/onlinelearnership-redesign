import Link from "next/link";
import { Compass, GraduationCap, Shield, Sparkles, Target, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";

// Static info page — cache for 24h
export const revalidate = 86400;

const values = [
  {
    icon: Shield,
    title: "Aggregated and verified",
    description:
      "We pull current information from companies, government departments and training institutions into one trusted, central place.",
  },
  {
    icon: Users,
    title: "For students, graduates & job seekers",
    description:
      "Whether you&apos;re finishing matric, walking out with your degree, or looking for your next role — there&apos;s something here for you.",
  },
  {
    icon: Compass,
    title: "Smarter career choices",
    description:
      "We make it easy to stay informed, compare opportunities, and choose the right next step for your career.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Empowering your future, one opportunity at a time."
        description="Online Learnership connects learners and job seekers with educational and career opportunities across South Africa — learnerships, internships, bursaries and jobs, all in one place."
        breadcrumb={[{ label: "About us" }]}
      />

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <Target className="h-3.5 w-3.5" />
              What we do
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance">
              One trusted place for South African opportunities.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Online Learnership aggregates current information about learnerships,
              internships, bursaries and job opportunities from companies, government
              departments and training institutions across South Africa.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              We believe education and work experience are the keys to success. Our role is to
              put real, up-to-date opportunities within reach so you can build skills, gain
              experience and grow your career.
            </p>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
              <GraduationCap className="h-3.5 w-3.5" />
              Who we&apos;re for
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Students, graduates and job seekers across South Africa.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Whether you&apos;re a student weighing up your next step, a recent graduate looking
              for workplace experience, or a job seeker hunting for the right opportunity — we
              help you stay informed and make smarter career choices.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Every listing links straight to the source — no middlemen, no application fees, no
              guesswork.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/70">
        <div className="container-page py-16 lg:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-warm-50 px-3 py-1 text-xs font-semibold text-warm-700 ring-1 ring-warm-300">
              <Sparkles className="h-3.5 w-3.5" />
              How we help
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Three things you can count on.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{v.title}</h3>
                  <p
                    className="mt-2 text-sm leading-relaxed text-slate-600"
                    dangerouslySetInnerHTML={{ __html: v.description }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-3xl bg-slate-950 p-10 text-white sm:p-16">
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Got an opportunity to share? Get in touch.
          </h2>
          <p className="mt-4 max-w-xl text-slate-300">
            Employers, NGOs and training providers — we&apos;d love to hear about your programme.
            Reach us at{" "}
            <a href="mailto:info@onlinelearnership.co.za" className="text-accent-300 hover:text-accent-200 underline">
              info@onlinelearnership.co.za
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600 transition"
            >
              Get in touch
            </Link>
            <Link
              href="/opportunities"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition"
            >
              Browse current listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
