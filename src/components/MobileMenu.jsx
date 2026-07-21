export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const links = [
    { id: 'about',      label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Projects' },
    { id: 'contact',    label: 'Contact' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100dvh',
        background: 'rgba(9, 13, 12, 0.97)',
        backdropFilter: 'blur(16px)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? 'visible' : 'hidden',
        transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: menuOpen
          ? 'opacity 220ms var(--ease-out), transform 220ms var(--ease-out), visibility 0s'
          : 'opacity 150ms var(--ease-out), transform 150ms var(--ease-out), visibility 0s linear 150ms',
        overflow: 'hidden',
      }}
      aria-hidden={!menuOpen}
      onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
    >
      <button
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: '2rem',
          cursor: 'pointer',
          lineHeight: 1,
        }}
        aria-label="Close menu"
      >
        &times;
      </button>

      {links.map((link, i) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={() => setMenuOpen(false)}
          style={{
            fontSize: '1.75rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            margin: '0.875rem 0',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
            transition: menuOpen
              ? `opacity 200ms var(--ease-out) ${i * 50}ms, transform 200ms var(--ease-out) ${i * 50}ms`
              : 'opacity 120ms ease, transform 150ms var(--ease-out)',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};
