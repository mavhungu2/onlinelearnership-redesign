import { Mail, MessageSquare } from "lucide-react";
import { PageHero } from "@/components/PageHero";

// Static info page — cache for 24h
export const revalidate = 86400;

const reasons = [
  "General enquiry",
  "Submit an opportunity",
  "Advertise with us",
  "Report an issue",
  "Partnership opportunity",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you."
        description="Whether you have questions about a learnership programme, need assistance, or just want to get in touch — feel free to reach out."
        breadcrumb={[{ label: "Contact us" }]}
      />

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <form className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card sm:p-10">
            <h2 className="font-display text-2xl font-bold text-slate-900">Send us a message</h2>
            <p className="mt-1 text-sm text-slate-600">
              Your message goes straight to{" "}
              <a href="mailto:info@onlinelearnership.co.za" className="font-medium text-brand-700 hover:underline">
                info@onlinelearnership.co.za
              </a>
              . We&apos;ll get back to you as soon as we can.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="First name" required>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="Thandi"
                />
              </Field>
              <Field label="Last name" required>
                <input type="text" required className="form-input" placeholder="Dlamini" />
              </Field>
              <Field label="Email" required className="sm:col-span-2">
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="thandi@example.co.za"
                />
              </Field>
              <Field label="Mobile (optional)">
                <input type="tel" className="form-input" placeholder="+27 71 234 5678" />
              </Field>
              <Field label="Reason for contact" required>
                <select className="form-input" required defaultValue="">
                  <option value="" disabled>Select a reason…</option>
                  {reasons.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>
              <Field label="Message" required className="sm:col-span-2">
                <textarea
                  rows={5}
                  required
                  className="form-input resize-none"
                  placeholder="Tell us how we can help…"
                />
              </Field>
            </div>

            <div className="mt-6 flex items-start gap-2">
              <input id="popia" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600" />
              <label htmlFor="popia" className="text-xs text-slate-600">
                I consent to Online Learnership processing my personal information in line with the
                Protection of Personal Information Act (POPIA).
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
            >
              Send message
            </button>
          </form>

          <aside className="space-y-6">
            <ContactBlock
              icon={Mail}
              title="Email"
              lines={["info@onlinelearnership.co.za", "We aim to reply within one working day."]}
              cta={{ label: "Send an email", href: "mailto:info@onlinelearnership.co.za" }}
            />
            <ContactBlock
              icon={MessageSquare}
              title="WhatsApp channel"
              lines={[
                "Get daily opportunity alerts on WhatsApp.",
                "Free to join — no spam, just verified listings.",
              ]}
              cta={{
                label: "Join channel",
                href: "https://whatsapp.com/channel/0029Va9AWd884Om6IBS2ZY1e",
              }}
            />
            <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6">
              <h3 className="font-display font-bold text-slate-900">
                Want to list an opportunity?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Companies, training providers and government departments — email us with the
                programme details and closing date and we&apos;ll get it published.
              </p>
              <a
                href="mailto:info@onlinelearnership.co.za?subject=Submit%20an%20opportunity"
                className="mt-3 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Email us the details →
              </a>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 0.65rem 0.9rem;
          font-size: 0.875rem;
          color: rgb(15 23 42);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input:focus {
          border-color: rgb(37 99 235);
          box-shadow: 0 0 0 3px rgb(191 219 254 / 0.4);
        }
        .form-input::placeholder { color: rgb(148 163 184); }
      `}</style>
    </>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold text-slate-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function ContactBlock({
  icon: Icon,
  title,
  lines,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  cta?: { label: string; href: string };
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <div className="mt-1 space-y-0.5 text-sm text-slate-600">
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          {cta && (
            <a
              href={cta.href}
              target={cta.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="mt-2 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              {cta.label} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
