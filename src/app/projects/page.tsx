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
        title: "Eta",
        description:
          "A super-fast embedded JS template engine that supports Deno.",
        tech: ["JavaScript", "TypeScript", "Template Engine"],
        links: {
          github: "https://github.com/eta-dev/eta",
        },
        image: "eta.png",
      },
      {
        id: "2",
        title: "Decline App",
        description:
          "A website for practicing Czech, Slovak, and Russian noun declensions.",
        tech: ["Next.js", "React", "TypeScript"],
        links: {
          github: "https://github.com/glaucusec/declension-practice",
        },
        image: "decline.png",
      },
      {
        id: "3",
        title: "GOM",
        description:
          "Pip package with CLI tool to monitor GPU usage across Docker containers. A minimalistic alternative to 'nvidia-smi'.",
        tech: ["Python", "Docker", "CLI"],
        links: {
          github: "https://github.com/glaucusec/gom",
        },
        image: "gom.png",
      },
    ],
  },
  {
    category: "Other",
    items: [
      {
        id: "4",
        title: "BlinkBuy",
        description: "BlinkBuy- An E-commerce Store ",
        tech: ["Nextjs", "Tailwind", "React"],
        links: {
          github: "https://github.com/glaucusec/BlinkBuy",
        },
        image: "npm-to-yarn.png",
      },
      {
        id: "5",
        title: "ClassiMail",
        description: "Emails with GPT-4 powered categorization 📧",
        tech: ["Nextjs", "GPT-4o"],
        links: {
          github: "https://github.com/squirrellyjs/squirrelly",
        },
        image: "squirrelly.png",
      },
    ],
  },
  {
    category: "Old",
    items: [
      {
        id: "6",
        title: "Chat Application",
        description:
          "A Chrome extension that turns your new tab page into a customizable dashboard.",
        tech: [
          "HTML",
          "CSS",
          "Bootstrap",
          "JavaScript",
          "Node Js",
          "Express Js",
          "MySQL",
          "Sequelize",
        ],
        links: {
          github: "https://github.com/glaucusec/chat-application",
        },
        image: "splashpad.png",
      },
      {
        id: "7",
        title: "Expense Tracker",
        description:
          "A Chrome extension to transform characters written in the Esperanto 'x-system' into Esperanto characters while typing.",
        tech: ["JavaScript", "Chrome Extension"],
        links: {
          github: "https://github.com/glaucusec/expense-tracker",
        },
        image: "esperaboard.png",
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
