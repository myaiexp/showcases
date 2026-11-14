// tokenizer.escape returns nothing, so backslashes in Windows paths survive
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const PATHS = `Receipts are in C:\\Docs\\_Taxes\\(2024)\\Receipts

Photos: D:\\Trips\\*.jpg

Escapes like \\*this\\* stop working too.`;

const CARD = `C:\\Docs\\_Tax\\(2024)

D:\\Trips\\*.jpg`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a backslash before a punctuation mark such as _ ( * or #' });

  // No backslash escapes at all: a backslash is always a plain character.
  const keep = new Marked({
    tokenizer: {
      escape() {
        return undefined;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : PATHS }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'escape off', render: (md) => render(keep, md) },
    ],
    caption:
      'A backslash before punctuation is an escape, so the default drops it and the path loses its slashes. With the escape tokenizer off the path survives, and the price is that \\*this\\* can no longer be escaped.',
  });

  return () => stage.dispose();
};

export default mount;
