'use client';
// Client wrapper around react-markdown for study bodies. It renders GFM markdown as
// before, but intercepts two kinds of fenced block:
//   ```mermaid   -> rendered as a real diagram
//   ```svg       -> replaced by a hand-drawn SVG from public/diagrams, inlined so it
//                   inherits the site's CSS variables and follows the theme
// Everything else (tables, normal code blocks) is untouched.
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Mermaid from './Mermaid';

export default function StudyMarkdown({ content, diagrams = {} }) {
  const components = useMemo(
    () => ({
      // In react-markdown v9 a fenced block is <pre><code class="language-x">…</code></pre>.
      // Overriding `pre` lets us replace the whole block, with no <pre> around the figure.
      pre: function Pre({ children, ...props }) {
        const child = Array.isArray(children) ? children[0] : children;
        const className = child?.props?.className || '';
        const code = String(child?.props?.children ?? '').replace(/\n$/, '');

        if (className.includes('language-mermaid')) {
          return <Mermaid chart={code} />;
        }

        if (className.includes('language-svg')) {
          const svg = diagrams[code.trim()];
          // The SVG is authored in this repo, so inlining it is safe.
          if (svg) return <div className="figure" dangerouslySetInnerHTML={{ __html: svg }} />;
        }

        return <pre {...props}>{children}</pre>;
      },
    }),
    [diagrams]
  );

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
