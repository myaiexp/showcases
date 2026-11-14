// Autolinks: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `<https://example.com>
<hi@example.com>`;

const SAMPLE_1 = `Visit www.example.com
or https://a.org/x
mail me@example.com`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type an address into a sentence' });

  liveDemo(stage, {
    samples: [
      { label: 'Angle brackets', text: SAMPLE_0 },
      { label: 'Bare addresses', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      '<angle brackets> always link. Bare https://, www. and email addresses link because of GFM; the HTML shows the address Marked chose.',
  });

  return () => stage.dispose();
};

export default mount;
