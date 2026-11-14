// Inline extensions for ^sup^ and ~sub~, run before built-in ~~del~~
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Water is H~2~O and E = mc^2^.
The 1^st^ of May, CO~2~ at 5m^3^.
~~Cancelled~~ still strikes through.`;

const CARD = `H~2~O and mc^2^
1^st^ of May
~~Cancelled~~`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try ^up^ and ~down~, then ~~strike~~' });

  const script = new Marked({
    extensions: [
      {
        name: 'superscript',
        level: 'inline',
        start: (src) => src.indexOf('^'),
        tokenizer(src) {
          const match = /^\^([^^\s]+)\^/.exec(src);
          return match ? { type: 'superscript', raw: match[0], text: match[1]! } : undefined;
        },
        renderer: (token) => `<sup>${String(token.text)}</sup>`,
      },
      {
        name: 'subscript',
        level: 'inline',
        start: (src) => src.indexOf('~'),
        tokenizer(src) {
          // One tilde on each side, no spaces; "~~x~~" does not match, so strikethrough keeps it.
          const match = /^~([^~\s]+)~/.exec(src);
          return match ? { type: 'subscript', raw: match[0], text: match[1]! } : undefined;
        },
        renderer: (token) => `<sub>${String(token.text)}</sub>`,
      },
    ],
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'with extensions', render: (md) => render(script, md) },
    ],
    caption: 'By default ~2~ is struck through and ^2^ stays literal. The extensions run before the built-in strikethrough, so ~2~ drops below the line and ^2^ rises, while ~~double~~ tildes still strike.',
  });

  return () => stage.dispose();
};

export default mount;
