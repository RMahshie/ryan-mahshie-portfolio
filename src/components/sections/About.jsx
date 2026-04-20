import { RevealOnScroll } from '../RevealOnScroll';

const skills = ['Go', 'Python', 'Java', 'Azure', 'Docker', 'LangGraph', 'Kubernetes'];

// Simulated syntax-highlighted Go snippet
const CodeCard = () => (
  <div
    style={{
      background: 'var(--surface-overlay)',
      border: '1px solid var(--surface-border)',
      borderRadius: '12px',
      padding: '1.5rem',
      fontFamily: "'Space Grotesk', monospace",
      fontSize: '0.8125rem',
      lineHeight: 1.7,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Top glow accent */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
      }}
    />

    {/* Window chrome dots */}
    <div style={{ display: 'flex', gap: '6px', marginBottom: '1.25rem' }}>
      {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
        <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
      ))}
    </div>

    {/* Code content */}
    <pre style={{ margin: 0, whiteSpace: 'pre', color: 'var(--text-secondary)' }}>
      <span style={{ color: '#7c85a2' }}># airport simulator</span>{'\n'}
      <span style={{ color: 'var(--accent)' }}>async def</span>{' '}
      <span style={{ color: '#7dd3fc' }}>simulate_airport</span>
      {'(\n'}
      {'    airport: '}
      <span style={{ color: '#fbbf24' }}>Airport</span>
      {',\n'}
      {') -> '}
      <span style={{ color: '#fbbf24' }}>AirportGraph</span>
      {':\n'}
      {'    graph = '}
      <span style={{ color: '#7dd3fc' }}>build_agent_graph</span>
      {'(airport)\n'}
      {'    '}
      <span style={{ color: 'var(--accent)' }}>return await</span>
      {' graph.'}
      <span style={{ color: '#7dd3fc' }}>invoke</span>
      {'()'}
    </pre>

    {/* Status badge */}
    <div
      style={{
        marginTop: '1.25rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        background: 'rgba(168,85,247,0.1)',
        border: '1px solid rgba(168,85,247,0.2)',
        fontSize: '0.75rem',
        color: 'var(--accent)',
        letterSpacing: '0.04em',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
      3,000+ airports modeled
    </div>
  </div>
);

export const About = () => {
  return (
    <section
      id="about"
      style={{
        background: 'var(--surface-base)',
        padding: 'var(--space-section) var(--gutter)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width-content)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center',
        }}
        className="about-grid"
      >
        {/* Left — text */}
        <div>
          <RevealOnScroll delay={0}>
            <p
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '1rem',
              }}
            >
              About
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}
            >
              Backend engineer.<br />
              AI systems builder.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={75}>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
              I'm a computer science student at Northeastern University with an AI concentration and a 3.91 GPA.
              Over the past year, I've worked as a backend engineer across different industries and company sizes,
              owning features and shipping production code.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.75rem' }}>
              I work primarily in Python/Go/Typescript, with deep experience in Azure and AWS infrastructure.
              I've been building with agentic AI frameworks since before the tooling matured.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((tech) => (
                <span key={tech} className="tech-pill">{tech}</span>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* Right — code card visual */}
        <RevealOnScroll delay={100}>
          <div style={{ position: 'relative' }}>
            {/* Glow behind card */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <CodeCard />
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
