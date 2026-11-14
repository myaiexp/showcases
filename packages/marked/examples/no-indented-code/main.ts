// tokenizer.code returns nothing, so indented text stays an ordinary paragraph
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const MAIL = `Please reply to:

    Anna Virtanen
    anna@example.com

Fenced code is still allowed:

\`\`\`
npm start
\`\`\``;

const CARD = `Reply to:

    Anna V.
    anna@x.fi

\`\`\`
npm start
\`\`\``;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Indent a line by four spaces' });

  // Only the indented-code tokenizer (code) is off; the fenced one (fences) keeps working.
  const noIndented = new Marked({
    tokenizer: {
      code() {
        return undefined;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : MAIL }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'code off', render: (md) => render(noIndented, md) },
    ],
    caption:
      'Pasted text with leading spaces turns into a grey code block by default. With the code tokenizer off it stays a paragraph (the address is even a link again), while the fenced block below is untouched.',
  });

  return () => stage.dispose();
};

export default mount;
