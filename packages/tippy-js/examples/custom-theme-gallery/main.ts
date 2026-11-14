// Three hand-made themes (gradient, retro, forest) on three buttons, with no arrow
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const THEMES = [
  { theme: 'gradient', tip: 'Soft colour fade' },
  { theme: 'retro', tip: 'INSERT COIN TO CONTINUE' },
  { theme: 'forest', tip: 'Quiet, earthy, a bit leafy' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Hover each button.' });

  const row = document.createElement('div');
  row.className = 'row';
  const buttons = THEMES.map((t) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = t.theme;
    row.append(b);
    return b;
  });
  stage.root.append(row);

  // Any CSS can be a theme. With arrow off, the box is all there is to style.
  buttons.forEach((button, i) => {
    stage.own(
      tippy(button, {
        content: THEMES[i]!.tip,
        theme: THEMES[i]!.theme,
        arrow: false,
        appendTo: stage.root,
      }),
    );
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const button of buttons) {
        await stage.ghost.hover(button, 600);
        await wait(1200);
      }
      stage.ghost.leave();
      await wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
