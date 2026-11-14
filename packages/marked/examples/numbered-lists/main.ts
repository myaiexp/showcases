// Numbered lists: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `1. Boil water
2. Add pasta
3. Drain`;

const SAMPLE_1 = `3. Third place
4. Fourth

1) Paren style
2) Also a list`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the first number' });

  liveDemo(stage, {
    samples: [
      { label: 'Steps', text: SAMPLE_0 },
      { label: 'Start at 3', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'Only the first number matters: 3. then 4. starts at 3. A ) after the number works as well as a dot.',
  });

  return () => stage.dispose();
};

export default mount;
