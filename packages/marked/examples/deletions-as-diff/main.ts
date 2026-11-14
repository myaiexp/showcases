// renderer.del shows ~~old -> new~~ as a deletion plus its replacement
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const PLAN = `Team dinner plan:

- Meet at ~~6pm -> 7pm~~ at the harbour
- Table for ~~8 -> 10~~ people
- Menu: ~~pizza~~ (cancelled)
- Pay by ~~cash -> card~~`;

const CARD = `Meet at ~~6pm -> 7pm~~
Table for ~~8 -> 10~~
~~pizza~~ (cancelled)`;

const ARROW = /\s*(?:-&gt;|→)\s*/;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Write ~~old -> new~~ for a change, or ~~word~~ alone' });

  const edits = new Marked({
    renderer: {
      del({ tokens }) {
        const html = this.parser.parseInline(tokens);
        // The arrow was escaped to -&gt; on its way through the inline parser.
        const [oldText, ...rest] = html.split(ARROW);
        const next = rest.join(' ');
        return next
          ? `<del class="old">${oldText}</del> <ins class="new">${next}</ins>`
          : `<del class="old">${oldText}</del>`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : PLAN }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'del override', render: (md) => render(edits, md) },
    ],
    caption: 'Strikethrough text that contains an arrow becomes a red deletion followed by a green insertion, like a tracked change. Without an arrow it is just a red deletion.',
  });

  return () => stage.dispose();
};

export default mount;
