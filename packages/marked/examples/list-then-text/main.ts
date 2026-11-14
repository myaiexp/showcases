// Where does text after a nested list belong? Default rules vs pedantic
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { outlineDocs } from '../../shared/broken-kit.ts';

// The ambiguous input from docs/broken.md.
const SOURCE = `  * item1

    * item2

  text`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the indentation and watch the boxes move' });

  const standard = new Marked();
  // pedantic: "conform to the original markdown.pl as much as possible".
  const pedantic = new Marked({ pedantic: true });

  compareDemo(stage, {
    samples: [{ label: 'From the docs', text: SOURCE }, { label: 'Text indented 4', text: SOURCE.replace('\n  text', '\n    text') }],
    sides: [
      { label: 'Marked (default)', render: (md) => standard.parse(md, { async: false }) },
      { label: 'pedantic: true', render: (md) => pedantic.parse(md, { async: false }) },
    ],
    caption: "Default (CommonMark) rules count the item's content as starting 4 columns in, so 'text' at 2 spaces leaves the list; pedantic keeps it inside the first item, as the docs show Marked doing.",
  });
  outlineDocs(stage);

  return () => stage.dispose();
};

export default mount;
