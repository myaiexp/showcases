// Editor config: resizeLine styles the edge resize areas
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the top edge (moves) and the right edge (resizes)." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {
    resizeLine: [
      { pointType: 'move', fill: 'rgba(228,87,46,0.25)' },
      { fill: 'rgba(50,120,255,0.25)' },
    ], // top/bottom move, left/right resize
  } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'x ' + r1(rect.x) + '  y ' + r1(rect.y) + '  width ' + r1(rect.width));
  if (ghost) {
    script(stage, async () => {
      restore();
      await stage.wait(600);
      await pull(app, ghost, rect, [0.5, 0], [24, 14], undefined, 900);
      await stage.wait(700);
      await pull(app, ghost, rect, [1, 0.5], [22, 0], undefined, 900);
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
