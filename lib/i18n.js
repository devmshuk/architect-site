// Locale helpers. Next.js built-in i18n routing does not work with
// `output: 'export'`, so routing is done by path: English at the root, French
// under /fr. These helpers keep that rule in one place.
export const LOCALES = ['en', 'fr'];
export const DEFAULT_LOCALE = 'en';

export function localeFromPath(pathname = '/') {
  return pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en';
}

// Map the current path to the same page in the other locale.
export function pathInLocale(pathname = '/', locale = 'en') {
  const bare = pathname === '/fr' || pathname.startsWith('/fr/')
    ? pathname.slice(3) || '/'
    : pathname;
  const clean = bare.startsWith('/') ? bare : `/${bare}`;
  if (locale === 'fr') return clean === '/' ? '/fr' : `/fr${clean}`;
  return clean;
}

// Prefix an internal href for the given locale.
export function href(path, locale = 'en') {
  if (locale !== 'fr') return path;
  return path === '/' ? '/fr' : `/fr${path}`;
}

export const NAV = {
  en: [
    ['/studies', 'Studies'],
    ['/ai', 'AI for Architects'],
    ['/library', 'Library'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
  ],
  fr: [
    ['/studies', 'Études'],
    ['/ai', 'IA pour architectes'],
    ['/library', 'Bibliothèque'],
    ['/about', 'À propos'],
    ['/contact', 'Contact'],
  ],
};

export const FOOTER = {
  en: {
    lead: 'Let’s talk architecture.',
    meta: 'Commerce architecture at scale · across platforms, teams, and markets · Gurgaon, India',
  },
  fr: {
    lead: 'Parlons architecture.',
    meta: 'Architecture commerce à grande échelle · plateformes, équipes et marchés · Gurgaon, Inde',
  },
};
