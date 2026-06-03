import { opportunities as mockOpportunities } from "./data";
import {
  fetchPostBySlug,
  fetchPosts,
  getRichContent,
  mapPostToOpportunity,
  type WPPost,
} from "./wp";
import type { Opportunity } from "./types";

const USE_WP = Boolean(process.env.WORDPRESS_URL);

export interface OpportunitySource {
  opportunity: Opportunity;
  source: "wordpress" | "mock";
  richContent?: string;
  wpPost?: WPPost;
}

export async function listOpportunities(opts: {
  perPage?: number;
  page?: number;
  search?: string;
  type?: string;
} = {}): Promise<Opportunity[]> {
  if (USE_WP) {
    const posts = await fetchPosts({
      perPage: opts.perPage ?? 24,
      page: opts.page ?? 1,
      search: opts.search,
    });
    if (posts.length > 0) {
      const mapped = posts.map(mapPostToOpportunity);
      return opts.type ? mapped.filter((o) => o.type === opts.type) : mapped;
    }
  }
  // Fallback to mock data so the site is never empty.
  let result = mockOpportunities;
  if (opts.type) result = result.filter((o) => o.type === opts.type);
  if (opts.search) {
    const q = opts.search.toLowerCase();
    result = result.filter((o) =>
      [o.title, o.organisation, o.category, o.description, ...(o.tags ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }
  return result;
}

export async function getOpportunity(slug: string): Promise<OpportunitySource | null> {
  if (USE_WP) {
    const post = await fetchPostBySlug(slug);
    if (post) {
      return {
        opportunity: mapPostToOpportunity(post),
        source: "wordpress",
        richContent: getRichContent(post),
        wpPost: post,
      };
    }
  }
  const mock = mockOpportunities.find((o) => o.slug === slug);
  return mock ? { opportunity: mock, source: "mock" } : null;
}

export async function getRelatedOpportunitiesFor(
  slug: string,
  current: Opportunity,
  limit = 3,
): Promise<Opportunity[]> {
  const all = await listOpportunities({ perPage: 24 });
  return all
    .filter((o) => o.slug !== slug && (o.category === current.category || o.type === current.type))
    .slice(0, limit);
}
