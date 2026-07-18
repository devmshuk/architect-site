'use client';
// Renders a Mermaid diagram from ```mermaid code fences, client-side (so it works
// under `output: 'export'`). Mermaid is dynamically imported, so it stays out of the
// main bundle and only loads on pages that actually contain a diagram. Colours are
// read from the site's CSS custom properties, so diagrams follow the light/dark toggle.
import { useEffect, useRef, useState } from 'react';

// Load mermaid once and share the promise across every diagram on the page.
let mermaidPromise;
function loadMermaid() {
  if (!mermaidPromise) mermaidPromise = import('mermaid').then((m) => m.default);
  return mermaidPromise;
}

// Pull the current theme colours off :root so the diagram matches the site.
function readThemeVars() {
  const s = getComputedStyle(document.documentElement);
  const v = (name) => s.getPropertyValue(name).trim();
  const text = v('--text');
  const accent = v('--accent');
  const surface = v('--surface');
  const surface2 = v('--surface-2');
  const bg = v('--bg');
  const border = v('--border');
  return {
    background: bg,
    primaryColor: surface2,
    primaryTextColor: text,
    primaryBorderColor: accent,
    secondaryColor: surface,
    tertiaryColor: bg,
    lineColor: accent,
    textColor: text,
    mainBkg: surface2,
    nodeBorder: accent,
    clusterBkg: bg,
    clusterBorder: border,
    titleColor: text,
    edgeLabelBackground: bg,
    // sequence-diagram specifics
    actorBkg: surface2,
    actorBorder: accent,
    actorTextColor: text,
    actorLineColor: border,
    signalColor: text,
    signalTextColor: text,
    labelBoxBkgColor: surface2,
    labelBoxBorderColor: accent,
    labelTextColor: text,
    loopTextColor: text,
    noteBkgColor: surface,
    noteBorderColor: border,
    noteTextColor: text,
  };
}

export default function Mermaid({ chart }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = await loadMermaid();
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
          themeVariables: readThemeVars(),
        });
        // Fresh id per render avoids collisions when re-rendering on theme change.
        const id = 'mmd-' + Math.random().toString(36).slice(2);
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setFailed(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    render();

    // Re-render when the theme changes (explicit toggle or OS preference).
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener?.('change', render);

    return () => {
      cancelled = true;
      observer.disconnect();
      media.removeEventListener?.('change', render);
    };
  }, [chart]);

  // If a diagram fails to parse, fall back to the raw text rather than showing nothing.
  if (failed) return <pre>{chart}</pre>;

  return <div className="mermaid-wrap" ref={ref} role="img" aria-label="Architecture diagram" />;
}
