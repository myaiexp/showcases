// Three nested bullets and an indented line: who nests under whom
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { outlineDocs } from '../../shared/broken-kit.ts';

// The ambiguous input from docs/broken.md.
const SOURCE = `* hello
  * world
    * hi
          code`;

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
    caption: "Default rules nest each bullet one level deeper; pedantic sees 'hi' as a sibling of 'world'. In both, the indented 'code' line joins 'hi' rather than becoming a code block.",
  });
  outlineDocs(stage);

  return () => stage.dispose();
};

export default mount;
