// Group: the editor scales a group's children
import { App, Ellipse, Group, Rect } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select the group and drag a corner handle.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const rect = new Rect({ width: 100, height: 100, fill: '#32cd79', editable: true });
  const ellipse = new Ellipse({ x: 50, y: 50, width: 100, height: 100, innerRadius: 0.5, fill: '#FEB027', editable: true });
  const s = stage.preview ? 0.6 : 1;
  const gx = (stage.width - 150 * s) / 2 - 20, gy = (stage.height - 150 * s) / 2 - 10;
  const group = new Group({ x: gx, y: gy, scale: s, hitChildren: false, editable: true });
  group.add([rect, ellipse]);
  app.tree.add(group);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      group.set({ x: gx, y: gy, scale: s });
      rect.set({ width: 100, height: 100 });
      ellipse.set({ x: 50, y: 50, width: 100, height: 100 });
      await ghost.tap(gx + 30 * s, gy + 30 * s);
      await stage.wait(700);
      const b = group.getBounds();
      const bx = b.x! + b.width!, by = b.y! + b.height!; // the bottom-right handle sits on the box corner
      await ghost.drag({ x: bx, y: by }, { x: bx + 40, y: by + 20 }, 700);
      await stage.wait(1200);
      await ghost.tap(8, 8);
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
