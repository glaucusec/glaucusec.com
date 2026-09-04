import { BlogIndex, type BlogSummary } from "@/components/blog-index";
import { allPosts } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on web development, web security, and building things that matter.",
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const published = allPosts
    .filter((post) => !post.archived)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  const archived = allPosts.filter((post) => post.archived);
  const summaries: BlogSummary[] = published.map((post) => ({
    slug: post.slug,
    url: post.url,
    title: post.title,
    description: post.description,
    date: post.date.toISOString(),
    tags: post.tags,
    readingTime: post.readingTime,
  }));

  return (
    <div className="blog-index-page">
      <header className="index-header blog-index-header">
        <div className="title-with-count">
          <h1>Blog</h1>
          <span>{published.length} posts</span>
        </div>
        <Link href="/rss.xml" target="_blank" className="rss-link">
          RSS
        </Link>
      </header>

      <BlogIndex posts={summaries} initialTag={tag} />

      {archived.length > 0 && (
        <section className="archived-section">
          <h2>Archived</h2>
          <p>
            Older writing that may no longer reflect the current state of the
            web.
          </p>
          <ul>
            {archived.map((post) => (
              <li key={post.slug}>
                <Link href={post.url}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
