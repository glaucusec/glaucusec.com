import GithubIcon from "@/components/ui/github-icon";
import TwitterIcon from "@/components/ui/twitter-icon";
import { featuredProjects } from "@/lib/projects";
import { allPosts } from "content-collections";
import Image from "next/image";
import Link from "next/link";

function formatDate(date: Date) {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  return `${day}${suffix} ${date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}`;
}

export default function HomePage() {
  const posts = allPosts
    .filter((post) => !post.archived)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="home-page">
      <header id="about" className="profile-hero">
        <Image
          src="/abhishekbaiju.jpg"
          alt="Abhishek Baiju"
          width={600}
          height={740}
          priority
          className="profile-photo"
        />
        <div className="profile-copy">
          <h1>Hey, I’m Abhishek.</h1>
          <p>I’m a developer focused on building for the web.</p>
          <p>
            Online, I’m usually{" "}
            <Link href="https://github.com/glaucusec">@glaucusec</Link>. I build
            functional, efficient websites and spend a lot of time figuring out
            how to make them safer.
          </p>
          <p>
            My core interest sits at the intersection of{" "}
            <strong>web development</strong> and web security. I write about
            what I learn while building, breaking, and putting things back
            together.
          </p>
          <p>I’m currently studying AI and human languages at BYU.</p>

          <div className="social-row">
            <Link
              href="https://github.com/glaucusec"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={20} />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://x.com/glaucusec"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon size={18} />
              <span>X / Twitter</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="home-section">
        <div className="section-heading">
          <h2>Latest writing</h2>
          <span>Notes on development, security, and the web</span>
        </div>
        <ul className="writing-list">
          {posts.slice(0, 5).map((post) => (
            <li key={post.slug}>
              <Link href={post.url} className="writing-row">
                <span className="writing-title">{post.title}</span>
                <time dateTime={post.date.toISOString()}>
                  {formatDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/blogs" className="all-link">
          All writing →
        </Link>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>What I’m building</h2>
          <span>Open-source tools and useful experiments</span>
        </div>
        <div className="building-grid">
          {featuredProjects.map((project) => {
            const href = project.links.demo || project.links.github;
            return (
              <article className="building-card" key={project.id}>
                <Image
                  src={`/project-images/${project.image}`}
                  alt=""
                  width={72}
                  height={72}
                  className="building-icon"
                />
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {href && (
                    <Link href={href} target="_blank" rel="noopener noreferrer">
                      Visit project →
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <Link href="/projects" className="all-link">
          All projects →
        </Link>
      </section>

      <section className="home-section rss-section">
        <h2>Follow along</h2>
        <p>
          New articles about the web, the things I build, and what I learn along
          the way.
        </p>
        <Link href="/rss.xml" className="ink-button" target="_blank">
          Subscribe via RSS →
        </Link>
      </section>
    </div>
  );
}
