// Free drawing: limitedToCanvasSize ignores pointer moves outside the canvas
import { Canvas, PencilBrush } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  // No `scene` option: the brush compares scene points with the canvas pixel size.
  const stage = createStage(el, ctx, {
    hint: 'Start a stroke inside the pane and drag out past its edge and back. With the option on, the part outside is dropped; off, it is recorded.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const brush = new PencilBrush(canvas);
  brush.color = '#e67e22';
  brush.width = 7;
  brush.limitedToCanvasSize = true;
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  const show = (): void => say(`limitedToCanvasSize: ${brush.limitedToCanvasSize}`);
  show();
  canvas.on('path:created', ({ path }) => {
    say(`limitedToCanvasSize ${brush.limitedToCanvasSize}: path left ${Math.round(path.left - path.width / 2)}, right ${Math.round(path.left + path.width / 2)} (canvas ${canvas.width} wide)`);
  });

  if (stage.bar) {
    checkbox(stage.bar, 'limitedToCanvasSize', true, (v) => ((brush.limitedToCanvasSize = v), show()));
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    const w = canvas.width;
    const h = canvas.height;
    stage.repeat(async () => {
      for (const limited of [true, false]) {
        brush.limitedToCanvasSize = limited;
        // Runs from 50 px outside the left edge to 50 px outside the right edge.
        const pts = wave(-50, w + 50, limited ? h * 0.3 : h * 0.65, h * 0.12, 1.2, 40);
        await ghost.stroke(pts.map((p) => ({ x: p.x, y: p.y })), 1100);
        await stage.wait(250);
      }
      await stage.wait(900);
      canvas.remove(...canvas.getObjects());
    }, 300);
  }

  return stage.dispose;
};

export default mount;
