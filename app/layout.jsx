import './globals.css';
import { SiteNav, SiteFooter } from '../components/SiteChrome';
import { pageMeta, SITE_URL } from '../lib/seo';

const TITLE = 'Commerce at Scale — Design notes on large commerce platforms';
const DESCRIPTION =
  'Design notes on commerce platforms that stay simple as they grow: where to place the boundaries, what each choice buys, and what it costs.';

export const metadata = {
  // Makes the relative /og.png resolve to an absolute URL, which link previews require.
  metadataBase: new URL(SITE_URL),
  ...pageMeta({ title: TITLE, description: DESCRIPTION, path: '/' }),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
