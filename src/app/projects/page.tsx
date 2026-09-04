import { ProjectCard } from "@/components/project-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Abhishek Baiju",
  description:
    "A collection of Abhishek Baiju's projects, from featured work to experimental builds.",
};

const projectsData = [
  {
    category: "Featured",
    items: [
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
    ],
  },
];

const borderColors = [
  "border-sky-500/30 hover:border-sky-500/60 dark:border-sky-500/20 dark:hover:border-sky-500/40",
  "border-emerald-500/30 hover:border-emerald-500/60 dark:border-emerald-500/20 dark:hover:border-emerald-500/40",
  "border-amber-500/30 hover:border-amber-500/60 dark:border-amber-500/20 dark:hover:border-amber-500/40",
  "border-purple-500/30 hover:border-purple-500/60 dark:border-purple-500/20 dark:hover:border-purple-500/40",
  "border-pink-500/30 hover:border-pink-500/60 dark:border-pink-500/20 dark:hover:border-pink-500/40",
  "border-orange-500/30 hover:border-orange-500/60 dark:border-orange-500/20 dark:hover:border-orange-500/40",
];

const projects = projectsData.map((section) => ({
  ...section,
  items: section.items.map((project, index) => ({
    ...project,
    borderColor: borderColors[index % borderColors.length],
  })),
}));

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <header className="index-header">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Projects
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          A collection of things I've built over the years, from open-source
          libraries to web applications and browser extensions.
        </p>
      </header>

      {projects.map((section) => (
        <section key={section.category} className="project-section">
          <div className="project-section-head">
            <h2>{section.category}</h2>
            <span>
              {section.items.length}{" "}
              {section.items.length === 1 ? "project" : "projects"}
            </span>
          </div>
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
