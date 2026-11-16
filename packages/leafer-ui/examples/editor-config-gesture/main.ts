// Editor config: gesture modes add touch gestures
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "On a touch screen, drag, pinch and twist with two fingers; the mouse still works as usual." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, mobile: true, editor: { moveable: 'gesture', resizeable: 'gesture', rotateable: 'gesture' } as never }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'x ' + r1(rect.x) + '  width ' + r1(rect.width) + '  rotation ' + r1(rect.rotation));
  if (ghost) {
    script(stage, async () => {
      restore();
      await stage.wait(600);
      await pull(app, ghost, rect, [0.5, 0.5], [40, 18]);
      await stage.wait(1500);
    });
  }
  return stage.dispose;
};

export default mount;
