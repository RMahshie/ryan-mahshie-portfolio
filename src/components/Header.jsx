export const Header = ({ pages, current }) => (
  <header>
    <a className="wordmark" href="#/about">Ryan Mahshie</a>
    <nav aria-label="Main">
      {pages.map(({ id, label }) => (
        <a
          key={id}
          className="nav-link"
          href={`#/${id}`}
          aria-current={id === current ? 'page' : undefined}
        >
          {label}
        </a>
      ))}
      <a className="nav-link" href="Ryan_Mahshie_Resume.pdf" target="_blank" rel="noopener noreferrer">
        Resume ↗
      </a>
    </nav>
  </header>
);
