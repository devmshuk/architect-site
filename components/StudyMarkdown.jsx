'use client';
// Client wrapper around react-markdown for study bodies. It renders GFM markdown as
// before, but intercepts fenced ```mermaid blocks and renders them as real diagrams.
// Everything else (tables, normal code blocks) is untouched.
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Mermaid from './Mermaid';

// In react-markdown v9 a fenced block is <pre><code class="language-x">…</code></pre>.
// Overriding `pre` lets us replace the whole block (no <pre> wrapper around the SVG).
function Pre({ children, ...props }) {
  const child = Array.isArray(children) ? children[0] : children;
  const className = child?.props?.className || '';
  if (className.includes('language-mermaid')) {
    const code = String(child.props.children).replace(/\n$/, '');
    return <Mermaid chart={code} />;
  }
  return <pre {...props}>{children}</pre>;
}

export default function StudyMarkdown({ content }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ pre: Pre }}>
      {content}
    </ReactMarkdown>
  );
}
