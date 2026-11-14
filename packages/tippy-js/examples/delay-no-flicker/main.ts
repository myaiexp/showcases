// Two toolbars: the top shows tips instantly (and flickers), the bottom waits before showing
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const TOOLS: [string, string][] = [
  ['B', 'Bold'],
  ['I', 'Italic'],
  ['U', 'Underline'],
  ['S', 'Strikethrough'],
  ['<>', 'Code'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Sweep the mouse quickly across each toolbar, then stop on a button.' });
  const rows: HTMLElement[][] = [];

  for (const waits of [false, true]) {
    const wrap = document.createElement('div');
    wrap.className = 'tools';
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = waits ? 'Waits 400 ms before showing' : 'Shows at once';
    const bar = document.createElement('div');
    bar.className = 'bar';
    const buttons = TOOLS.map(([glyph, tip]) => {
      const b = document.createElement('button');
      b.className = 'btn tool';
      b.textContent = glyph;
      b.setAttribute('aria-label', tip);
      bar.append(b);
      stage.own(
        tippy(b, {
          content: tip,
          // Show delay 400 ms, hide delay 0: a fly-by never lasts long enough to open a tip.
          delay: waits ? [400, 0] : 0,
          placement: waits ? 'bottom' : 'top',
          duration: [120, 80],
          appendTo: stage.root,
        }),
      );
      return b;
    });
    rows.push(buttons);
    wrap.append(caption, bar);
    stage.root.append(wrap);
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const buttons of rows) {
        for (const b of buttons) {
          await stage.ghost.hover(b, 170);
          await wait(80);
        }
        await wait(1100);
        stage.ghost.leave();
        await wait(300);
      }
    });
  }

  return stage.dispose;
};

export default mount;
