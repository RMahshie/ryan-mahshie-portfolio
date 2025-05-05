export const Footer = () => {
    return (
      <footer className="mt-12 py-4 text-center text-xs text-gray-400">
        <div className="space-x-4 mb-2">
          <a
            href="mailto:ryan@mahshie.net"
            className="hover:underline"
          >
            Email
          </a>
          <a
            href="https://github.com/RMahshie"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ryan-mahshie"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>
        <div>© {new Date().getFullYear()} Ryan Mahshie. All rights reserved.</div>
      </footer>
    );
  };
  