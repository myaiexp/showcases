// Headings: underlined: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `Weekend plans
=============

Chores
------
Wash the car`;

const SAMPLE_1 = `Packing list
===

Clothes
---
Socks`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the underline from === to ---' });

  liveDemo(stage, {
    samples: [
      { label: 'Weekend', text: SAMPLE_0 },
      { label: 'Packing', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      '=== under a line makes an h1, --- makes an h2. The underline can be any length, but keep it directly under the text with no blank line between.',
  });

  return () => stage.dispose();
};

export default mount;
