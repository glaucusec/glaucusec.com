import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Abhishek Baiju",
  description:
    "A collection of Abhishek Baiju's projects, from featured work to experimental builds.",
};

const projects = [
  {
    category: "Featured",
    items: featuredProjects,
  },
];

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
