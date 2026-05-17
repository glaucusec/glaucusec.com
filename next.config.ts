import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/blogs/:slug.md",
        destination: "/api/posts/:slug/raw",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/posts",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/posts/:slug",
        destination: "/blogs/:slug",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about/my-stack",
        destination: "/",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/",
        permanent: true,
      },
      {
        source: "/language-learning/czech-case-cards",
        destination: "/language-learning/czech-declensions",
        permanent: true,
      },
      {
        source: "/language-learning/russian-case-cards",
        destination: "/language-learning/russian-declensions",
        permanent: true,
      },
    ];
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
