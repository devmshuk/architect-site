import './globals.css';
import ThemeToggle from '../components/ThemeToggle';

export const metadata = {
  title: 'Dev Mani Shukla — Commerce Architecture at Scale',
  description:
    'Design notes on commerce platforms that stay simple as they grow: where to place the boundaries, what each choice buys, and what it costs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <a href="/" className="brand">Dev Mani Shukla</a>
          <nav className="navlinks">
            <a href="/studies">Studies</a>
            <a href="/ai">AI for Architects</a>
            <a href="/library">Library</a>
            <a href="/about">About</a>
            <a href="/resume.pdf" target="_blank" rel="noopener">CV</a>
            <a href="/contact">Contact</a>
          </nav>
          <ThemeToggle />
        </header>
        <main>{children}</main>
        <footer className="foot">
          <div>
            <div className="serif" style={{ fontSize: 18 }}>Let&rsquo;s talk architecture.</div>
            <a href="/contact" style={{ color: 'var(--accent)', fontSize: 14 }}>devmanis.757@gmail.com &rarr;</a>
          </div>
          <p className="mono muted" style={{ fontSize: 12.5, textAlign: 'right', maxWidth: 420 }}>
            Commerce architecture at scale · across platforms, teams, and markets · Gurgaon, India
          </p>
        </footer>
      </body>
    </html>
  );
}
