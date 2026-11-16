// Free drawing: isDrawingMode with a PencilBrush, its color and width
import { Canvas, PencilBrush } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, checkbox, color, slider } from '../../shared/controls.ts';
import { loop, wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag on the canvas to draw. Every stroke becomes a Path object when you let go.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '0 paths');

  // v7 creates no brush by itself: make one, then switch drawing on.
  canvas.freeDrawingBrush = new PencilBrush(canvas);
  canvas.freeDrawingBrush.color = '#3b7dd8';
  canvas.freeDrawingBrush.width = 6;
  canvas.isDrawingMode = true;

  canvas.on('path:created', () => say(`${canvas.getObjects().length} paths`));

  if (stage.bar) {
    const brush = canvas.freeDrawingBrush;
    color(stage.bar, 'color', '#3b7dd8', (v) => (brush.color = v));
    slider(stage.bar, 'width', 1, 40, 1, 6, (v) => (brush.width = v));
    checkbox(stage.bar, 'isDrawingMode', true, (v) => (canvas.isDrawingMode = v));
    button(stage.bar, 'Clear', () => {
      canvas.remove(...canvas.getObjects());
      say('0 paths');
    });
  } else {
    const ghost = stage.ghost(canvas);
    const colors = ['#3b7dd8', '#e94b3c', '#2e9e5b'];
    let n = 0;
    stage.repeat(async () => {
      const brush = canvas.freeDrawingBrush!;
      brush.color = colors[n % colors.length]!;
      brush.width = 4 + (n % 3) * 4;
      n++;
      await ghost.stroke(wave(40, 320, 70 + (n % 3) * 20, 24, 1.5), 900);
      await ghost.stroke(loop(180, 150, 40, 1), 700);
      await stage.wait(700);
      canvas.remove(...canvas.getObjects());
      say('0 paths');
    }, 300);
  }

  return stage.dispose;
};

export default mount;
