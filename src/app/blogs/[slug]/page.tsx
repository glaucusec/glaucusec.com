import { Comments } from "@/components/comments";
import { FloatingELI5 } from "@/components/floating-eli5";
import { mdxComponents } from "@/components/mdx-components";
import { TOCNode } from "@/components/mdx/remark-toc";
import { RawMarkdown } from "@/components/raw-markdown";
import { Social } from "@/components/social";
import { Typography } from "@/components/ui/typography";
import { getBaseUrl } from "@/lib/utils";
import { MDXContent } from "@content-collections/mdx/react";
import { allPosts } from "content-collections";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientTOC } from "./client-toc";

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((item) => item.slug === slug);
  if (!post) return { title: "Blog Not Found" };
  const og = `/og?${new URLSearchParams({ title: post.title, description: post.description, type: "post" })}`;
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "Abhishek Baiju", url: "https://glaucusec.com" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date.toISOString(),
      modifiedTime: post.lastUpdated?.toISOString() || post.date.toISOString(),
      authors: ["Abhishek Baiju"],
      tags: post.tags,
      images: [{ url: og, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@glaucusec",
      images: [og],
    },
  };
}

function formatDate(date: Date) {
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const toc: TOCNode = JSON.parse(post.toc);
  const hasTOC = toc.children.length > 0;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [
      `${getBaseUrl()}/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}&type=post`,
    ],
    datePublished: post.date.toISOString(),
    dateModified: post.lastUpdated?.toISOString() || post.date.toISOString(),
    author: [{ "@type": "Person", name: "Abhishek Baiju", url: getBaseUrl() }],
  };

  return (
    <article className="article-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="article-column">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/blogs">Blog</Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>

        <header className="article-header">
          <h1>
            {post.title}
            {post.archived && <span> (archived)</span>}
          </h1>
          <p className="article-deck">{post.description}</p>
          <div className="article-byline">
            <div className="author-line">
              <Image
                src="/abhishekbaiju.jpg"
                alt="Abhishek Baiju"
                width={38}
                height={38}
              />
              <div>
                <strong>Abhishek Baiju</strong>
                <span>
                  {post.lastUpdated
                    ? `Updated ${formatDate(post.lastUpdated)} · `
                    : ""}
                  {formatDate(post.date)} · {post.readingTime || "5 min read"}
                </span>
              </div>
            </div>
            {post.tags.length > 0 && (
              <div className="article-tags">
                {post.tags.map((tag) => (
                  <Link
                    href={`/blogs?tag=${encodeURIComponent(tag)}`}
                    key={tag}
                  >
                    #{tag.toLowerCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </header>

        {hasTOC && (
          <details className="mobile-article-toc">
            <summary>
              <span>On this page</span>
              <small>{toc.children.length} sections</small>
            </summary>
            <ClientTOC tree={toc} />
          </details>
        )}

        <Typography>
          <MDXContent code={post.mdx} components={mdxComponents} />
        </Typography>

        <div className="article-utilities">
          <RawMarkdown slug={post.slug} content={post.content} />
          <Social title={post.title} />
        </div>

        <div className="comments-section">
          <Comments />
        </div>
      </div>

      {hasTOC && (
        <aside className="article-toc">
          <ClientTOC tree={toc} />
        </aside>
      )}

      <FloatingELI5 content={post.content} title={post.title} />
    </article>
  );
}
