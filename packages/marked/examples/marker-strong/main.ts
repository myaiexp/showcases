// renderer.strong paints **bold** text like a highlighter pen
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { select } from '../../shared/controls.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const NOTES = `Revision notes:

- The **mitochondria** makes energy for the cell.
- Photosynthesis needs **light**, **water** and **carbon dioxide**.
- Exam is on **Thursday** at 9:00.`;

const CARD = `The **exam** is on
**Thursday** at 9.
Bring a **pencil**.`;

const COLOURS = ['yellow', 'pink', 'green'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wrap words in **double stars**' });
  let colour: (typeof COLOURS)[number] = 'yellow';

  const pen = new Marked({
    renderer: {
      strong({ tokens }) {
        return `<strong class="pen ${colour}">${this.parser.parseInline(tokens)}</strong>`;
      },
    },
  });
  const plain = new Marked();

  const demo = compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : NOTES }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'strong override', render: (md) => render(pen, md) },
    ],
    caption: 'The same **bold** syntax, but the renderer paints a highlighter stroke behind the word instead of just thickening it.',
  });
  if (stage.bar) {
    select(stage.bar, 'Pen', COLOURS, (c) => {
      colour = c;
      demo.refresh();
    });
  }

  return () => stage.dispose();
};

export default mount;
