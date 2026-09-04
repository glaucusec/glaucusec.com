import GithubIcon from "@/components/ui/github-icon";
import LinkIcon from "@/components/ui/link-icon";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  links: { github?: string; demo?: string };
  image?: string;
  borderColor?: string;
}

export function ProjectCard({ project }: { project: Project }) {
  const primaryLink = project.links.demo || project.links.github;

  return (
    <article className="project-card">
      {project.image && (
        <Image
          src={`/project-images/${project.image}`}
          alt=""
          width={80}
          height={80}
          className="project-icon"
        />
      )}
      <div className="project-card-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-links">
          {primaryLink && (
            <a href={primaryLink} target="_blank" rel="noopener noreferrer">
              <LinkIcon size={14} /> Visit project →
            </a>
          )}
          {project.links.github && primaryLink !== project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
            >
              <GithubIcon size={16} /> Source
            </a>
          )}
        </div>
        <div className="project-tags">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
