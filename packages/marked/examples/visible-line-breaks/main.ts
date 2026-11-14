// renderer.br draws a ↵ wherever a line break was made
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const POEM = `Roses are red
Violets are blue
Sugar is sweet
and so are you

Send it to:
Ada Lovelace
12 Mill Lane`;

const CARD = `Roses are red
Violets are blue
Sugar is sweet`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press Enter inside a paragraph' });

  // breaks: true makes every newline inside a paragraph a <br>; the override marks each one.
  const marked = new Marked({
    breaks: true,
    renderer: {
      br() {
        return '<span class="br" title="line break">↵</span><br>';
      },
    },
  });
  const plain = new Marked({ breaks: true });

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : POEM }],
    sides: [
      { label: 'default br', render: (md) => render(plain, md) },
      { label: 'br override', render: (md) => render(marked, md) },
    ],
    caption: 'Both sides use breaks: true. The override adds a faint ↵ before each <br>, so you can see where Marked made line breaks.',
  });

  return () => stage.dispose();
};

export default mount;
