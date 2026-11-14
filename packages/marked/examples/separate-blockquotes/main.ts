// Three quotes separated by blank lines: three blockquotes, not one
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { outlineDocs, quotedSide } from '../../shared/broken-kit.ts';

// The input and markdown.js's output, both as docs/broken.md shows them.
const SOURCE = `> a

> b

> c`;
const MARKDOWN_JS = `<blockquote><p>a</p><p>bundefined&gt; c</p></blockquote>`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the Markdown: the Marked side re-renders' });
  const marked = new Marked();

  compareDemo(stage, {
    samples: [{ label: 'From the docs', text: SOURCE }],
    sides: [
      quotedSide('markdown.js (quoted in the docs)', SOURCE, MARKDOWN_JS),
      { label: 'Marked', render: (md) => marked.parse(md, { async: false }) },
    ],
    caption: "The docs' markdown.js output merged them and printed 'undefined'. Marked ends a quote at each blank line, giving three separate blockquotes.",
  });
  outlineDocs(stage);

  return () => stage.dispose();
};

export default mount;
