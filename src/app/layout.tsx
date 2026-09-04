import { Navbar } from "@/components/nav/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Instrument_Sans } from "next/font/google";
import Link from "next/link";
import type React from "react";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Abhishek Baiju", template: "%s - Abhishek Baiju" },
  description:
    "Abhishek Baiju's personal website. Web Development Intern at Vercel, studying AI and human languages at BYU.",
  authors: [{ name: "Abhishek Baiju", url: "https://glaucusec.com" }],
  metadataBase: new URL("https://glaucusec.com"),
  openGraph: {
    type: "website",
    url: "https://glaucusec.com",
    title: "Abhishek Baiju",
    description:
      "Web developer exploring the intersection of the web and security.",
    siteName: "Abhishek Baiju",
  },
  twitter: { card: "summary_large_image", creator: "@glaucusec" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={instrumentSans.variable}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="site-shell">
              <a href="#main" className="skip-link">
                Skip to content
              </a>
              <Navbar />
              <main id="main" className="main-content">
                {children}
              </main>
              <footer className="site-footer">
                <nav className="footer-links" aria-label="Footer navigation">
                  <Link href="/">Home</Link>
                  <Link href="/projects">Projects</Link>
                  <Link href="/blogs">Blog</Link>
                  <Link href="https://github.com/glaucusec" target="_blank">
                    GitHub
                  </Link>
                  <Link href="https://x.com/glaucusec" target="_blank">
                    X / Twitter
                  </Link>
                  <Link href="/rss.xml" target="_blank">
                    RSS
                  </Link>
                </nav>
                <p>
                  © {new Date().getFullYear()} Abhishek Baiju. All rights
                  reserved.
                </p>
              </footer>
            </div>
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
