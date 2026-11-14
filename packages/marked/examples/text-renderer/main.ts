// renderer.text swaps :) for emoji and highlights a search word in running text
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const CHAT = `Got the milk :) and bread :D

- Out of eggs :(
- Pancakes tomorrow <3
- Don't forget the oat milk`;

const CARD = `Got the milk :)
Pancakes tomorrow <3
Out of eggs :(`;

const FACES: Record<string, string> = { ':)': '🙂', ':D': '😄', ':(': '😞', '<3': '❤️' };
const FACE = /(:\)|:D|:\(|<3)/;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type :) :D :( or <3, and a word to find' });
  let find = 'milk';

  const lively = new Marked({
    breaks: true,
    renderer: {
      text(token) {
        // Block-level text in tight list items wraps child tokens: let the built-in render
        // those, and each child comes back through this override. Escapes keep their built-in.
        if (token.type === 'escape' || ('tokens' in token && token.tokens)) return false;
        const lit = (s: string): string => {
          if (!find) return esc(s);
          const parts = s.split(new RegExp(`(${find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'));
          return parts.map((p, i) => (i % 2 ? `<mark>${esc(p)}</mark>` : esc(p))).join('');
        };
        return token.text
          .split(FACE)
          .map((piece) => FACES[piece] ?? lit(piece))
          .join('');
      },
    },
  });
  const plain = new Marked({ breaks: true });

  const demo = compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : CHAT }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'text override', render: (md) => render(lively, md) },
    ],
    caption: 'The text renderer sees every plain run of words. Here it turns the typed faces into emoji and wraps the word you are searching for in a highlight.',
  });

  if (stage.bar) {
    const label = document.createElement('label');
    label.style.cssText = 'display:flex;gap:6px;align-items:center;font-size:13px';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = find;
    input.placeholder = 'word to find';
    stage.listen(input, 'input', () => {
      find = input.value.trim();
      demo.refresh();
    });
    label.append('Find', input);
    stage.bar.append(label);
  }

  return () => stage.dispose();
};

export default mount;
