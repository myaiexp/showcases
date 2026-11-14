// tokenizer.heading and lheading return nothing: # stays plain text
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const COMMENT = `# 1 fan of this place!
Great coffee, great staff.

Best bakery in town
===================

## Tip
Go early.`;

const CARD = `# 1 fan!
Great coffee

Best bakery
===========`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try # and ## at the start of a line, or an underline of = or -' });

  // Returning nothing (not false) means "no heading here": the text falls through to a paragraph.
  const noHeadings = new Marked({
    tokenizer: {
      heading() {
        return undefined;
      },
      lheading() {
        return undefined;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : COMMENT }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'headings off', render: (md) => render(noHeadings, md) },
    ],
    caption:
      'In a comment box a stray "# 1 fan" should not shout at the reader: with both heading tokenizers switched off, the # lines and the === underline are just text.',
  });

  return () => stage.dispose();
};

export default mount;
