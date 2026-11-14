// Bullet lists: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `- Milk
- Eggs
  - Free range
  - Large
- Bread`;

const SAMPLE_1 = `* Mon
* Tue
  * gym
    * legs
+ Wed`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Indent a line to nest it' });

  liveDemo(stage, {
    samples: [
      { label: 'Shopping', text: SAMPLE_0 },
      { label: 'Markers', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'Indent a bullet two or more spaces under its parent to nest it. Changing the marker character (- to *) starts a separate list.',
  });

  return () => stage.dispose();
};

export default mount;
