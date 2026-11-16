// Editor config: area styles the box-selection rectangle
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag a box across the rects." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { area: { stroke: '#e4572e', strokeWidth: 2, fill: 'rgba(228,87,46,0.15)' } } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'selected: ' + (app.editor.list.map((r) => r.name).join(' ') || 'none'));
  if (ghost) {
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      const a = spot(rect1, -0.3, -0.4);
      const b = spot(rect2, 1.2, 1.3);
      await ghost.drag(a, b, 1800);
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
