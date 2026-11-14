// tokenizer.del: only ~~double tildes~~ strike text, a lone ~ pair stays literal
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const TRIP = `Hike: ~3 hours~ one way
Bus: ~25 min~ from town
~~Taxi~~ too expensive`;

const CARD = `Hike ~3 hours~
Bus ~25 min~
~~Taxi~~ no`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wrap text in ~one~ or ~~two~~ tildes' });

  const strictDel = new Marked({
    tokenizer: {
      del(src) {
        // A strikethrough that opens with exactly one tilde is not one: no token, so literal text.
        if (/^~(?!~)/.test(src)) return undefined;
        return false;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : TRIP }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'del override', render: (md) => render(strictDel, md) },
    ],
    caption:
      'People write "~3 hours~" to mean "about". By default a pair of single tildes strikes the words out; the override keeps them readable and only ~~double tildes~~ strike.',
  });

  return () => stage.dispose();
};

export default mount;
