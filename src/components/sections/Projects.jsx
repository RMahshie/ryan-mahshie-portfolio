import { RevealOnScroll } from '../RevealOnScroll';
import { useState, useEffect } from 'react';

const projects = [
  {
    name: 'LawSearch AI',
    description: 'A RAG app built for a lobbyist client to search federal appropriations bills. It parses 2,000+ page funding bills into custom per-division vector stores, then runs questions through a LangGraph classify → rewrite → retrieve → map-reduce → answer pipeline. The app returns cited answers with clickable funding details, showing where each number came from and how added-up figures were calculated. I built a gold-standard eval suite for answer accuracy and citation quality, then used it to tune retrieval from 3.5 minutes to 45 seconds and reduce my client’s research time by 90%.',
    tech: ['Python', 'LangChain', 'LangGraph', 'ChromaDB', 'OpenAI API'],
    links: [{ label: 'GitHub', url: 'https://github.com/RMahshie/lawsearchprod' }],
    hasDemo: true,
    featured: true,
  },
  {
    name: 'Sonara',
    description: 'A room acoustics analyzer for improving speaker setup with a cheap USB microphone. Users record a sine sweep and get frequency response, room modes, and setup guidance. I built the Go backend, used Python for FFT analysis, and got results within about ±3 dB of professional measurement tools.',
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
    description: 'A GitHub Action for AI pull request reviews. It routes simple diffs to lightweight checks and sends complex cross-file changes through deeper reviews that trace code flow, dependencies, and likely failure points.',
    tech: ['Claude Agent SDK', 'LangChain', 'OpenAI API', 'GitHub Actions', 'Python'],
    links: [{ label: 'GitHub', url: 'https://github.com/RMahshie/codereviewer' }],
    hasDemo: false,
    featured: false,
  },
  {
    name: 'Tokenburn',
    description: 'A Rust terminal dashboard for tracking Claude Code and Codex usage from local session files, with time-range views, token breakdowns, cache stats, and retention checks.',
    tech: ['Rust', 'Ratatui', 'Homebrew', 'Claude Code', 'Codex'],
    links: [
      { label: 'GitHub', url: 'https://github.com/RMahshie/tokenburn' },
      { label: 'Install', url: 'https://github.com/RMahshie/homebrew-tap' },
    ],
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
        style={{ color: 'var(--accent)', fontSize: '0.875rem', padding: '0.25rem 0.25rem 0.25rem 0' }}
      >
        {link.label} <span className="arrow">→</span>
      </a>
    ))}
    {hasDemo && (
      <button
        onClick={onDemo}
        className="btn-interactive"
        style={{ color: 'var(--accent)', fontSize: '0.875rem', padding: '0.25rem 0.25rem 0.25rem 0', background: 'none', border: 'none', cursor: 'pointer' }}
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
            background: 'rgba(5,7,6,0.9)',
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
                background: 'rgba(118,81,127,0.95)',
                border: '1px solid var(--accent)',
                borderRadius: '50%',
                width: '2.25rem',
                height: '2.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1,
                color: 'var(--text-primary)',
              }}
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div style={{ aspectRatio: '16/9' }}>
              <video
                src="/lawsearch-demo.mp4"
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
                gridRow: '1 / 4',
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
                  background: 'radial-gradient(ellipse at center, rgba(166,111,179,0.07) 0%, transparent 70%)',
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

          {/* Tokenburn */}
          <RevealOnScroll delay={300}>
            <div
              className="card"
              style={{ gridColumn: '2', gridRow: '3', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {rest[2].name}
                </h3>
                <ProjectLinks links={rest[2].links} hasDemo={false} />
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
                {rest[2].description}
              </p>
              <TechPills tech={rest[2].tech} />
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
