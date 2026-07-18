import './globals.css';
import { SiteNav, SiteFooter } from '../components/SiteChrome';

export const metadata = {
  title: 'Dev Mani Shukla — Commerce Architecture at Scale',
  description:
    'Design notes on commerce platforms that stay simple as they grow: where to place the boundaries, what each choice buys, and what it costs.',
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
