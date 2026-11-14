// Strikethrough: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `~~Sold out~~ back!
Was ~~$20~~ $15`;

const SAMPLE_1 = `Meet at ~~5~~ 6pm
~~Bring cake~~`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wrap words in ~~' });

  liveDemo(stage, {
    samples: [
      { label: 'Price', text: SAMPLE_0 },
      { label: 'Plans', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      '~~text~~ becomes a del tag. Wrap any words, even a whole sentence.',
  });

  return () => stage.dispose();
};

export default mount;
