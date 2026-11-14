// Fenced code blocks: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `\`\`\`js
let n = 3;
n += 1
\`\`\``;

const SAMPLE_1 = `~~~py
name = "Ada"
print(name)
~~~`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the word after the opening fence' });

  liveDemo(stage, {
    samples: [
      { label: 'JavaScript', text: SAMPLE_0 },
      { label: 'Tildes, Python', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'Look for class="language-js" in the HTML: Marked only labels the block, a highlighting library would use the label to colour it.',
  });

  return () => stage.dispose();
};

export default mount;
