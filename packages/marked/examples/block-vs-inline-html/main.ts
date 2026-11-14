// Raw HTML in Markdown: a <div> stays a block, a <span> sits in a paragraph
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { outlineDocs, quotedSide } from '../../shared/broken-kit.ts';

// The input and markdown.js's output, both as docs/broken.md shows them.
const SOURCE = `<div>hello</div>

<span>hello</span>`;
const MARKDOWN_JS = `<p>&lt;div&gt;hello&lt;/div&gt;</p>

<p>&lt;span&gt;hello&lt;/span&gt;</p>`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the Markdown: the Marked side re-renders' });
  const marked = new Marked();

  compareDemo(stage, {
    samples: [{ label: 'From the docs', text: SOURCE }],
    sides: [
      quotedSide('markdown.js (quoted in the docs)', SOURCE, MARKDOWN_JS),
      { label: 'Marked', render: (md) => marked.parse(md, { async: false }) },
    ],
    caption: "markdown.js escaped the HTML, so readers see the tags as text. Marked passes the <div> through as a block of its own and wraps the inline <span> in a paragraph.",
  });
  outlineDocs(stage);

  return () => stage.dispose();
};

export default mount;
