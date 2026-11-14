// Blockquotes: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `> Meeting at 9
> Bring **notes**

Got it!`;

const SAMPLE_1 = `> Mum said:
>
> > Take a coat
>
> Thanks!`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or remove > at the line starts' });

  liveDemo(stage, {
    samples: [
      { label: 'Reply', text: SAMPLE_0 },
      { label: 'Nested', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'Each extra > nests one level deeper. Formatting such as **bold** or lists works inside a quote.',
  });

  return () => stage.dispose();
};

export default mount;
