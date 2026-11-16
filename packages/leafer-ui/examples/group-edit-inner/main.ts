// Group: hitChildren false and double-click to enter
import { App, Ellipse, Group, Rect } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a shape to select the group; double-click to edit a child.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const rect = new Rect({ width: 100, height: 100, fill: '#32cd79', editable: true });
  const ellipse = new Ellipse({ x: 50, y: 50, width: 100, height: 100, innerRadius: 0.5, fill: '#FEB027', editable: true });
  const s = stage.preview ? 0.6 : 1;
  const group = new Group({ x: (stage.width - 150 * s) / 2, y: (stage.height - 150 * s) / 2, scale: s, hitChildren: false, editable: true });
  group.add([rect, ellipse]);
  app.tree.add(group);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    const c = { x: stage.width / 2, y: stage.height / 2 };
    script(stage, async () => {
      await ghost.tap(c.x - 20, c.y - 20);
      await stage.wait(700);
      await ghost.drag({ x: c.x - 20, y: c.y - 20 }, { x: c.x - 5, y: c.y - 10 }, 500);
      await stage.wait(500);
      await ghost.doubleTap(c.x - 20, c.y - 20);
      await stage.wait(900);
      await ghost.tap(10, 10);
      await stage.wait(600);
      app.tree.children[0]!.set({ x: (stage.width - 150 * s) / 2, y: (stage.height - 150 * s) / 2 });
    });
  }

  return stage.dispose;
};

export default mount;
