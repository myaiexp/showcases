// tokenizer.list steps aside for four-digit years and returns false for real lists
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const NOTE = `1986. A great year for bread.

Today's shopping:

1. Milk
2. Eggs
3. Flour`;

const CARD = `1986. Great year.

Shopping:

1. Milk
2. Eggs`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Start a line with a number and a full stop' });

  const yearSafe = new Marked({
    tokenizer: {
      list(src) {
        // "1986. " or "2024) " is a year, not item 1986 of a list: no list token, so a paragraph.
        if (/^ {0,3}\d{4,}[.)][ \t]/.test(src)) return undefined;
        return false; // anything else: the built-in list tokenizer
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : NOTE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'years stay text', render: (md) => render(yearSafe, md) },
    ],
    caption:
      'A sentence that opens with a year becomes a one-item numbered list that starts at 1986. The override leaves it as a sentence, and the real shopping list still counts 1, 2, 3.',
  });

  return () => stage.dispose();
};

export default mount;
