// HTML blocks: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `<details open>
<summary>FAQ</summary>
*Yes, we ship.*
</details>`;

const SAMPLE_1 = `<details open>
<summary>FAQ</summary>

*Yes, we ship.*

</details>`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add blank lines inside the block' });

  liveDemo(stage, {
    samples: [
      { label: 'No blank lines', text: SAMPLE_0 },
      { label: 'Blank lines', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'Compare the two samples: with no blank lines the *stars* stay literal, with blank lines around the text Marked converts it.',
  });

  return () => stage.dispose();
};

export default mount;
