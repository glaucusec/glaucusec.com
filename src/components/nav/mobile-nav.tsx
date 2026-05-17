"use client";

import { MobileThemeToggle } from "@/components/mobile-theme-toggle";
import BookIcon from "@/components/ui/book-icon";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/ui/github-icon";
import HomeIcon from "@/components/ui/home-icon";
import TwitterIcon from "@/components/ui/twitter-icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { useState } from "react";

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

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="px-5 w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/blogs" && pathname.startsWith("/blogs/"));
              return (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-1 border-t border-border/40 pt-4">
            {socialLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.href}
                aria-label={item.href}
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              >
                <item.icon size={20} className="shrink-0" />
              </Link>
            ))}
          </div>
          <div className="border-t border-border/40 pt-4">
            <MobileThemeToggle onThemeChange={() => setOpen(false)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
