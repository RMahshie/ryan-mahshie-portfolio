export const Footer = () => {
  return (
    <footer
      style={{
        background: 'var(--surface-dark)',
        borderTop: '1px solid var(--surface-border)',
        padding: '1.5rem var(--gutter)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width-content)',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
          © {new Date().getFullYear()} Ryan Mahshie
        </span>
      </div>
    </footer>
  );
};
