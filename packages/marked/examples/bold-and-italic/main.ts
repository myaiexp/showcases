// Bold and italic: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `I **really** want
*two* scoops of
***mint***.`;

const SAMPLE_1 = `__Bold__ and _soft_
snake_case_word
sno*w*ball`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wrap words in * or _' });

  liveDemo(stage, {
    samples: [
      { label: 'Asterisks', text: SAMPLE_0 },
      { label: 'Underscores', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      '* and _ work the same, except inside a word: snake_case_word is left alone while sno*w*ball is not.',
  });

  return () => stage.dispose();
};

export default mount;
