// Free drawing: PencilBrush.decimate drops points closer together than N pixels
import { Canvas, PencilBrush, type Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { jitter, loop, wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Draw slowly with a different decimate each time. Higher values keep fewer points, so the path has fewer commands and turns angular.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'decimate 0.4 (default)');

  const brush = new PencilBrush(canvas);
  brush.color = '#16a085';
  brush.width = 4;
  brush.decimate = 0.4;
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  // path.path holds the SVG commands: fewer points in, fewer commands out.
  canvas.on('path:created', ({ path }) => {
    say(`decimate ${brush.decimate}: ${(path as Path).path.length} path commands`);
  });

  if (stage.bar) {
    slider(stage.bar, 'decimate', 0, 30, 0.5, 0.4, (v) => (brush.decimate = v));
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    const values = [0, 8, 24];
    let n = 0;
    stage.repeat(async () => {
      brush.decimate = values[n++ % values.length]!;
      // Many close points, like a slow real drag.
      await ghost.stroke(jitter(wave(40, 320, 70, 26, 1.5, 120), 2), 1100);
      await ghost.stroke(jitter(loop(180, 160, 36, 1, 1, 100), 2), 900);
      await stage.wait(800);
      canvas.remove(...canvas.getObjects());
    }, 300);
  }

  return stage.dispose;
};

export default mount;
