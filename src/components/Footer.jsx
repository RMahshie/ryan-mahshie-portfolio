const links = [
  { label: 'Email', href: 'mailto:ryan@mahshie.net' },
  { label: 'GitHub ↗', href: 'https://github.com/RMahshie', external: true },
  { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/ryan-mahshie', external: true },
];

export const Footer = () => (
  <footer>
    {links.map(({ label, href, external }) => (
      <a
        key={label}
        className="nav-link"
        href={href}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {label}
      </a>
    ))}
  </footer>
);
