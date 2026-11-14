// Small helpers for renderer overrides: escaping, slugs, parsing one string
import type { Marked } from 'marked';

/** Escapes text for HTML, as a renderer must for anything it writes itself. */
export function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** "Packing list!" becomes "packing-list". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Renders Markdown with an instance and returns the string (never a Promise). */
export function render(m: Marked, markdown: string): string {
  return m.parse(markdown, { async: false });
}
