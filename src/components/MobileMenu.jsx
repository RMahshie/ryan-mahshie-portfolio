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
        height: menuOpen ? '100vh' : 0,
        background: 'rgba(10, 10, 12, 0.97)',
        backdropFilter: 'blur(16px)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, height 0.3s ease',
        overflow: 'hidden',
      }}
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
            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.3s ease ${i * 50}ms, transform 0.3s ease ${i * 50}ms`,
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
