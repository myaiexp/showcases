// Editor: lock() locks the selected elements against editing
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { actions, geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select a rect and lock it: it stays selected but can no longer be moved or resized.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  watch(stage, () => 'rect1.locked: ' + rect1.locked);
  app.editor.select(rect1);

  actions(stage, [{ name: 'app.editor.lock()', run: () => app.editor.lock() }], {
    card: false,
    reset: () => (app.editor.unlock(), app.editor.select(rect1)),
  });
  if (stage.preview) {
    const ghost = stage.ghost(app);
    const home = { x: rect1.x, y: rect1.y };
    script(stage, async () => {
      rect1.set(home);
      rect1.locked = false;
      app.editor.select(rect1);
      await stage.wait(900);
      app.editor.lock();
      await stage.wait(700);
      const c = spot(rect1);
      await ghost.drag(c, { x: c.x + 35, y: c.y + 25 }, 800);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
