import { PostCard } from "@/components/post-card";
import { getPostColors } from "@/lib/colors";
import { allPosts } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs - Abhishek Baiju",
  description:
    "Thoughts on web development, web security, and building things that matter",
};

interface BlogsPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { tag: selectedTag } = await searchParams;

  // Get all blogs sorted by date
  const sortedPosts = allPosts.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  // Add consistent colors based on date-determined index
  const postsWithColors = sortedPosts.map((post) => {
    const colors = getPostColors(post.slug);
    return {
      ...post,
      color: colors.bg,
      borderColor: colors.border,
    };
  });

  // Get all unique tags sorted by frequency
  const tagCounts = allPosts
    .flatMap((post) => post.tags)
    .reduce((counts, tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

  const allTags = Object.keys(tagCounts).sort((a, b) => {
    // Sort by frequency (descending), then alphabetically for ties
    const countDiff = tagCounts[b] - tagCounts[a];
    return countDiff !== 0 ? countDiff : a.localeCompare(b);
  });

  // Filter blogs by tag and archived status
  const filteredPosts = postsWithColors.filter((post) => {
    if (selectedTag && !post.tags.includes(selectedTag)) {
      return false;
    }
    return !post.archived;
  });

  const archivedPosts = postsWithColors.filter((post) => post.archived);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Blogs
          </h1>
          <Link
            href="/rss.xml"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md hover:bg-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
            </svg>
            RSS
          </Link>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Thoughts on web development, web security, and building things that
          matter
        </p>
      </header>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={
                selectedTag === tag
                  ? "/blogs"
                  : `/blogs?tag=${encodeURIComponent(tag)}`
              }
              className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedTag === tag
                  ? "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border"
              }`}
            >
              #{tag.toLowerCase()} ({tagCounts[tag]})
            </Link>
          ))}
        </div>
      )}

      {/* Regular Blogs */}
      <section>
        <div className="divide-y divide-border">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} variant="row" />
          ))}
        </div>
        {filteredPosts.length === 0 && selectedTag && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No blogs found with tag{" "}
              <span className="font-medium">#{selectedTag.toLowerCase()}</span>.
            </p>
          </div>
        )}
      </section>

      {/* Archived Blogs */}
      {archivedPosts.length > 0 && !selectedTag && (
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Archived
            </h2>
            <p className="text-muted-foreground">
              Older blogs that might be outdated but still have some value.
            </p>
          </div>
          <div className="divide-y divide-border">
            {archivedPosts.map((post) => (
              <PostCard key={post.slug} post={post} variant="row" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
