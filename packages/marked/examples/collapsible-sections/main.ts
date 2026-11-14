// A block extension turns +++ Title ... +++ into a <details> section
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `# Camping FAQ

+++open What should I pack?
- Tent and **sleeping bag**
- Stove, gas, matches
- Water for *two days*
+++

+++ Where do we park?
The car park by the lake is free until 18:00.
+++

+++ What if it rains?
There is a covered kitchen hut near the shop.
+++`;

const CARD = `+++open Pack?
- Tent
- **Stove**
+++

+++ Parking?
Free by the lake.
+++`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Start a block with "+++ Question" and end it with "+++"' });

  const faq = new Marked({
    extensions: [
      {
        name: 'collapsible',
        level: 'block',
        start: (src) => src.indexOf('+++'),
        tokenizer(src) {
          const match = /^\+\+\+(open)? *([^\n]+)\n([\s\S]*?)\n\+\+\+[ \t]*(?:\n|$)/.exec(src);
          if (!match) return undefined;
          return {
            type: 'collapsible',
            raw: match[0],
            open: Boolean(match[1]),
            title: match[2]!.trim(),
            tokens: this.lexer.blockTokens(match[3]!, []),
          };
        },
        renderer(token) {
          return `<details${token.open ? ' open' : ''}><summary>${esc(String(token.title))}</summary>${this.parser.parse(token.tokens ?? [])}</details>\n`;
        },
      },
    ],
  });

  // Cards have no pointer, so a timer flips every section instead of a click.
  let flip = false;
  const apply = (body: HTMLElement): void => {
    body.querySelectorAll('details').forEach((d, i) => {
      d.open = i === 0 ? !flip : flip;
    });
  };
  const live = liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(faq, md),
    caption: 'Each +++ block is a section with a title. Click a title to open or close it; "+++open" starts it open. The body is still Markdown.',
    after: (doc) => {
      if (stage.preview) apply(doc.body);
    },
  });
  if (stage.preview) {
    stage.every(1800, () => {
      flip = !flip;
      apply(live.doc.body);
    });
  }

  return () => stage.dispose();
};

export default mount;
