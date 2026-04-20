import { InteractiveGrid } from '../InteractiveGrid';

export const Home = () => {
  return (
    <section
      id="home"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      {/* Canvas dot grid — fills section */}
      <InteractiveGrid />

      {/* Central purple glow behind heading */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: 'var(--max-width-narrow)',
          padding: '0 var(--gutter)',
          width: '100%',
        }}
      >
        {/* Overline */}
        <p
          style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            marginBottom: '1.5rem',
          }}
        >
          Backend Engineer &nbsp;•&nbsp; AI Systems &nbsp;•&nbsp; Cloud Infrastructure
        </p>

        {/* Main heading */}
        <h1
          style={{
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}
        >
          Ryan{' '}
          <span style={{ color: 'var(--accent)' }}>Mahshie</span>
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
          }}
        >
          I build backend systems that work at scale, from cross-cloud infrastructure to agentic AI architectures.
        </p>

        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--accent)',
            fontWeight: 600,
            marginBottom: '2.5rem',
            letterSpacing: '0.02em',
          }}
        >
          Currently recruiting for Fall 2026.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#projects" className="btn-primary">
            View My Work
            <span style={{ display: 'inline-block', transition: 'transform 0.3s ease' }} className="arrow">→</span>
          </a>
          <a href="#contact" className="btn-ghost">
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          Scroll
        </span>
        <svg
          className="animate-bounce-slow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
};
