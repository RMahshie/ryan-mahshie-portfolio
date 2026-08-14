import { RevealOnScroll } from '../RevealOnScroll';

const experiences = [
  {
    company: 'Amazon Web Services',
    companyUrl: 'https://aws.amazon.com/emr/',
    title: 'Software Development Engineer Intern',
    dates: 'Sep. 2026 – Dec. 2026',
    incoming: true,
    description: 'Joining the EMR team in Palo Alto, CA.',
    featured: true,
  },
  {
    company: 'Visa CyberSource',
    companyUrl: 'https://www.cybersource.com/',
    title: 'Backend Software Engineering Intern',
    dates: 'Summer 2026',
    description: 'Working on event-driven Java services and applied AI.',
    featured: false,
  },
  {
    company: 'OpsCanvas',
    companyUrl: 'https://www.linkedin.com/company/opscanvas/',
    title: 'Software Engineering Co-op',
    dates: 'Jul. 2025 – Dec. 2025',
    description: `At OpsCanvas, I helped expand ZombieScan from an AWS-only product into one that supported both AWS and Azure. I wrote the Bicep infrastructure to deploy the full product into Azure, extended our Go API for Azure install workflows, and built the backend logic that configured AWS DataSync transfers from customer Azure Blob Storage into our AWS S3. I also handled the database registration/state for those installs and E2E tested the system across Azure, AWS, EKS, and Postgres.`,
    featured: false,
  },
  {
    company: 'Pelagic AI',
    companyUrl: 'https://www.linkedin.com/company/pelagicai/',
    title: 'AI Software Engineering Intern',
    dates: 'Jun. 2025 – Jul. 2025',
    description: `At Pelagic AI, I helped lead an agentic airport simulation demo for a DoD contract. I scoped work, created tickets, and built the core AI system: an 8-node cyclic LangGraph setup where agents analyzed airport layouts, planned aircraft movements, read and updated simulation state through MCP tools, and evaluated final scenarios across 3,000+ real-world airports with up to 8,000+ nodes each.`,
    featured: false,
  },
  {
    company: 'OPEXUS',
    companyUrl: null,
    title: 'Software Engineering Intern',
    dates: 'Jun. 2024 – Sep. 2024',
    description: `At OPEXUS, I worked on migrations for agencies moving off FOIAonline after it shut down. I wrote SQL scripts to move client data and FOIA requests into our platform, then verified the migrations with Windows VMs and MSSQL Server. This was my first professional engineering experience.`,
    featured: false,
  },
];

export const Experience = () => {
  return (
    <section
      id="experience"
      style={{
        background: 'var(--surface-raised)',
        padding: 'var(--space-section) var(--gutter)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
        {/* Section label */}
        <RevealOnScroll delay={0}>
          <p
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '0.75rem',
            }}
          >
            Experience
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            Where I've worked
          </h2>
        </RevealOnScroll>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '11px',
              top: '12px',
              bottom: '12px',
              width: '1px',
              background: 'var(--surface-border)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {experiences.map((exp, index) => (
              <RevealOnScroll key={index} delay={75 + index * 75}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  {/* Timeline dot */}
                  <div
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: '23px',
                      height: '23px',
                      borderRadius: '50%',
                      background: exp.featured
                        ? 'var(--accent)'
                        : 'var(--surface-border)',
                      border: `2px solid ${exp.featured ? 'var(--accent)' : 'var(--surface-border)'}`,
                      boxShadow: exp.featured
                        ? '0 0 10px rgba(166,111,179,0.32)'
                        : 'none',
                      marginTop: '1rem',
                      zIndex: 1,
                      position: 'relative',
                    }}
                  />

                  {/* Card */}
                  <div
                    className={exp.featured ? 'card-featured' : 'card'}
                    style={{ flex: 1, background: 'rgba(25, 29, 27, 0.42)' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          margin: 0,
                        }}
                      >
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: 'inherit',
                              textDecoration: 'none',
                              transition: 'color var(--transition-fast)',
                            }}
                            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                            onMouseLeave={e => e.target.style.color = 'inherit'}
                          >
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--text-tertiary)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {exp.dates}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        marginBottom: '0.875rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--accent)',
                          fontWeight: 500,
                        }}
                      >
                        {exp.title}
                      </span>
                      {exp.incoming && (
                        <span
                          style={{
                            fontSize: '0.625rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--accent)',
                            background: 'rgba(166,111,179,0.09)',
                            border: '1px solid rgba(166,111,179,0.2)',
                            borderRadius: '9999px',
                            padding: '0.125rem 0.5rem',
                          }}
                        >
                          Incoming
                        </span>
                      )}
                    </div>

                    <p
                      style={{
                        fontSize: '0.9375rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {exp.description}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
