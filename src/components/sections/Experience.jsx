import { RevealOnScroll } from '../RevealOnScroll';

const experiences = [
  {
    company: 'Visa CyberSource',
    companyUrl: 'https://www.cybersource.com/',
    title: 'Backend Software Engineering Intern',
    dates: 'Summer 2026',
    incoming: true,
    description: 'Joining the CyberSource Acceptance Solutions team in Bellevue, WA to work on payment infrastructure and AI agents.',
    featured: false,
  },
  {
    company: 'OpsCanvas',
    companyUrl: 'https://www.linkedin.com/company/opscanvas/',
    title: 'Software Engineering Co-op',
    dates: 'Jul. 2025 – Dec. 2025',
    incoming: false,
    description: `At OpsCanvas, I led the expansion of our ZombieScan cloud monitoring platform into Azure, doubling the company's addressable market. I wrote 3,000 lines of infrastructure-as-code using Bicep, extended our Go API to handle Azure installations, and built new Dockerized report generators for Azure Container Jobs. I implemented cross-cloud DataSync between Azure Blob storage and AWS S3, and E2E tested the full system across EKS, Azure, and Postgres.`,
    featured: true,
  },
  {
    company: 'Pelagic AI',
    companyUrl: 'https://www.linkedin.com/company/pelagicai/',
    title: 'AI Software Engineering Intern',
    dates: 'Jun. 2025 – Jul. 2025',
    incoming: false,
    description: `At Pelagic AI, I co-led development of an agentic satellite airport simulator for a DOD contract. I managed the project by scoping work and creating tickets, while also owning the entire agentic AI system. I built an 8-node cyclic LangGraph architecture that assessed airport layouts, autonomously repositioned aircraft, and ran adversarial simulations. The system could model any of 3,000+ real-world airports, each with up to 8,000+ nodes.`,
    featured: false,
  },
  {
    company: 'OPEXUS',
    companyUrl: null,
    title: 'Software Engineering Intern',
    dates: 'Jun. 2024 – Sep. 2024',
    incoming: false,
    description: `At OPEXUS, I supported data migrations for their FOIA request management platform. When competing vendors shut down, I wrote SQL scripts to transfer their client data and requests into our system, and used Windows VMs to verify migrations against MSSQL Server. This was my first professional engineering experience.`,
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
                        ? '0 0 12px rgba(168,85,247,0.5)'
                        : 'none',
                      marginTop: '1rem',
                      zIndex: 1,
                      position: 'relative',
                    }}
                  />

                  {/* Card */}
                  <div
                    className={exp.featured ? 'card-featured' : 'card'}
                    style={{ flex: 1, background: 'rgba(26, 26, 31, 0.4)' }}
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
                            background: 'rgba(168,85,247,0.12)',
                            border: '1px solid rgba(168,85,247,0.3)',
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
