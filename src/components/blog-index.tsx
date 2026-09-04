"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogSummary = {
  slug: string;
  url: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime?: string;
};

const categories = [
  {
    label: "Next.js & React",
    tags: ["nextjs", "caching", "tailwindcss", "google-fonts"],
  },
  {
    label: "Performance & SEO",
    tags: ["performance", "seo", "web-performance"],
  },
  {
    label: "Security & networks",
    tags: ["asn", "recon", "security", "networking"],
  },
  {
    label: "Homelab",
    tags: [
      "homelab",
      "home-server",
      "docker",
      "tailscale",
      "pihole",
      "jellyfin",
      "immich",
      "self-hosting",
    ],
  },
];

function formatDate(value: string) {
  const date = new Date(value);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  return `${day}${suffix} ${date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}`;
}

function PostArtwork({ post }: { post: BlogSummary }) {
  const src = `/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}&type=post`;
  return (
    <div className="blog-card-art">
      <Image
        src={src}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 640px) 100vw, 360px"
      />
    </div>
  );
}

export function BlogIndex({
  posts,
  initialTag,
}: {
  posts: BlogSummary[];
  initialTag?: string;
}) {
  const initialCategory =
    categories.find(
      (category) => initialTag && category.tags.includes(initialTag),
    )?.label || "All";
  const [activeTag, setActiveTag] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const category = categories.find((item) => item.label === activeTag);
      const knownTags = categories.flatMap((item) => item.tags);
      const matchesTag =
        activeTag === "All" ||
        (activeTag === "Everything else"
          ? !post.tags.some((tag) => knownTags.includes(tag))
          : post.tags.some((tag) => category?.tags.includes(tag)));
      const matchesQuery =
        !needle ||
        `${post.title} ${post.description} ${post.tags.join(" ")}`
          .toLowerCase()
          .includes(needle);
      return matchesTag && matchesQuery;
    });
  }, [activeTag, posts, query]);

  const [featured, ...rest] = visible;

  return (
    <>
      <div className="blog-controls">
        <div className="blog-filters" aria-label="Filter posts by topic">
          {[
            "All",
            ...categories.map((category) => category.label),
            "Everything else",
          ].map((tag) => (
            <button
              key={tag}
              type="button"
              className={
                activeTag === tag ? "filter-chip active" : "filter-chip"
              }
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span className="sr-only">Search posts</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts…"
          />
        </label>
      </div>

      <section className="blog-results">
        <h2>Latest</h2>
        {!featured ? (
          <div className="empty-posts">No posts match that search.</div>
        ) : (
          <>
            <article className="featured-post-card">
              <div className="featured-post-copy">
                <h3>
                  <Link href={featured.url}>{featured.title}</Link>
                </h3>
                <p>{featured.description}</p>
                <div className="post-card-footer">
                  <time dateTime={featured.date}>
                    {formatDate(featured.date)}
                  </time>
                  <Link href={featured.url}>Read →</Link>
                </div>
              </div>
              <Link href={featured.url} tabIndex={-1} aria-hidden="true">
                <PostArtwork post={featured} />
              </Link>
            </article>

            <div className="blog-card-grid">
              {rest.map((post) => (
                <article className="editorial-post-card" key={post.slug}>
                  <Link href={post.url} tabIndex={-1} aria-hidden="true">
                    <PostArtwork post={post} />
                  </Link>
                  <div className="editorial-post-copy">
                    <h3>
                      <Link href={post.url}>{post.title}</Link>
                    </h3>
                    <p>{post.description}</p>
                    <div className="post-card-footer">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <Link href={post.url}>Read →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
