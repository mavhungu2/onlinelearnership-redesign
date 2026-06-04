import type { Opportunity, OpportunityType, Qualification, SAProvince } from "./types";

const WP_URL = process.env.WORDPRESS_URL ?? "https://www.onlinelearnership.co.za";
const REVALIDATE = Number(process.env.WORDPRESS_REVALIDATE_SECONDS ?? 300);

// ---------- WordPress REST API types ----------

interface Rendered {
  rendered: string;
  protected?: boolean;
}

interface WPMediaSize {
  source_url: string;
  width: number;
  height: number;
}

interface WPMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, WPMediaSize>;
  };
}

interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: "category" | "post_tag";
}

interface WPACFFields {
  closing_date?: string;
  posted_date?: string;
  stipend?: string;
  duration?: string;
  location?: string;
  organisation?: string;
  organisation_logo?: string;
  min_qualification?: string;
  opportunity_type?: OpportunityType;
  apply_url?: string;
  requirements?: string;
  responsibilities?: string;
  how_to_apply?: string;
  featured?: boolean;
}

export interface WPPost {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: Rendered;
  excerpt: Rendered;
  content: Rendered;
  featured_media: number;
  categories: number[];
  tags: number[];
  sticky?: boolean;
  acf?: WPACFFields;
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

// ---------- Fetch helpers ----------

// Module-level in-memory cache. Next.js's data cache rejects payloads >2MB,
// which is exactly the size of the WP posts response, so we cache it ourselves.
const memCache = new Map<string, { value: unknown; expires: number }>();
const inflight = new Map<string, Promise<unknown>>();

async function wpFetch<T>(path: string): Promise<T | null> {
  const url = `${WP_URL}/wp-json/wp/v2/${path}`;
  const now = Date.now();

  // 1. Cache hit
  const cached = memCache.get(url);
  if (cached && cached.expires > now) return cached.value as T;

  // 2. De-dupe concurrent requests for the same URL
  const pending = inflight.get(url);
  if (pending) return pending as Promise<T | null>;

  const promise = (async () => {
    try {
      const res = await fetch(url, {
        // Disable Next.js data cache — we manage caching ourselves
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        console.warn(`[wp] ${res.status} ${url}`);
        return null;
      }
      const value = (await res.json()) as T;
      memCache.set(url, { value, expires: now + REVALIDATE * 1000 });
      return value;
    } catch (err) {
      console.warn(`[wp] fetch failed ${url}`, err);
      return null;
    } finally {
      inflight.delete(url);
    }
  })();

  inflight.set(url, promise);
  return promise;
}

// Allow on-demand cache busting (call from a route handler if you want instant updates)
export function clearWpCache() {
  memCache.clear();
}

interface FetchPostsOptions {
  perPage?: number;
  page?: number;
  search?: string;
  categorySlug?: string;
  exclude?: number[];
}

// Slim field list for cards — excludes the full HTML content (which is 100KB+/post)
const LIST_FIELDS =
  "id,slug,link,date,modified,title,excerpt,featured_media,categories,tags,sticky,acf,_links";

export async function fetchPosts(opts: FetchPostsOptions = {}): Promise<WPPost[]> {
  const params = new URLSearchParams({
    per_page: String(opts.perPage ?? 12),
    page: String(opts.page ?? 1),
    // Only embed featured media — wp:term adds ~30KB/post for tag/cat metadata we mostly don't use in lists
    _embed: "wp:featuredmedia",
    _fields: LIST_FIELDS,
  });
  if (opts.search) params.set("search", opts.search);
  if (opts.exclude?.length) params.set("exclude", opts.exclude.join(","));

  let categoryId: number | undefined;
  if (opts.categorySlug) {
    const cats = await wpFetch<WPTerm[]>(`categories?slug=${encodeURIComponent(opts.categorySlug)}`);
    categoryId = cats?.[0]?.id;
    if (categoryId) params.set("categories", String(categoryId));
  }

  const posts = await wpFetch<WPPost[]>(`posts?${params.toString()}`);
  // The list fetch doesn't include `content`; add a stub so mapping doesn't crash.
  return (posts ?? []).map((p) => ({ ...p, content: p.content ?? { rendered: "" } }));
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>(
    `posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia,wp:term`,
  );
  return posts?.[0] ?? null;
}

export async function fetchCategories(): Promise<WPTerm[]> {
  const cats = await wpFetch<WPTerm[]>("categories?per_page=100&orderby=count&order=desc");
  return cats ?? [];
}

// ---------- Mapping WP → Opportunity ----------

const TYPE_FROM_CATEGORY: Record<string, OpportunityType> = {
  // Plain
  learnerships: "learnership",
  learnership: "learnership",
  internships: "internship",
  internship: "internship",
  bursaries: "bursary",
  bursary: "bursary",
  "graduate-programme": "graduate",
  "graduate-programmes": "graduate",
  graduate: "graduate",
  apprenticeships: "apprenticeship",
  apprenticeship: "apprenticeship",
  "government-jobs": "government",
  government: "government",
  // Live WP category slugs from onlinelearnership.co.za
  "learnerships-programme-2026": "learnership",
  "learnerships-programme-2025": "learnership",
  "internships-programme": "internship",
  "internship-programme-2026": "internship",
  "apprenticeships-2026": "apprenticeship",
  "training-program": "learnership",
  "training-2026": "learnership",
};

const TYPE_FROM_KEYWORDS: { pattern: RegExp; type: OpportunityType }[] = [
  { pattern: /\b(learnership|seta)\b/i, type: "learnership" },
  { pattern: /\b(intern(ship)?|trainee(ship)?)\b/i, type: "internship" },
  { pattern: /\b(bursar(y|ies)|scholarship|nsfas)\b/i, type: "bursary" },
  { pattern: /\b(graduate|gradu8|grad programme)\b/i, type: "graduate" },
  { pattern: /\b(apprentice(ship)?|artisan)\b/i, type: "apprenticeship" },
  { pattern: /\b(dpsa|government|department of|public service)\b/i, type: "government" },
];

const PROVINCE_PATTERNS: { pattern: RegExp; province: SAProvince }[] = [
  { pattern: /\b(gauteng|johannesburg|joburg|pretoria|sandton|midrand|centurion)\b/i, province: "Gauteng" },
  { pattern: /\b(western cape|cape town|stellenbosch|paarl|bellville)\b/i, province: "Western Cape" },
  { pattern: /\b(kwazulu[- ]?natal|kzn|durban|pinetown|umhlanga|pietermaritzburg)\b/i, province: "KwaZulu-Natal" },
  { pattern: /\b(eastern cape|port elizabeth|gqeberha|east london|mthatha)\b/i, province: "Eastern Cape" },
  { pattern: /\b(free state|bloemfontein|welkom)\b/i, province: "Free State" },
  { pattern: /\b(limpopo|polokwane|tzaneen)\b/i, province: "Limpopo" },
  { pattern: /\b(mpumalanga|nelspruit|mbombela|witbank|emalahleni|secunda)\b/i, province: "Mpumalanga" },
  { pattern: /\b(north west|rustenburg|mafikeng|mahikeng)\b/i, province: "North West" },
  { pattern: /\b(northern cape|kimberley|upington)\b/i, province: "Northern Cape" },
  { pattern: /\b(nationwide|all provinces|across south africa)\b/i, province: "Nationwide" },
];

const QUALIFICATION_PATTERNS: { pattern: RegExp; qualification: Qualification }[] = [
  { pattern: /\b(postgraduate|honours|masters|m\.?sc|phd)\b/i, qualification: "Postgraduate" },
  { pattern: /\b(degree|bachelor|b\.?com|b\.?sc|llb)\b/i, qualification: "Degree" },
  { pattern: /\b(diploma|national diploma|nqf 6)\b/i, qualification: "Diploma" },
  { pattern: /\b(certificate|higher certificate|nqf 5)\b/i, qualification: "Certificate" },
  { pattern: /\b(matric|grade 12|nsc)\b/i, qualification: "Grade 12 / Matric" },
  { pattern: /\b(grade 11)\b/i, qualification: "Grade 11" },
  { pattern: /\b(grade 10)\b/i, qualification: "Grade 10" },
];

function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(html: string): string {
  return decodeHtml(html.replace(/<[^>]*>/g, "")).trim();
}

function extractFirst<T>(text: string, patterns: { pattern: RegExp; value: T }[], fallback: T): T {
  for (const { pattern, value } of patterns) {
    if (pattern.test(text)) return value;
  }
  return fallback;
}

function deriveType(post: WPPost): OpportunityType {
  if (post.acf?.opportunity_type) return post.acf.opportunity_type;

  const terms = post._embedded?.["wp:term"]?.flat() ?? [];
  for (const term of terms) {
    if (term.taxonomy !== "category") continue;
    const mapped = TYPE_FROM_CATEGORY[term.slug.toLowerCase()];
    if (mapped) return mapped;
  }

  const haystack = `${post.title.rendered} ${post.excerpt.rendered}`;
  return extractFirst(
    haystack,
    TYPE_FROM_KEYWORDS.map(({ pattern, type }) => ({ pattern, value: type })),
    "learnership",
  );
}

const TYPE_LABELS_FALLBACK: Record<OpportunityType, string> = {
  learnership: "Learnership Programme",
  internship: "Internship Programme",
  bursary: "Bursary",
  graduate: "Graduate Programme",
  apprenticeship: "Apprenticeship",
  government: "Government Job",
};

function deriveCategoryLabel(post: WPPost, type: OpportunityType): string {
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];
  const cat = terms.find((t) => t.taxonomy === "category");
  if (cat) return decodeHtml(cat.name);
  // No embedded terms — fall back to a label derived from the inferred type
  return TYPE_LABELS_FALLBACK[type];
}

function deriveOrganisation(post: WPPost): string {
  if (post.acf?.organisation) return post.acf.organisation;
  // Try to extract from title — first 1-3 words before common job-board keywords
  const title = decodeHtml(post.title.rendered);
  const match = title.match(
    /^([A-Z][\w&.-]*(?:\s+(?:of|for|and|&|the)?\s*[A-Z][\w&.-]*){0,3})\s+(?:Internship|Learnership|Bursary|Apprenticeship|Graduate|Programme|Program|Vacancies|Vacancy|Jobs)/i,
  );
  return match?.[1]?.trim() ?? title.split(/[:—-]/)[0].trim();
}

function deriveLocation(post: WPPost): SAProvince {
  if (post.acf?.location) return post.acf.location as SAProvince;
  const haystack = stripHtml(`${post.title.rendered} ${post.excerpt.rendered}`);
  return extractFirst(
    haystack,
    PROVINCE_PATTERNS.map(({ pattern, province }) => ({ pattern, value: province })),
    "Nationwide",
  );
}

function deriveQualification(post: WPPost): Qualification {
  if (post.acf?.min_qualification) return post.acf.min_qualification as Qualification;
  const haystack = stripHtml(`${post.title.rendered} ${post.excerpt.rendered}`);
  return extractFirst(
    haystack,
    QUALIFICATION_PATTERNS.map(({ pattern, qualification }) => ({ pattern, value: qualification })),
    "Grade 12 / Matric",
  );
}

function deriveClosingDate(post: WPPost): string {
  if (post.acf?.closing_date) return post.acf.closing_date;
  // Try to parse "closes 31 July 2026" patterns
  const text = stripHtml(`${post.title.rendered} ${post.excerpt.rendered} ${post.content.rendered}`);
  const dateMatch = text.match(
    /(?:closes?|deadline|apply (?:by|before))[\s:]*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/i,
  );
  if (dateMatch) {
    const [, day, month, year] = dateMatch;
    const parsed = new Date(`${day} ${month} ${year}`);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  }
  // Fallback: 60 days from post date
  const posted = new Date(post.date);
  posted.setDate(posted.getDate() + 60);
  return posted.toISOString().slice(0, 10);
}

function splitToList(text: string): string[] {
  return text
    .split(/\r?\n|·|•|;/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);
}

function deriveRequirements(post: WPPost): string[] {
  if (post.acf?.requirements) return splitToList(post.acf.requirements);
  // Try to find a "Requirements" section in content
  const match = post.content.rendered.match(
    /<(?:h2|h3|h4|strong)[^>]*>\s*(?:Requirements?|Who Can Apply|Eligibility)\s*<\/[^>]+>([\s\S]*?)(?=<h2|<h3|<h4|$)/i,
  );
  if (match) return splitToList(stripHtml(match[1])).slice(0, 8);
  return [];
}

function deriveHowToApply(post: WPPost): string[] {
  if (post.acf?.how_to_apply) return splitToList(post.acf.how_to_apply);
  const match = post.content.rendered.match(
    /<(?:h2|h3|h4|strong)[^>]*>\s*(?:How to Apply|Apply|Application Process)\s*<\/[^>]+>([\s\S]*?)(?=<h2|<h3|<h4|$)/i,
  );
  if (match) return splitToList(stripHtml(match[1])).slice(0, 8);
  return [`Click "Apply now" to view the full application details on ${decodeHtml(post.title.rendered)}.`];
}

function deriveApplyUrl(post: WPPost): string {
  // 1. Explicit ACF field wins.
  if (post.acf?.apply_url) return post.acf.apply_url;

  const html = post.content.rendered;
  const ownHosts = [
    "onlinelearnership.co.za",
    "www.onlinelearnership.co.za",
    "wp.onlinelearnership.co.za",
  ];

  // Find every external <a href> with anchor text — collect candidates.
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const candidates: { url: string; text: string; score: number }[] = [];
  for (const m of html.matchAll(linkRegex)) {
    const url = m[1];
    const text = stripHtml(m[2]).toLowerCase();
    let host: string;
    try {
      host = new URL(url, "https://www.onlinelearnership.co.za").host.toLowerCase();
    } catch {
      continue;
    }
    if (ownHosts.includes(host)) continue; // skip self-links
    if (!/^https?:/.test(url)) continue;

    // Score by anchor text keywords + URL hints.
    let score = 0;
    if (/\bapply\b/.test(text)) score += 5;
    if (/recruitment|application portal|careers? portal|official platform/.test(text)) score += 4;
    if (/click here|apply now|apply here|submit/.test(text)) score += 3;
    if (/portal|platform|website/.test(text)) score += 1;
    if (/careers?\b|jobs?\b|vacanc/.test(host)) score += 3;
    if (/\.(gov|edu)/.test(host)) score += 2;
    if (/simplify\.hr|workable|greenhouse|lever|smartrecruiters|successfactors|sapsf|taleo/.test(host)) score += 4;

    // Penalty: generic category/blog links that just say e.g. "Funding Bursaries"
    if (/bursar|opportunit|programme|courses?/.test(text) && score === 0) continue;

    candidates.push({ url, text, score });
  }

  // Highest-scoring candidate wins.
  candidates.sort((a, b) => b.score - a.score);
  if (candidates.length > 0 && candidates[0].score >= 3) {
    return candidates[0].url;
  }

  // Fallback: link back to the WP post so the user can read the full guide there.
  return post.link;
}

function deriveResponsibilities(post: WPPost): string[] {
  if (post.acf?.responsibilities) return splitToList(post.acf.responsibilities);
  const match = post.content.rendered.match(
    /<(?:h2|h3|h4|strong)[^>]*>\s*(?:Responsibilities|Duties|Role|What You.{1,5}ll Do)\s*<\/[^>]+>([\s\S]*?)(?=<h2|<h3|<h4|$)/i,
  );
  if (match) return splitToList(stripHtml(match[1])).slice(0, 8);
  return [];
}

function deriveTags(post: WPPost): string[] {
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];
  return terms
    .filter((t) => t.taxonomy === "post_tag")
    .slice(0, 6)
    .map((t) => decodeHtml(t.name));
}

