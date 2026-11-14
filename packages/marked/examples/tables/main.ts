// Tables: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `|Item|Qty|Cost|
|:--|:-:|--:|
|Milk|2|1.80|
|Eggs|12|3.20|`;

const SAMPLE_1 = `Day|Plan
---|---
Mon|Gym
Tue|Rest`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the colons in the second row' });

  liveDemo(stage, {
    samples: [
      { label: 'Aligned', text: SAMPLE_0 },
      { label: 'No outer pipes', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'The second row of dashes is required. A colon on the left, both sides or the right of the dashes aligns that column left, centre or right.',
  });

  return () => stage.dispose();
};

export default mount;
