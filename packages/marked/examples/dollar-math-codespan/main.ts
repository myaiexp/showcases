// tokenizer.codespan: a $formula$ at the start of a line becomes a code chip
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const NOTES = `$ E = mc^2 $

$ area = pi r^2 $ is the circle rule.

Mid-sentence, $ a + b $ stays plain.

And a normal \`code\` span still works.`;

const CARD = `$ E = mc^2 $

Rule: $ a + b $

\`code\` works`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Start a line with $ formula $ and watch it turn into a chip' });

  // The docs' codespan override: $...$ becomes a codespan token, anything else returns false.
  const maths = new Marked({
    tokenizer: {
      codespan(src) {
        const match = src.match(/^\$+([^$\n]+?)\$+/);
        if (match) return { type: 'codespan', raw: match[0], text: match[1]!.trim() };
        return false;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : NOTES }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'codespan override', render: (md) => render(maths, md) },
    ],
    caption:
      'Formulas wrapped in dollar signs become code chips, but only where a paragraph (or a bold or link span) starts with one: the lexer swallows plain text up to the next special character (such as *, _, `, [ or \\) before this tokenizer gets a look, so the mid-sentence one stays literal.',
  });

  return () => stage.dispose();
};

export default mount;
