// tokenizer.html and tag return nothing, so typed tags show up as visible text
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const POST = `Great tip, <b>thanks</b>! I used <i>fresh</i> basil.

<div style="color:red">SHOUTING BOX</div>

*Markdown* still works.`;

const CARD = `Nice <b>tip</b>!

<div>big box</div>

*Markdown* works`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type some <tags> and see whether they are used or shown' });

  // block-level (html) and inline (tag) HTML tokenizers both off.
  const noHtml = new Marked({
    tokenizer: {
      html() {
        return undefined;
      },
      tag() {
        return undefined;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : POST }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'html + tag off', render: (md) => render(noHtml, md) },
    ],
    caption:
      'By default typed tags pass straight through (bold, italics, a red box). With the two tokenizers off they are shown as the characters the writer typed, while *Markdown* keeps working.',
  });

  return () => stage.dispose();
};

export default mount;
