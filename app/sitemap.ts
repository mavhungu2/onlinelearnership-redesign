import type { MetadataRoute } from "next";
import { listOpportunities } from "@/lib/opportunities";

const BASE_URL = "https://www.onlinelearnership.co.za";

export const revalidate = 3600; // regenerate sitemap hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const opportunities = await listOpportunities({ perPage: 100 });

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/opportunities`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const opportunityPages: MetadataRoute.Sitemap = opportunities.map((opp) => ({
    url: `${BASE_URL}/${opp.slug}`,
    lastModified: opp.postedDate ? new Date(opp.postedDate) : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...opportunityPages];
}
