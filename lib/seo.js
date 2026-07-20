// Shared metadata builder. Keeps Open Graph and Twitter-card tags identical in shape
// across every page, so a shared link always previews correctly.
//
// The site is a static export, so the preview image is a fixed file in /public rather
// than a generated one. `metadataBase` (set in the root layout) turns the relative
// path below into the absolute URL that LinkedIn, WhatsApp and X require.
import { pathInLocale } from './i18n';

export const SITE_URL = 'https://theseams-dev.vercel.app';
export const OG_IMAGE = '/og.png';
export const SITE_NAME = 'Commerce at Scale';

const OG_ALT = 'Dev Mani Shukla — Design notes on commerce platforms that stay simple as they grow.';

export function pageMeta({ title, description, path = '/', locale = 'en' }) {
  const image = {
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    alt: OG_ALT,
  };

  // `path` is the language-neutral route (e.g. /library). The canonical and og:url
  // must point at *this* page in *this* language, or the French pages would declare
  // themselves duplicates of the English ones.
  const self = pathInLocale(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: self,
      languages: {
        en: pathInLocale(path, 'en'),
        fr: pathInLocale(path, 'fr'),
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      title,
      description,
      url: self,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
