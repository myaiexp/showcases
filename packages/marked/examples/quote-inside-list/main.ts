// A blockquote inside a list item: markdown.pl misnests it, Marked does not
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { outlineDocs, quotedSide } from '../../shared/broken-kit.ts';

// The input and markdown.pl's output, both as docs/broken.md shows them.
const SOURCE = `* hello
  > world`;
const MARKDOWN_PL = `<p><ul>
<li>hello</p>

<blockquote>
  <p>world</li>
</ul></p>
</blockquote>`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the Markdown: the Marked side re-renders' });
  const marked = new Marked();

  compareDemo(stage, {
    samples: [{ label: 'From the docs', text: SOURCE }],
    sides: [
      quotedSide('markdown.pl (quoted in the docs)', SOURCE, MARKDOWN_PL),
      { label: 'Marked', render: (md) => marked.parse(md, { async: false }) },
    ],
    caption: "markdown.pl's tags cross each other (<li>hello</p>), so the browser has to guess; Marked puts the quote neatly inside the list item.",
  });
  outlineDocs(stage);

  return () => stage.dispose();
};

export default mount;
