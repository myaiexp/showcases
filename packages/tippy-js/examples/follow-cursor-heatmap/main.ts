// A commit calendar with one tooltip that follows the cursor and names the day under it
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { commits, describe, WEEKS } from './calendar.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Move the mouse over the squares.' });

  const grid = document.createElement('div');
  grid.className = 'grid';
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      const cell = document.createElement('div');
      cell.className = `cell level-${Math.min(4, Math.ceil(commits(w, d) / 2.5))}`;
      grid.append(cell);
    }
  }
  stage.root.append(grid);

  // Which square is under a point? Worked out from the grid's own box.
  const cellAt = (x: number, y: number): string => {
    const r = grid.getBoundingClientRect();
    const w = Math.min(WEEKS - 1, Math.max(0, Math.floor(((x - r.left) / r.width) * WEEKS)));
    const d = Math.min(6, Math.max(0, Math.floor(((y - r.top) / r.height) * 7)));
    return describe(w, d);
  };

  const tip = stage.own(
    tippy(grid, {
      content: 'Hover a square',
      // One tip for the whole grid: it trails the cursor instead of sitting on the grid.
      followCursor: stage.preview ? false : true,
      plugins: [followCursor],
      placement: 'top',
      offset: [0, 8],
      appendTo: stage.root,
    }),
  );

  if (!stage.preview) {
    grid.addEventListener('mousemove', (e) => tip.setContent(cellAt(e.clientX, e.clientY)));
  } else {
    // Card: the drawn pointer stands in for the mouse, so the tip is pinned to it.
    tip.setProps({ getReferenceClientRect: stage.ghost.clientRect });
    stage.ghost.track(() => {
      const p = stage.ghost.clientRect();
      tip.setContent(cellAt(p.x, p.y));
      void tip.popperInstance?.update();
    });
    stage.play(async (wait) => {
      const box = stage.root.getBoundingClientRect();
      const r = grid.getBoundingClientRect();
      const at = (fx: number, fy: number) => ({ x: r.left - box.left + r.width * fx, y: r.top - box.top + r.height * fy });
      await stage.ghost.moveTo(at(0.08, 0.3), 500);
      tip.show();
      for (const [fx, fy] of [[0.35, 0.6], [0.6, 0.2], [0.85, 0.75], [0.5, 0.9]] as const) {
        await stage.ghost.moveTo(at(fx, fy), 900);
        await wait(250);
      }
      tip.hide();
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
