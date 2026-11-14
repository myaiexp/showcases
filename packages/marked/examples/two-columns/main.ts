// A block extension splits :::columns on a ||| line into two columns
import { Marked, type Tokens } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `## Weekend camping

:::columns
**Bring from home**
- Tent
- Sleeping bags
- Torch
|||
**Buy on the way**
- Gas canister
- Firewood
- *Fresh* bread
:::

Meet at the car park at 8.`;

const CARD = `:::columns
**Home**
- Tent
- Torch
|||
**Shop**
- Gas
- Bread
:::`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Put a line with ||| between the two columns' });

  const layout = new Marked({
    extensions: [
      {
        name: 'columns',
        level: 'block',
        start: (src) => src.indexOf(':::columns'),
        tokenizer(src) {
          const match = /^:::columns\n([\s\S]*?)\n:::[ \t]*(?:\n|$)/.exec(src);
          if (!match) return undefined;
          // Each half is lexed on its own, so a list or heading stays inside its column.
          const tokens = match[1]!.split(/\n\|\|\|\n/).map((half) => ({
            type: 'column',
            raw: half,
            tokens: this.lexer.blockTokens(half, []),
          }));
          return { type: 'columns', raw: match[0], tokens };
        },
        renderer(token) {
          const cols = (token.tokens ?? []).map((c) => `<div class="col">${this.parser.parse((c as Tokens.Generic).tokens ?? [])}</div>`);
          return `<div class="columns">${cols.join('')}</div>\n`;
        },
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(layout, md),
    caption: 'Markdown has no columns, so the extension makes them: the text above the ||| line fills the left box, the text below fills the right one.',
  });

  return () => stage.dispose();
};

export default mount;
