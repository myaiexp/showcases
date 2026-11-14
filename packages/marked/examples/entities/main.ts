// HTML entities: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `&copy; 2026 Ada &amp; Sam
&#9731; &#x2764; &hearts;
Tom & Jerry`;

const SAMPLE_1 = `5 < 6 and 7 > 3
AT&T costs &euro;5`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try &hearts; &euro; or &#9731;' });

  liveDemo(stage, {
    samples: [
      { label: 'Symbols', text: SAMPLE_0 },
      { label: 'Stray symbols', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'Codes like &copy; and &#9731; show as symbols in the page. A loose & is written as &amp; in the HTML so the browser reads it as plain text.',
  });

  return () => stage.dispose();
};

export default mount;
