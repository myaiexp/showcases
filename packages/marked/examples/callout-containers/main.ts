// A block extension: :::note ... ::: becomes a callout of full Markdown
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Booking a table:

:::tip
Ask for the **window seats**:
- quieter
- better view
:::

:::warning
The kitchen closes at *21:00*.
:::

Back to normal text.`;

const CARD = `:::tip
Ask for the
**window seats**
:::

:::warning
Kitchen closes
at *21:00*
:::`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wrap lines between :::note, :::tip or :::warning and :::' });

  const docs = new Marked({
    extensions: [
      {
        name: 'callout',
        level: 'block',
        start: (src) => src.indexOf(':::'),
        tokenizer(src) {
          const match = /^:::(note|tip|warning)\n([\s\S]*?)\n:::[ \t]*(?:\n|$)/.exec(src);
          if (!match) return undefined;
          // blockTokens lexes the body as full Markdown: lists, bold, even nested containers.
          return { type: 'callout', raw: match[0], kind: match[1]!, tokens: this.lexer.blockTokens(match[2]!, []) };
        },
        renderer(token) {
          const kind = String(token.kind);
          return `<div class="callout ${kind}"><div class="callout-title">${esc(kind)}</div>${this.parser.parse(token.tokens ?? [])}</div>\n`;
        },
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(docs, md),
    caption: 'Everything between the ::: lines goes into a coloured box, and the text inside is still Markdown: bold, italic and the list all work.',
  });

  return () => stage.dispose();
};

export default mount;
