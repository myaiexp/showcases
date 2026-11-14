// tokenizer.url returns nothing, so only <angle-bracket> links stay clickable
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const NOTE = `Menu: https://cafe.example/menu
Site: www.cafe.example
Mail: hello@cafe.example

On purpose: <https://cafe.example/book>
Written: [booking](https://cafe.example/book)`;

const CARD = `Menu: https://c.fi
Site: www.c.fi
Mail: me@c.fi
Pick: <https://c.fi>`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a web address, an e-mail address or <https://...>' });

  // The GFM bare-address matcher is off; autolink (<...>) and link ([...](...)) are untouched.
  const noBare = new Marked({
    tokenizer: {
      url() {
        return undefined;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : NOTE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'url off', render: (md) => render(noBare, md) },
    ],
    caption:
      'Bare addresses stop turning into links, so a comment cannot slip in a live link by accident; only the writer who deliberately uses <angle brackets> or [text](url) gets one.',
  });

  return () => stage.dispose();
};

export default mount;
