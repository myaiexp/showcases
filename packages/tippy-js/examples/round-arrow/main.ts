// A rounded SVG arrow, coloured through a theme's fill, next to the pointed default
import tippy, { roundArrow } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const OPTIONS = [
  { label: 'Pointed', tip: 'The default arrow', theme: '', round: false },
  { label: 'Violet round', tip: 'A rounded arrow', theme: 'violet', round: true },
  { label: 'Mint round', tip: 'Same shape, new colour', theme: 'mint', round: true },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover the three buttons.' });

  const row = document.createElement('div');
  row.className = 'row';
  const buttons = OPTIONS.map((o) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = o.label;
    row.append(b);
    return b;
  });
  stage.root.append(row);

  buttons.forEach((button, i) => {
    const o = OPTIONS[i]!;
    stage.own(
      tippy(button, {
        content: o.tip,
        // roundArrow is an SVG string exported by the package.
        arrow: o.round ? roundArrow : true,
        theme: o.theme,
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
