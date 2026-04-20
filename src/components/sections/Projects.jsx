import { RevealOnScroll } from '../RevealOnScroll';
import { useState, useEffect } from 'react';

const projects = [
  {
    name: 'LawSearch AI',
    description: 'An AI-powered tool built for a lobbyist client to search federal spending bills. Parses 2,000+ page bills into 14 specialized vector stores by committee, routes queries via LLM, and combines results through RAG map-reduce. Built pre-MCP, pre-evals; I tuned retrieval parameters through manual testing. Reduced response time from 3 minutes to 30 seconds and cut customer research time by 90%.',
    tech: ['Python', 'LangChain', 'LangGraph', 'ChromaDB', 'ChatGPT API', 'Congressional API'],
    links: [{ label: 'GitHub', url: 'https://github.com/RMahshie/lawsearchprod' }],
    hasDemo: true,
    featured: true,
  },
  {
    name: 'Sonara',
    description: 'A room acoustics analyzer for improving speaker setups and sound treatment. Play a sine sweep, record with a USB mic, and get your room\'s frequency response with calculated room modes. Built with Go and goroutines for audio processing, deployed on Railway with Docker.',
    tech: ['Go', 'Python', 'Huma', 'PostgreSQL', 'Docker', 'WebRTC', 'React'],
    links: [
      { label: 'GitHub', url: 'https://github.com/RMahshie/sonara' },
      { label: 'Try It Out', url: 'https://sonara.up.railway.app/' },
    ],
    hasDemo: false,
    featured: false,
  },
  {
    name: 'Nitpick',
    description: 'A GitHub Action that provides agentic code reviews on pull requests, automatically routing between lightweight reviews for simple changes and agentic reviews for complex cross-file modifications that trace code flow and dependencies.',
    tech: ['Claude Agent SDK', 'LangChain', 'OpenAI API', 'GitHub Actions', 'Python'],
    links: [{ label: 'GitHub', url: 'https://github.com/RMahshie/codereviewer' }],
    hasDemo: false,
    featured: false,
  },
];

const TechPills = ({ tech }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '1.25rem' }}>
    {tech.map((t) => (
      <span key={t} className="tech-pill">{t}</span>
    ))}
  </div>
);

const ProjectLinks = ({ links, hasDemo, onDemo }) => (
  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
    {links.map((link) => (
      <a
        key={link.label}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-interactive"
        style={{ color: 'var(--accent)', fontSize: '0.875rem', padding: '0.25rem 0' }}
      >
        {link.label} <span className="arrow">→</span>
      </a>
    ))}
    {hasDemo && (
      <button
        onClick={onDemo}
        className="btn-interactive"
        style={{ color: 'var(--accent)', fontSize: '0.875rem', padding: '0.25rem 0', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        Watch Demo <span className="arrow">→</span>
      </button>
    )}
  </div>
);

export const Projects = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setShowVideoModal(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section
      id="projects"
      style={{
        background: 'var(--surface-base)',
        padding: 'var(--space-section) var(--gutter)',
      }}
    >
      {/* Video Modal */}
      {showVideoModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setShowVideoModal(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              background: 'var(--surface-raised)',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--surface-border)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'rgba(168,85,247,0.8)',
                border: '1px solid var(--accent)',
                borderRadius: '50%',
                width: '2.25rem',
                height: '2.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1,
                color: '#fff',
              }}
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div style={{ aspectRatio: '16/9' }}>
              <video
                src="/LawSearchAI-Demo.mov"
                style={{ width: '100%', height: '100%', display: 'block' }}
                controls
                autoPlay
                preload="auto"
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 'var(--max-width-content)', margin: '0 auto' }}>
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
            Projects
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
            Things I've built
          </h2>
        </RevealOnScroll>

        {/* Bento grid */}
        <div
          className="projects-bento"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '1rem',
          }}
        >
          {/* Featured — LawSearch */}
          <RevealOnScroll delay={75}>
            <div
              className="card-featured"
              style={{
                gridColumn: '1',
                gridRow: '1 / 3',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Glow behind featured card */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-30%',
                  left: '-10%',
                  width: '120%',
                  height: '80%',
                  background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.1) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <h3
                    style={{
                      fontSize: '1.375rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      margin: 0,
                    }}
                  >
                    {featured.name}
                  </h3>
                  <ProjectLinks links={featured.links} hasDemo={featured.hasDemo} onDemo={() => setShowVideoModal(true)} />
                </div>

                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.75, flex: 1 }}>
                  {featured.description}
                </p>

                <TechPills tech={featured.tech} />
              </div>
            </div>
          </RevealOnScroll>

          {/* Sonara */}
          <RevealOnScroll delay={150}>
            <div
              className="card"
              style={{ gridColumn: '2', gridRow: '1', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {rest[0].name}
                </h3>
                <ProjectLinks links={rest[0].links} hasDemo={false} />
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
                {rest[0].description}
              </p>
              <TechPills tech={rest[0].tech} />
            </div>
          </RevealOnScroll>

          {/* Nitpick */}
          <RevealOnScroll delay={225}>
            <div
              className="card"
              style={{ gridColumn: '2', gridRow: '2', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {rest[1].name}
                </h3>
                <ProjectLinks links={rest[1].links} hasDemo={false} />
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
                {rest[1].description}
              </p>
              <TechPills tech={rest[1].tech} />
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-bento {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .projects-bento > * {
            grid-column: 1 !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  );
};
