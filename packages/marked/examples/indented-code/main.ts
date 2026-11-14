// Indented code blocks: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `Run this:

    npm install
    npm start

Done.`;

const SAMPLE_1 = `Three spaces:

   not code

Four:

    code`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Indent lines by four spaces' });

  liveDemo(stage, {
    samples: [
      { label: 'Commands', text: SAMPLE_0 },
      { label: 'Not code', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'Four spaces (or a tab) before every line, and a blank line before the block, make the code block. Remove one space and it is a paragraph again.',
  });

  return () => stage.dispose();
};

export default mount;
