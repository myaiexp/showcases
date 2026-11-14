// Links: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `See [map](/map "Open map")

Or [home](/home).`;

const SAMPLE_1 = `Read the **[menu](/menu)**
or [call us](tel:5550)`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the text or the address' });

  liveDemo(stage, {
    samples: [
      { label: 'Map link', text: SAMPLE_0 },
      { label: 'Bold link', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'Hover the second link to see its title as a tooltip. Links in this preview do not navigate.',
  });

  return () => stage.dispose();
};

export default mount;