function deriveImage(post: WPPost): { url?: string; alt?: string } {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return {};
  // Prefer "medium_large" (768px) for cards — good balance of quality vs. weight
  const sizes = media.media_details?.sizes;
  const url =
    sizes?.medium_large?.source_url ??
    sizes?.large?.source_url ??
    sizes?.medium?.source_url ??
    media.source_url;
  return { url, alt: media.alt_text || undefined };
}

export function mapPostToOpportunity(post: WPPost): Opportunity {
  const { url: image, alt: imageAlt } = deriveImage(post);
  const type = deriveType(post);
  return {
    slug: post.slug,
    title: decodeHtml(post.title.rendered),
    organisation: deriveOrganisation(post),
    image,
    imageAlt,
    type,
    category: deriveCategoryLabel(post, type),
    location: deriveLocation(post),
    stipend: post.acf?.stipend,
    duration: post.acf?.duration,
    closingDate: deriveClosingDate(post),
    postedDate: post.date.slice(0, 10),
    minQualification: deriveQualification(post),
    description: stripHtml(post.excerpt.rendered).slice(0, 600),
    requirements: deriveRequirements(post),
    responsibilities: deriveResponsibilities(post),
    howToApply: deriveHowToApply(post),
    applyUrl: deriveApplyUrl(post),
    featured: post.acf?.featured ?? post.sticky ?? false,
    tags: deriveTags(post),
  };
}

// Returns the raw HTML content for rich rendering on detail pages
export function getRichContent(post: WPPost): string {
  return post.content.rendered;
}
