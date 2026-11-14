// A clickable picture: an image nested inside a link
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { outlineDocs, quotedSide } from '../../shared/broken-kit.ts';

// The input and markdown.js's output, both as docs/broken.md shows them.
const SOURCE = `[![an image](/image)](/link)`;
const MARKDOWN_JS = `<p><a href="/image)](/link">![an image</a></p>`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the Markdown: the Marked side re-renders' });
  const marked = new Marked();

  compareDemo(stage, {
    samples: [{ label: 'From the docs', text: SOURCE }],
    sides: [
      quotedSide('markdown.js (quoted in the docs)', SOURCE, MARKDOWN_JS),
      { label: 'Marked', render: (md) => marked.parse(md, { async: false }) },
    ],
    caption: "markdown.js cut the link at the wrong bracket, leaving '![an image' as link text. Marked nests the image inside the link. (The picture is an offline stand-in for /image.)",
  });
  outlineDocs(stage);

  return () => stage.dispose();
};

export default mount;
