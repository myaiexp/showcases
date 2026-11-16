// Editor: list holds the selected elements
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click, shift-click and box-select: app.editor.list follows the selection.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.add(rect1);
  app.tree.add(rect2);
  watch(stage, () => 'app.editor.list = [' + app.editor.list.map((r) => r.name).join(', ') + ']');

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await ghost.tap(spot(rect2).x, spot(rect2).y);
      await stage.wait(900);
      await ghost.tap(spot(rect1).x, spot(rect1).y, { shiftKey: true });
      await stage.wait(1000);
      await ghost.tap(130, 180);
      await stage.wait(800);
      await ghost.drag({ x: 20, y: 30 }, { x: 240, y: 150 }, 800);
      await stage.wait(1000);
      await ghost.tap(130, 185);
      await stage.wait(500);
    });
  }
  return stage.dispose;
};

export default mount;
