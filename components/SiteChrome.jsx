'use client';
// Nav and footer. These are client components because the locale is decided by the
// URL path (Next's built-in i18n routing does not work with a static export), so the
// same layout has to serve both languages.
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { localeFromPath, pathInLocale, href, NAV, FOOTER } from '../lib/i18n';

export function SiteNav() {
  const pathname = usePathname() || '/';
  const locale = localeFromPath(pathname);

  // Keep <html lang> correct for screen readers and translation tools.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const other = locale === 'fr' ? 'en' : 'fr';

  return (
    <header className="nav">
      <a href={href('/', locale)} className="brand">Dev Mani Shukla</a>
      <nav className="navlinks">
        {NAV[locale].map(([path, label]) => (
          <a key={path} href={href(path, locale)}>{label}</a>
        ))}
        <a href="/resume.pdf" target="_blank" rel="noopener">CV</a>
      </nav>
      <a
        className="lang"
        href={pathInLocale(pathname, other)}
        aria-label={other === 'fr' ? 'Voir en français' : 'View in English'}
      >
        {locale === 'fr' ? 'EN' : 'FR'}
      </a>
      <ThemeToggle />
    </header>
  );
}

export function SiteFooter() {
  const pathname = usePathname() || '/';
  const locale = localeFromPath(pathname);
  const t = FOOTER[locale];

  return (
    <footer className="foot">
      <div>
        <div className="serif" style={{ fontSize: 18 }}>{t.lead}</div>
        <a href={href('/contact', locale)} style={{ color: 'var(--accent)', fontSize: 14 }}>
          devmanis.757@gmail.com &rarr;
        </a>
      </div>
      <p className="mono muted" style={{ fontSize: 12.5, textAlign: 'right', maxWidth: 420 }}>
        {t.meta}
      </p>
    </footer>
  );
}
