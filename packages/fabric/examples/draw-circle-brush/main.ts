// Free drawing: CircleBrush scatters translucent circles along the stroke
import { Canvas, CircleBrush, Group } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, color, slider } from '../../shared/controls.ts';
import { loop, wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag to draw. Each stroke becomes one Group of Circle objects with random radius and opacity around the brush width.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'no strokes yet');

  const brush = new CircleBrush(canvas);
  brush.color = '#8e44ad';
  brush.width = 24;
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  canvas.on('path:created', ({ path }) => {
    say(`${path.type}: ${path instanceof Group ? path.size() : 0} circles`);
  });

  if (stage.bar) {
    color(stage.bar, 'color', '#8e44ad', (v) => (brush.color = v));
    slider(stage.bar, 'width', 4, 80, 1, 24, (v) => (brush.width = v));
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    const colors = ['#8e44ad', '#e67e22', '#16a085'];
    let n = 0;
    stage.repeat(async () => {
      brush.color = colors[n++ % colors.length]!;
      await ghost.stroke(wave(40, 320, 90, 30, 1), 1000);
      await ghost.stroke(loop(180, 160, 36, 1), 800);
      await stage.wait(800);
      canvas.remove(...canvas.getObjects());
    }, 300);
  }

  return stage.dispose;
};

export default mount;
