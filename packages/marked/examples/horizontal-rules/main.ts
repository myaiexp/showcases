// Horizontal rules: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `Part one

---

Part two

***

Part three`;

const SAMPLE_1 = `Intro

- - -

Middle

___

End`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try --- or *** or - - -' });

  liveDemo(stage, {
    samples: [
      { label: 'Three styles', text: SAMPLE_0 },
      { label: 'Spaced', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      '---, *** and ___ (spaces between them allowed) all draw a line. Keep a blank line above --- or the text above becomes a heading.',
  });

  return () => stage.dispose();
};

export default mount;
