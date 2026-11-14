// renderer.codespan shows a colour chip beside any `#rrggbb` code
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const PALETTE = `Our brand colours:

- Sunset orange: \`#ff8800\`
- Deep sea: \`#1e4d7b\`
- Moss: \`#5a8f3e\`
- Cream: \`#fff3d6\`

Other code stays code: \`npm install\` or \`#nothex\`.`;

const CARD = `Orange \`#ff8800\`
Sea \`#1e4d7b\`
Run \`npm start\``;

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Write a colour like `#c0392b` in backticks' });

  const swatches = new Marked({
    renderer: {
      codespan({ text }) {
        // The pattern allows only hex digits, so the value is safe to put in a style.
        if (!HEX.test(text)) return false;
        return `<code class="swatch-code"><span class="chip" style="background:${text}"></span>${esc(text)}</code>`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : PALETTE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'codespan override', render: (md) => render(swatches, md) },
    ],
    caption: 'Inline code that looks like a hex colour gets a square of that colour. Code that is not a colour is left alone.',
  });

  return () => stage.dispose();
};

export default mount;
