"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blogs" },
  { name: "GitHub", href: "https://github.com/glaucusec" },
  { name: "X / Twitter", href: "https://x.com/glaucusec" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mobile-menu-trigger">
          <Menu className="size-5" strokeWidth={1.7} />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="mobile-menu-panel">
        <SheetHeader>
          <SheetTitle className="text-left text-[19px]">Abhishek</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="mobile-nav-link"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="mailto:hello@glaucusec.com"
            onClick={() => setOpen(false)}
            className="nav-cta mt-5 self-start"
          >
            Work with me
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
