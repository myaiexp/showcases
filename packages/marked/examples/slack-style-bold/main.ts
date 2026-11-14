// tokenizer.emStrong: *one star* means bold, as in chat apps
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const CHAT = `*Reminder*: team lunch at noon.
Bring _a dish_ to share.
**Double stars** still work, and so does ***both***.`;

const CARD = `*Reminder*: lunch
Bring _a dish_
**Double** works`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wrap words in single stars, underscores or double stars' });

  const chatBold = new Marked({
    tokenizer: {
      emStrong(src) {
        // A single * ... * pair, no stars inside: make it strong (bold) instead of em (italic).
        const match = /^\*([^*\s](?:[^*]*[^*\s])?)\*(?!\*)/.exec(src);
        if (match) {
          return { type: 'strong', raw: match[0], text: match[1]!, tokens: this.lexer.inlineTokens(match[1]!) };
        }
        return false; // _x_, **x** and ***x*** go to the built-in tokenizer
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : CHAT }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'emStrong override', render: (md) => render(chatBold, md) },
    ],
    caption:
      '*Reminder* leans in the default column and turns bold in the override, the way chat apps treat a single star. The underscore and double-star cases are handed back with false.',
  });

  return () => stage.dispose();
};

export default mount;
