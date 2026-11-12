const projects = [
  {
    name: 'LawSearch AI',
    description: 'Search over 2,000+ pages of federal spending bills, where every figure in an answer links to its source.',
    links: [{ label: 'GitHub', url: 'https://github.com/RMahshie/lawsearchprod' }],
  },
  {
    name: 'Payback',
    description: 'Prices my Plex watch history at the cheapest way to stream it, showing how much my NAS has paid back.',
    links: [{ label: 'GitHub', url: 'https://github.com/RMahshie/plex-payback' }],
  },
  {
    name: 'Sonara',
    description: 'Room acoustics analyzer that measures within about ±3 dB of professional tools, using a cheap USB mic.',
    links: [
      { label: 'Try it', url: 'https://sonara.up.railway.app/' },
      { label: 'GitHub', url: 'https://github.com/RMahshie/sonara' },
    ],
  },
  {
    name: 'Nitpick',
    description: 'GitHub Action for AI code review that saves deep analysis for complex, cross-file changes.',
    links: [{ label: 'GitHub', url: 'https://github.com/RMahshie/codereviewer' }],
  },
  {
    name: 'Tokenburn',
    description: 'Terminal dashboard for Claude Code and Codex usage, built from local session files.',
    links: [
      { label: 'Install', url: 'https://github.com/RMahshie/homebrew-tap' },
      { label: 'GitHub', url: 'https://github.com/RMahshie/tokenburn' },
    ],
  },
];

export const Projects = () => (
  <section className="page projects">
    <h2>Projects</h2>
    <ul className="entries">
      {projects.map((project) => (
        <li key={project.name}>
          <div className="row">
            <span className="name">{project.name}</span>
            <span className="links">
              {project.links.map((link) => (
                <a key={link.label} className="nav-link" href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label} ↗
                </a>
              ))}
            </span>
          </div>
          <p className="desc">{project.description}</p>
        </li>
      ))}
    </ul>
  </section>
);
