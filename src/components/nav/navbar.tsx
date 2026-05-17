"use client";

import BookIcon from "@/components/ui/book-icon";
import GithubIcon from "@/components/ui/github-icon";
import HomeIcon from "@/components/ui/home-icon";
import TwitterIcon from "@/components/ui/twitter-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";

type NavigationItem = {
  name: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Blogs", href: "/blogs", icon: BookIcon },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/glaucusec",
    icon: GithubIcon,
  },
  {
    name: "Twitter",
    href: "https://x.com/glaucusec",
    icon: TwitterIcon,
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-col">
      {/* <div className="flex w-full flex-row overflow-y-auto bg-background"> */}
      <div className="flex grow flex-row items-center justify-between w-full gap-6 px-6 py-8 md:py-12">
        {/* Profile Section */}
        <Link href="/" className="flex items-start space-x-3 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-border/20 group-hover:ring-border/40 transition-all">
            <Image
              src="/abhishekbaiju.jpg"
              alt="Profile photo"
              width={48}
              height={48}
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
              Abhishek Baiju
            </h2>
            <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
              @glaucusec
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul role="list" className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/blogs" && pathname.startsWith("/blogs/"));
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
            <li className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
            {socialLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.href}
                  aria-label={item.href}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                >
                  <item.icon size={20} className="shrink-0" />
                </Link>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
      {/* </div> */}
    </div>
  );
}
