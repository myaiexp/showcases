// Blank lines inside a nested list: paragraphs inside items, or outside
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { outlineDocs } from '../../shared/broken-kit.ts';

// The ambiguous input from docs/broken.md.
const SOURCE = `* hello
  * world
    how

    are
    you

  * today
* hi`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the indentation and watch the boxes move' });

  const standard = new Marked();
  // pedantic: "conform to the original markdown.pl as much as possible".
  const pedantic = new Marked({ pedantic: true });

  compareDemo(stage, {
    samples: [{ label: 'From the docs', text: SOURCE }],
    sides: [
      { label: 'Marked (default)', render: (md) => standard.parse(md, { async: false }) },
      { label: 'pedantic: true', render: (md) => pedantic.parse(md, { async: false }) },
    ],
    caption: "Default rules keep 'are you' inside the 'world' item as a second paragraph; pedantic closes that list at the blank line, the same structure the docs quote from markdown.pl.",
  });
  outlineDocs(stage);

  return () => stage.dispose();
};

export default mount;
