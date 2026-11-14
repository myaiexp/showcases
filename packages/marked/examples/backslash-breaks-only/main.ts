// tokenizer.br: only a trailing backslash breaks a line, not spaces
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

// Lines 1 and 3 end in two spaces (invisible), line 2 and 4 in a backslash.
const ADDRESS = `Anna Virtanen  \nMain Street 4\\\nHelsinki  \nFinland\\\n00100`;
const CARD = `Anna V.  \nMain St 4\\\nHelsinki  \n00100`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'This sample ends lines 1 and 3 with two invisible spaces and lines 2 and 4 with a backslash',
  });

  const visibleBreaks = new Marked({
    tokenizer: {
      br(src) {
        if (/^ {2,}\n/.test(src)) return undefined; // trailing spaces: not a break
        return false; // backslash + newline: the built-in tokenizer
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : ADDRESS }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'br override', render: (md) => render(visibleBreaks, md) },
    ],
    caption:
      'Two trailing spaces break a line in the default column even though nobody can see them (an editor may even strip them). The override breaks only where a visible backslash sits, so the lines with spaces run together.',
  });

  return () => stage.dispose();
};

export default mount;
