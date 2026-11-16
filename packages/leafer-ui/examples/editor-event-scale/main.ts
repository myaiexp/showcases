// EditorScaleEvent: SCALE reports scaleX, scaleY and the origin
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditorScaleEvent } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, pair, pull, r1 } from '../../shared/editor-kit.ts';
import { logLines } from '../../shared/interaction-demo.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag a corner handle." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  app.editor.select(rect1);
  const log = logLines(stage, 5, true);
  const restore = keep(rect1, app);

  app.editor.on(EditorScaleEvent.SCALE, (e: EditorScaleEvent) => log('SCALE ' + e.scaleX.toFixed(3) + ', ' + e.scaleY.toFixed(3) + ' origin ' + r1(e.worldOrigin.x) + ',' + r1(e.worldOrigin.y) + ' dir ' + app.editor.editBox.dragPoint?.direction));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      restore();
      await stage.wait(600);
      await pull(app, ghost, rect1, [1, 1], [20, 14], undefined, 900);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
