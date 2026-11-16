// Editor config: circle adds a rotation handle
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, r1, solo, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the circle under the rect sideways." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { circle: {} } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'rotation ' + r1(rect.rotation));
  if (ghost) {
    script(stage, async () => {
      restore();
      await stage.wait(700);
      const c = spot(app.editor.editBox.circle);
      await ghost.drag(c, { x: c.x + 50, y: c.y - 20 }, 1100);
      await stage.wait(1100);
    });
  }
  return stage.dispose;
};

export default mount;
