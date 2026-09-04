"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./mobile-nav";

const navigation = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blogs" },
  { name: "GitHub", href: "https://github.com/glaucusec", external: true },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="wordmark">
          Abhishek<sup>®</sup>
        </Link>

        <div className="nav-actions">
          <div className="desktop-links">
            {navigation.map((item) => {
              const active =
                pathname === item.href ||
                (item.href === "/blogs" && pathname.startsWith("/blogs/"));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={active ? "nav-link active" : "nav-link"}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link href="mailto:hello@glaucusec.com" className="nav-cta">
              Work with me
            </Link>
          </div>
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
