// renderer.code wraps a fenced block in a numbered, labelled box
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const SNIPPET = '```js\nlet total = 0;\nfor (const n of cart) {\n  total += n.price;\n}\n```';
const CARD = '```js\nlet a = 1;\nlet b = 2;\nlet c = a + b;\n```';
const SHELL = '```sh\ncd trip-planner\nnpm install\nnpm start\n```';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the code, or the language after the three backticks' });

  const numbered = new Marked({
    renderer: {
      code({ text, lang }) {
        const label = (lang ?? '').trim().split(/\s/)[0] ?? '';
        const lines = text
          .split('\n')
          .map((line) => `<span class="ln">${esc(line) || ' '}</span>`)
          .join('');
        const badge = label ? `<span class="lang">${esc(label)}</span>` : '';
        return `<div class="codebox">${badge}<pre><code>${lines}</code></pre></div>\n`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: stage.preview
      ? [{ text: CARD }]
      : [
          { label: 'JavaScript', text: SNIPPET },
          { label: 'Shell', text: SHELL },
        ],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'code override', render: (md) => render(numbered, md) },
    ],
    caption:
      'The code renderer receives the code and its language, so it can print a language badge and a number beside every line.',
  });

  return () => stage.dispose();
};

export default mount;
