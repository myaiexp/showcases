// Free drawing: the path:created event hands over each new Path to restyle or post-process
import { Canvas, PencilBrush, type Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loop, wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Every stroke is drawn in black, then path:created repaints it with the next rainbow hue and a width from its length.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'draw something');

  const brush = new PencilBrush(canvas);
  brush.color = '#222';
  brush.width = 5;
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  let count = 0;
  canvas.on('path:created', ({ path }) => {
    const p = path as Path;
    const hue = (count++ * 47) % 360;
    // Post-process the finished object: it is a normal Path already on the canvas.
    p.set({ stroke: `hsl(${hue} 70% 45%)`, strokeWidth: Math.max(3, Math.min(16, p.width / 14)) });
    p.set('dirty', true);
    canvas.requestRenderAll();
    say(`path ${count}: ${Math.round(p.width)} x ${Math.round(p.height)}, stroke hsl(${hue} 70% 45%), ${p.strokeWidth.toFixed(1)} wide`);
  });

  if (stage.bar) {
    button(stage.bar, 'Clear', () => {
      canvas.remove(...canvas.getObjects());
      count = 0;
    });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      await ghost.stroke(wave(40, 320, 70, 22, 1.5), 900);
      await ghost.stroke(wave(60, 300, 130, 14, 2), 700);
      await ghost.stroke(loop(180, 175, 34, 1), 700);
      await stage.wait(900);
      canvas.remove(...canvas.getObjects());
      count = 0;
    }, 300);
  }

  return stage.dispose;
};

export default mount;
