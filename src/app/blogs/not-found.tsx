import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="not-found-page">
      <span>404</span>
      <h1>That article isn’t here.</h1>
      <p>It may have been moved, renamed, or archived.</p>
      <div>
        <Link href="/blogs" className="ink-button">
          Browse the blog →
        </Link>
        <Link href="/" className="outline-button">
          Go home
        </Link>
      </div>
    </div>
  );
}
