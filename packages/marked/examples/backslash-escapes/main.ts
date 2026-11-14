// Backslash escapes: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = String.raw`\*not italic\*
\# no heading
1\. no list`;

const SAMPLE_1 = String.raw`Price \$5 \[sale\]
\- no bullet
A \\ slash`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Delete a backslash to see the formatting return' });

  liveDemo(stage, {
    samples: [
      { label: 'Stars and hash', text: SAMPLE_0 },
      { label: 'Brackets', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'The backslash disappears and the symbol shows. Remove it and the symbol formats again.',
  });

  return () => stage.dispose();
};

export default mount;
