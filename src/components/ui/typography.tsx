import type { ReactNode } from "react";

export function Typography({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`article-prose ${className}`}>{children}</div>;
}
