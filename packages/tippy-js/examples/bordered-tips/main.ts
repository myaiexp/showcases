// Tips with an outline, using border.css: a pointed arrow and a doubled round arrow
import tippy, { roundArrow } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/dist/border.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover both buttons: the arrow keeps the outline.' });

  const row = document.createElement('div');
  row.className = 'row';
  const pointed = document.createElement('button');
  pointed.className = 'btn';
  pointed.textContent = 'Pointed arrow';
  const round = document.createElement('button');
  round.className = 'btn';
  round.textContent = 'Round arrow';
  row.append(pointed, round);
  stage.root.append(row);

  // CSS arrow: border.css lets the arrow inherit the box's border colour.
  stage.own(
    tippy(pointed, { content: 'Outline all the way round', theme: 'outlined', appendTo: stage.root }),
  );
  // SVG arrow: two copies stacked, the first one is the outline, the second the fill.
  stage.own(
    tippy(round, {
      content: 'Outline on the round arrow too',
      theme: 'outlined-round',
      arrow: roundArrow + roundArrow,
      appendTo: stage.root,
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const button of [pointed, round]) {
        await stage.ghost.hover(button, 650);
        await wait(1500);
      }
      stage.ghost.leave();
      await wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
