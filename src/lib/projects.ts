import { getColorByIndex } from "./colors";

interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  links: { github?: string; demo?: string };
  image?: string;
}

const featuredProjectsData: FeaturedProject[] = [
  {
    id: "pixytalk",
    title: "PixyTalk",
    description:
      "A shared customer inbox with AI assistance, business knowledge, and human takeover, starting with WhatsApp. Currently in development.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "OpenAI", "WhatsApp Cloud API"],
    links: {
      github: "https://github.com/glaucusec/pixytalk",
    },
  },
  {
    id: "1",
    title: "Awesome Repos",
    description:
      "A curated collection of repositories, links, payloads, blogs, and tools for pentesting and bug bounty hunting.",
    tech: ["Security", "Pentesting", "Bug Bounty"],
    links: {
      github: "https://github.com/glaucusec/awesome-repos",
    },
  },
];

export const featuredProjects = featuredProjectsData.map((project, index) => {
  const colors = getColorByIndex(index);
  return {
    ...project,
    borderColor: colors.border,
  };
});
