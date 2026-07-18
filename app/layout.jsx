import './globals.css';
import ThemeToggle from '../components/ThemeToggle';

export const metadata = {
  title: 'Dev Mani Shukla — Enterprise Commerce Architecture at Scale',
  description:
    'I make large commerce platforms faster to launch on, cheaper to run, and steadier under pressure.',
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
            <a href="/resume.pdf" target="_blank" rel="noopener">Resume</a>
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
            Pursuing Salesforce B2C Commerce Architect certification · Based in Gurgaon, India · Open to Solution Architect roles
          </p>
        </footer>
      </body>
    </html>
  );
}
