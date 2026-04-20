import { useEffect, useState } from 'react';

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'contact'];

    function handleScroll() {
      setScrolled(window.scrollY > 10);

      let current = 'home';
      let minDist = Infinity;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - 80);
          if (rect.top <= 100 && dist < minDist) {
            minDist = dist;
            current = id;
          }
        }
      }

      setActiveSection(current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about',      label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Projects' },
    { id: 'contact',    label: 'Contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 40,
        height: '64px',
        background: scrolled ? 'rgba(10, 10, 12, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--surface-border)' : '1px solid transparent',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width-content)',
          margin: '0 auto',
          padding: '0 var(--gutter)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: '1.0625rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textDecoration: 'none',
          }}
        >
          ryan-mahshie<span style={{ color: 'var(--accent)' }}>.xyz</span>
        </a>

        {/* Mobile hamburger */}
        <button
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: 40,
            opacity: menuOpen ? 0 : 1,
            pointerEvents: menuOpen ? 'none' : 'auto',
            transition: 'opacity 0.2s ease',
          }}
          className="mobile-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          &#9776;
        </button>

        {/* Desktop nav */}
        <div
          style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              style={{
                position: 'relative',
                color: activeSection === link.id ? 'var(--accent)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                fontWeight: 500,
                paddingBottom: '4px',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={e => {
                if (activeSection !== link.id) e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                if (activeSection !== link.id) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <span
                  className="nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'var(--accent)',
                    borderRadius: '9999px',
                    transformOrigin: 'left',
                  }}
                />
              )}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
};
