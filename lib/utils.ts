export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function daysUntil(iso: string): number {
  const target = new Date(iso).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function deadlineLabel(iso: string): { text: string; tone: "urgent" | "soon" | "ok" } {
  const days = daysUntil(iso);
  if (days <= 7) return { text: days <= 0 ? "Closed" : `Closes in ${days} day${days === 1 ? "" : "s"}`, tone: "urgent" };
  if (days <= 30) return { text: `Closes in ${days} days`, tone: "soon" };
  return { text: `Closes ${formatDate(iso)}`, tone: "ok" };
}

export function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const typeLabels: Record<string, string> = {
  learnership: "Learnership",
  internship: "Internship",
  bursary: "Bursary",
  graduate: "Graduate Programme",
  apprenticeship: "Apprenticeship",
  government: "Government Job",
};

export const typeColors: Record<string, string> = {
  learnership: "bg-brand-50 text-brand-700 ring-brand-200",
  internship: "bg-accent-50 text-accent-700 ring-accent-200",
  bursary: "bg-warm-50 text-warm-700 ring-warm-300",
  graduate: "bg-purple-50 text-purple-700 ring-purple-200",
  apprenticeship: "bg-rose-50 text-rose-700 ring-rose-200",
  government: "bg-sky-50 text-sky-700 ring-sky-200",
};
