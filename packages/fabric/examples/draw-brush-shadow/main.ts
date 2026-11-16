// Free drawing: brush.shadow gives the stroke and the path it becomes a Shadow
import { Canvas, PencilBrush, Shadow } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, color, slider } from '../../shared/controls.ts';
import { loop, wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag to draw. The brush shadow is painted while you draw, and each new Path gets its own copy as path.shadow.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const brush = new PencilBrush(canvas);
  brush.color = '#2c3e50';
  brush.width = 8;
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  const shadow = { color: 'rgba(233,75,60,0.8)', blur: 12, offsetX: 8, offsetY: 8 };
  // A new Shadow each time an option changes: the brush keeps the one it was given.
  const apply = (): void => {
    brush.shadow = new Shadow(shadow);
    say(`shadow ${shadow.color.startsWith('#') ? shadow.color : 'red'} · blur ${shadow.blur} · offset ${shadow.offsetX}, ${shadow.offsetY}`);
  };
  apply();

  canvas.on('path:created', ({ path }) => {
    const s = path.shadow as Shadow | null;
    say(`path.shadow: blur ${s?.blur}, offset ${s?.offsetX}, ${s?.offsetY}, affectStroke ${s?.affectStroke}`);
  });

  if (stage.bar) {
    color(stage.bar, 'shadow color', '#e94b3c', (v) => ((shadow.color = v), apply()));
    slider(stage.bar, 'blur', 0, 40, 1, 12, (v) => ((shadow.blur = v), apply()));
    slider(stage.bar, 'offsetX', -30, 30, 1, 8, (v) => ((shadow.offsetX = v), apply()));
    slider(stage.bar, 'offsetY', -30, 30, 1, 8, (v) => ((shadow.offsetY = v), apply()));
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    const looks = [
      { blur: 12, offsetX: 8, offsetY: 8 },
      { blur: 0, offsetX: -6, offsetY: 6 },
      { blur: 24, offsetX: 0, offsetY: 0 },
    ];
    let n = 0;
    stage.repeat(async () => {
      Object.assign(shadow, looks[n++ % looks.length]);
      apply();
      await ghost.stroke(wave(40, 320, 90, 30, 1), 1000);
      await ghost.stroke(loop(180, 165, 34, 1), 800);
      await stage.wait(800);
      canvas.remove(...canvas.getObjects());
    }, 300);
  }

  return stage.dispose;
};

export default mount;
