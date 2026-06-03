import Link from "next/link";

interface Props {
  className?: string;
  variant?: "default" | "dark";
}

export function Logo({ className = "", variant = "default" }: Props) {
  const isDark = variant === "dark";
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white shadow-soft ring-1 ring-slate-200 transition group-hover:ring-brand-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Online Learnership logo"
          width={40}
          height={40}
          className="h-9 w-9 object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold text-[15px] tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Online Learnership
        </span>
        <span
          className={`text-[11px] font-medium uppercase tracking-wider ${isDark ? "text-brand-300" : "text-brand-700"}`}
        >
          South Africa
        </span>
      </span>
    </Link>
  );
}
