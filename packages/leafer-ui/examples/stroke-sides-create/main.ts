// Stroke sides: strokeWidth as [top, right, bottom, left]
import { App, Rect } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport'; // optional: wheel zoom and pan
import '@leafer-in/stroke-sides'; // independent side strokes
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select the rect and pull a handle: the four stroke widths stay as set.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const S = size(stage) * 1.1;
  const rect = new Rect({
    ...mid(stage, S),
    width: S,
    height: S,
    fill: '#32cd79',
    stroke: '#000',
    cornerRadius: 20,
    strokeWidth: [5, 0, 5, 10], // [top, right, bottom, left]
    editable: true,
  });
  app.tree.add(rect);

  if (stage.preview) {
    const ghost = stage.ghost(app);
    const c = { x: stage.width / 2, y: stage.height / 2 };
    script(stage, async () => {
      rect.set({ ...mid(stage, S), width: S, height: S });
      await stage.wait(1000);
      await ghost.tap(c.x, c.y);
      await stage.wait(500);
      await ghost.drag({ x: c.x + S / 2, y: c.y + S / 2 }, { x: c.x + S / 2 + 25, y: c.y + S / 2 - 15 }, 700);
      await stage.wait(900);
      await ghost.tap(8, 8);
      await stage.wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
