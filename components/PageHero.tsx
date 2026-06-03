import Link from "next/link";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function PageHero({ eyebrow, title, description, breadcrumb = [] }: Props) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="container-page py-14 sm:py-20">
        {breadcrumb.length > 0 && (
          <nav className="text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-700">Home</Link>
            {breadcrumb.map((b, i) => (
              <span key={i}>
                <span className="mx-1.5">/</span>
                {b.href ? (
                  <Link href={b.href} className="hover:text-slate-700">{b.label}</Link>
                ) : (
                  <span className="text-slate-700">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-brand-700">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg text-pretty">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
