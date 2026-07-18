'use client';
import { useEffect, useState } from 'react';

// Manual light/dark toggle. Persists choice in localStorage and sets
// data-theme on <html>, which globals.css uses to override the OS default.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) { document.documentElement.dataset.theme = saved; setTheme(saved); }
    else {
      const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(sys);
    }
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    setTheme(next);
  }

  return (
    <button className="toggle" onClick={toggle} aria-label="Toggle colour theme">
      <span className="dot" />{theme ? theme.toUpperCase() : ''}
    </button>
  );
}
