import { getBaseUrl } from "@/lib/utils";
import { allPosts } from "content-collections";

const baseUrl = getBaseUrl();

export default async function sitemap() {
  // Content links from non-archived blogs only
  const postLinks = allPosts
    .filter((post) => !post.archived)
    .map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: post.lastUpdated || post.date,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // Static page links
  const pageLinks = ["", "/projects", "/blogs"].map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: url === "" ? 1.0 : 0.6,
  }));

  return [...pageLinks, ...postLinks];
}
