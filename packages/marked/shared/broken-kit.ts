// "Markdown is broken" helpers: outlined element boxes, sides quoting the docs
import type { Side } from './demo.ts';
import type { Stage } from './stage.ts';
import './broken-kit.css';

/** Outlines every block in the stage's rendered panes and labels it with its tag. */
export function outlineDocs(stage: Stage): void {
  for (const doc of stage.root.querySelectorAll('.mk-doc')) doc.classList.add('mk-outline');
}

/**
 * A side that shows output another engine produced, as docs/broken.md quotes it. The quote
 * belongs to the docs' exact input, so other input shows a note instead.
 */
export function quotedSide(label: string, input: string, html: string): Side {
  return {
    label,
    render: (md) =>
      md.trim() === input.trim()
        ? html
        : md.length < input.length && input.startsWith(md)
          ? '<p class="mk-quote-wait">…</p>'
          : '<p class="mk-quote-wait">The docs quote this output for their original input only.</p>',
  };
}
