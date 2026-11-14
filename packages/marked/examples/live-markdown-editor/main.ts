// Type Markdown, see the page it becomes: marked.parse() on every keystroke
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const NOTE = `# Trip notes

Packed **light** this time:

- passport
- *two* jumpers
- charger

> Leave by 7:00!`;

const RECIPE = `## Pancakes

1. Mix flour, milk, egg
2. Rest **10 min**
3. Fry in butter

Serve with \`jam\`.`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the Markdown on the left' });

  liveDemo(stage, {
    samples: [
      { label: 'Trip notes', text: NOTE },
      { label: 'Recipe', text: RECIPE },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption: 'marked.parse() runs on every keystroke and returns an HTML string; the pane shows it.',
  });

  return () => stage.dispose();
};

export default mount;
