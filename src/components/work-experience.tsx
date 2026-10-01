const experience = [
  {
    company: "Revsoliq",
    role: "Independent Full-Stack Developer",
    start: "2026-08",
    startLabel: "Aug 2026",
    current: true,
    highlights: [
      "Founded a small software agency and shipped two paid production web projects, owning everything from client requirements and frontend/backend development to deployment and post-launch support.",
      "Built a Next.js hospitality booking website serving 1,000+ monthly users, with responsive booking flows, WhatsApp and call actions, SEO, and analytics.",
    ],
  },
  {
    company: "Deepnetsoft Technologies",
    role: "Software Developer",
    start: "2024-06",
    startLabel: "Jun 2024",
    end: "2026-06",
    endLabel: "Jun 2026",
    highlights: [
      "Led the frontend redesign of an internal CRM and maintained shared TypeScript packages, reusable form inputs, and S3 file-upload components used across multiple products.",
      "Led frontend delivery for a payment management platform with Admin, Merchant, and Affiliate dashboards, collaborating with two developers and directly with the client.",
      "Built Gmail and Outlook inboxes, an email composer, and invitation flows for a multi-tenant tax platform; contributed vehicle filtering, comparison, and bulk inventory import features for an automotive platform.",
    ],
  },
  {
    company: "Sharpener Tech",
    role: "Software Developer Trainee (Apprenticeship)",
    start: "2023-05",
    startLabel: "May 2023",
    end: "2024-01",
    endLabel: "Jan 2024",
    highlights: [
      "Completed a structured software development apprenticeship across development projects and engineering exercises.",
      "Automated application testing and deployment workflows using Jenkins on AWS EC2.",
    ],
  },
];

export function WorkExperience() {
  return (
    <section
      id="work-experience"
      className="home-section experience-section"
      aria-labelledby="experience-heading"
    >
      <div className="section-heading">
        <h2 id="experience-heading">Work experience</h2>
        <span>From shared platforms to independent builds</span>
      </div>
      <ol className="experience-timeline">
        {experience.map((job) => (
          <li className="experience-item" key={job.company}>
            <article>
              <div className="experience-heading">
                <h3>{job.company}</h3>
                {job.current && <span className="experience-current">Current</span>}
              </div>
              <p className="experience-role">{job.role}</p>
              <p className="experience-meta">
                <span>
                  <time dateTime={job.start}>{job.startLabel}</time> –{" "}
                  {job.end ? (
                    <time dateTime={job.end}>{job.endLabel}</time>
                  ) : (
                    "Present"
                  )}
                </span>
                <span>Remote</span>
              </p>
              <ul className="experience-highlights">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
