// Editor: hittable false switches every editor interaction off
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { actions, geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the selected rect, then turn hittable off and try again.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  watch(stage, () => 'editor.hittable: ' + app.editor.hittable);
  app.editor.select(rect1);

  actions(
    stage,
    [
      { name: 'app.editor.hittable = false', run: () => void (app.editor.hittable = false) },
      { name: 'app.editor.hittable = true', run: () => void (app.editor.hittable = true) },
    ],
    { card: false },
  );
  if (stage.preview) {
    const ghost = stage.ghost(app);
    const home = { x: rect1.x, y: rect1.y };
    script(stage, async () => {
      rect1.set(home);
      app.editor.hittable = true;
      app.editor.select(rect1);
      await stage.wait(600);
      const c = spot(rect1);
      await ghost.drag(c, { x: c.x + 30, y: c.y + 30 }, 700);
      await stage.wait(500);
      rect1.set(home);
      app.editor.hittable = false;
      await stage.wait(500);
      const c2 = spot(rect1);
      await ghost.drag(c2, { x: c2.x + 30, y: c2.y + 30 }, 700);
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
