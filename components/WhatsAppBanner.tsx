import { ArrowRight, Bell } from "lucide-react";

export function WhatsAppBanner() {
  return (
    <section className="container-page py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-600 via-accent-500 to-emerald-700 p-8 sm:p-12">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4), transparent 35%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.25), transparent 40%)",
          }}
        />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Bell className="h-3.5 w-3.5" />
              Free instant alerts
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Never miss a deadline.
              <br />
              Get opportunities on WhatsApp.
            </h2>
            <p className="mt-3 max-w-xl text-white/90">
              Get daily, verified learnership, bursary and government job alerts straight to your
              phone. One channel, zero spam — and it&apos;s completely free.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://whatsapp.com/channel/0029Va9AWd884Om6IBS2ZY1e"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-soft transition hover:bg-emerald-50"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7 0c-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5l.3-.5c.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1.1 2.8 1.2 3 2.1 3.3 5.2 4.6c2.6 1.1 3.1.9 3.7.8.5-.1 1.7-.7 2-1.4.2-.6.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4Z" />
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.8L2 22l5.4-1.4c1.3.7 2.9 1.1 4.5 1.1h.1c5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.3c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3a8.3 8.3 0 1 1 7 3.8Z" />
                </svg>
                Join WhatsApp Channel
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <span className="inline-flex items-center justify-center text-sm text-white/80">
                Free · No spam · Unsubscribe anytime
              </span>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-64 rounded-3xl bg-white/95 p-3 shadow-2xl backdrop-blur">
              <div className="space-y-2">
                {[
                  { from: "Online Learnership", text: "🎓 NSFAS 2027 applications open — closes 30 Nov", time: "08:14" },
                  { from: "Online Learnership", text: "💼 Sasol Engineering Learnership — 80 places", time: "Today" },
                  { from: "Online Learnership", text: "📢 DPSA Circular 22 of 2026 — 312 vacancies", time: "Today" },
                ].map((m) => (
                  <div key={m.text} className="rounded-2xl bg-emerald-50 p-3 text-xs text-slate-800">
                    <p className="font-semibold text-emerald-700">{m.from}</p>
                    <p className="mt-0.5 leading-snug">{m.text}</p>
                    <p className="mt-1 text-right text-[10px] text-slate-500">{m.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
