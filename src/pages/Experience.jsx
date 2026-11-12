const roles = [
  {
    title: 'Software Engineer Intern',
    location: 'Palo Alto, CA',
    dates: 'Sep – Dec 2026',
    company: 'Amazon Web Services',
    companyUrl: 'https://www.linkedin.com/company/amazon-web-services/',
    summary:
      'Developed a Java service that connects ML models to EMR Managed Scaling, so Spark clusters scale on predicted demand instead of current load.',
  },
  {
    title: 'Software Engineer Intern',
    location: 'Bellevue, WA',
    dates: 'Jun – Aug 2026',
    company: 'Visa',
    companyUrl: 'https://www.linkedin.com/company/visa/',
    summary:
      'Built and deployed a real-time Java/Vert.x API that ranks payment methods using XGBoost4J models trained on 10M+ transactions.',
  },
  {
    title: 'Software Engineer Co-op',
    location: 'Alexandria, VA',
    dates: 'Jul – Dec 2025',
    company: 'OpsCanvas',
    companyUrl: 'https://www.linkedin.com/company/opscanvas/',
    summary:
      'Expanded ZombieScan from AWS to Azure by writing all of its Azure IaC in Bicep, rewriting thousands of lines of Dockerized Python, and extending the Go API.',
  },
  {
    title: 'AI Software Engineer Intern',
    location: 'McLean, VA',
    dates: 'Jun – Jul 2025',
    company: 'Pelagic AI',
    companyUrl: 'https://www.linkedin.com/company/pelagicai/',
    summary:
      'Designed 8-node cyclic LangGraph agents and custom MCP tools that plan aircraft movement across large airport graphs.',
  },
];

export const Experience = () => (
  <section className="page experience">
    <h2>Experience</h2>
    <ol className="entries">
      {roles.map((role) => (
        <li key={role.company}>
          <div className="row">
            <span className="name">
              {role.title} <span className="loc">– {role.location}</span>
            </span>
            <span className="meta">{role.dates}</span>
          </div>
          <a className="company" href={role.companyUrl} target="_blank" rel="noopener noreferrer">
            {role.company}
            <span className="arrow">↗</span>
          </a>
          <p className="desc">{role.summary}</p>
        </li>
      ))}
    </ol>
  </section>
);
