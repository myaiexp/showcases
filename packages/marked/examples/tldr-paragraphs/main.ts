// renderer.paragraph turns a "TL;DR:" paragraph into a summary box
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const POST = `TL;DR: the **bakery** is closed Mondays, open until 6 otherwise.

I walked past three times last week before I noticed the sign in the window. The sourdough sells out by noon.

TL;DR: go early.`;

const CARD = `TL;DR: **closed** Mondays

I walked past three times.

TL;DR: go early`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Start any paragraph with TL;DR:' });

  const summary = new Marked({
    renderer: {
      paragraph({ tokens, text }) {
        if (!/^tl;?dr:?\s/i.test(text)) return false;
        const body = this.parser.parseInline(tokens).replace(/^tl;?dr:?\s*/i, '');
        return `<aside class="tldr"><b>TL;DR</b><p>${body}</p></aside>\n`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : POST }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'paragraph override', render: (md) => render(summary, md) },
    ],
    caption: 'A paragraph that begins with TL;DR becomes a highlighted summary box. Every other paragraph falls back to the built-in one.',
  });

  return () => stage.dispose();
};

export default mount;
