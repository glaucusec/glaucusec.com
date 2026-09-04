import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="not-found-page">
      <span>404</span>
      <h1>That page isn’t here.</h1>
      <p>The address may have changed, or the page may no longer exist.</p>
      <div>
        <Link href="/" className="ink-button">
          Go home →
        </Link>
        <Link href="/blogs" className="outline-button">
          Browse the blog
        </Link>
      </div>
    </div>
  );
}
