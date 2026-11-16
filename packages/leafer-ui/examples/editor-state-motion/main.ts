// Editor: moving, resizing, rotating and skewing flags while dragging
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { dragWith, geo, solo, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the body, a corner, a corner with Ctrl held, and an edge with Ctrl held, and watch the flags.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  const home = { x: rect.x, y: rect.y, width: g.size, height: g.size, rotation: 0, skewX: 0 };
  app.tree.add(rect);
  watch(stage, () => {
    const e = app.editor;
    return 'moving: ' + e.moving + '  resizing: ' + e.resizing + '\nrotating: ' + e.rotating + '  skewing: ' + e.skewing + '\ndragging: ' + e.dragging;
  });
  app.editor.select(rect);

  if (stage.preview) {
    const ghost = stage.ghost(app);
    const reset = async (): Promise<void> => {
      rect.set(home);
      app.editor.update();
      await stage.wait(500);
    };
    script(stage, async () => {
      const c = spot(rect);
      await ghost.drag(c, { x: c.x + 25, y: c.y + 12 }, 1000);
      await reset();
      const br = spot(rect, 1, 1);
      await ghost.drag(br, { x: br.x + 25, y: br.y + 20 }, 1000);
      await reset();
      await dragWith(app, ghost, br, { x: br.x - 45, y: br.y + 15 }, { ctrlKey: true }, 1100);
      await reset();
      const right = spot(rect, 1, 0.5);
      await dragWith(app, ghost, right, { x: right.x, y: right.y + 25 }, { ctrlKey: true }, 1100);
      await reset();
    });
  }
  return stage.dispose;
};

export default mount;
