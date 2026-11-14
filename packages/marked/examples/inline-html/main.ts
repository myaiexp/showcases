// Inline HTML: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `Press <kbd>Ctrl</kbd>+
<kbd>S</kbd> to <mark>save</mark>
H<sub>2</sub>O`;

const SAMPLE_1 = `Meet at <mark>6pm</mark>
x<sup>2</sup> is **<u>big</u>**`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add your own <kbd>, <mark>, <sub> or <sup>' });

  liveDemo(stage, {
    samples: [
      { label: 'Keys', text: SAMPLE_0 },
      { label: 'Notes', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'kbd, mark, sub and sup are copied unchanged into the page. Markdown still works inside them: **bold** between the tags is bold.',
  });

  return () => stage.dispose();
};

export default mount;
