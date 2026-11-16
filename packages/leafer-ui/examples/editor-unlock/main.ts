// Editor: unlock() makes locked elements editable again
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { actions, geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The rect starts locked and selected: unlock it, then drag it.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g, { locked: true });
  app.tree.addMany(rect1, rect2);
  watch(stage, () => 'rect1.locked: ' + rect1.locked);
  app.editor.select(rect1);

  actions(stage, [{ name: 'app.editor.unlock()', run: () => app.editor.unlock() }], {
    card: false,
    reset: () => (app.editor.lock(), app.editor.select(rect1)),
  });
  if (stage.preview) {
    const ghost = stage.ghost(app);
    const home = { x: rect1.x, y: rect1.y };
    script(stage, async () => {
      rect1.set(home);
      rect1.locked = true;
      app.editor.select(rect1);
      await stage.wait(900);
      const c = spot(rect1);
      await ghost.drag(c, { x: c.x + 20, y: c.y + 15 }, 600);
      await stage.wait(600);
      app.editor.unlock();
      await stage.wait(600);
      const c2 = spot(rect1);
      await ghost.drag(c2, { x: c2.x + 35, y: c2.y + 25 }, 800);
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
