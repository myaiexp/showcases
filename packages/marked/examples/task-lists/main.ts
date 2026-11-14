// Task lists: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `- [x] Passport
- [ ] Tickets
- [x] Charger`;

const SAMPLE_1 = `- [ ] Party
  - [x] Cake
  - [ ] Balloons
- [x] Invite`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Put x or a space between the brackets' });

  liveDemo(stage, {
    samples: [
      { label: 'Packing', text: SAMPLE_0 },
      { label: 'Nested', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      '[ ] is an empty box and [x] a ticked one. Marked draws them disabled; the Renderer examples show how to make them clickable.',
  });

  return () => stage.dispose();
};

export default mount;
