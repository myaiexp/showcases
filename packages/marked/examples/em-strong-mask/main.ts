// An emStrongMask hook hides $...$ formulas from the italic rules
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const SAMPLES = [
  { label: 'Homework', text: '_The formula is $a_ b=c_ d$._' },
  { label: 'Two formulas', text: '_Check $x_1 + x_2$ and $y_ z$ twice._' },
];

const CARD = [{ text: '_The formula is\n$a_ b=c_ d$._' }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Underscores inside $...$ are part of the formula' });

  const plain = new Marked();
  const masked = new Marked({
    hooks: {
      // Marked looks for _ and * pairs in a copy of the text. Here every $...$ block becomes
      // a harmless run of letters in that copy, so its underscores never pair up.
      emStrongMask(src) {
        return src.replace(/\$([^$]+)\$/g, (match) => `[${'a'.repeat(match.length - 2)}]`);
      },
    },
  });

  compareDemo(stage, {
    samples: stage.preview ? CARD : SAMPLES,
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'emStrongMask', render: (md) => render(masked, md) },
    ],
    caption:
      'By default an underscore inside the formula starts the italics early and the sentence is cut in two. With the mask, the whole sentence is italic and the formula stays whole.',
  });
  return () => stage.dispose();
};

export default mount;
