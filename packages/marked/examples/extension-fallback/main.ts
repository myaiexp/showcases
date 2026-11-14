// Two extensions share a name; the later one returns false to fall back
import { Marked, type TokenizerAndRendererExtension } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Today's list:
- ==Call the dentist== (urgent!)
- ==Water the plants==
- ==URGENT: pay the rent==
- ==Buy bread==`;

const CARD = `==Water plants==
==URGENT: rent==
==Buy bread==`;

// First extension: knows how to read ==text== and draws a plain yellow mark.
const first: TokenizerAndRendererExtension = {
  name: 'mark',
  level: 'inline',
  start: (src) => src.indexOf('=='),
  tokenizer(src) {
    const match = /^==([^=\n]+)==/.exec(src);
    return match ? { type: 'mark', raw: match[0], text: match[1]! } : undefined;
  },
  renderer: (token) => `<mark>${esc(String(token.text))}</mark>`,
};

// Second extension, same name, added later: it only has a renderer and runs first.
const urgent = (fallback: boolean): TokenizerAndRendererExtension => ({
  name: 'mark',
  renderer(token) {
    const text = String(token.text);
    if (/^urgent/i.test(text)) return `<mark class="urgent">${esc(text)}</mark>`;
    return fallback ? false : undefined;
  },
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Start a mark with URGENT to get the red one' });

  const one = new Marked({ extensions: [first] });
  const withFalse = new Marked({ extensions: [first, urgent(true)] });
  const withNothing = new Marked({ extensions: [first, urgent(false)] });

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    sides: stage.preview
      ? [
          { label: 'return false', render: (md) => render(withFalse, md) },
          { label: 'return nothing', render: (md) => render(withNothing, md) },
        ]
      : [
          { label: 'first extension only', render: (md) => render(one, md) },
          { label: 'later one returns false', render: (md) => render(withFalse, md) },
          { label: 'later one returns nothing', render: (md) => render(withNothing, md) },
        ],
    caption:
      'The later extension handles "URGENT" marks in red. For the others it returns false, so Marked falls back to the first extension\'s yellow mark. When it returns nothing instead, those marks come out empty.',
  });

  return () => stage.dispose();
};

export default mount;
