// Gradients: a linear Gradient as a fill, aimed with coords x1 y1 x2 y2
import { Canvas, Gradient, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The gradient runs from (x1, y1) to (x2, y2) in pixels of the object, from its top left corner. Turn the line around the centre.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const rect = new Rect({ left: 180, top: 120, width: 240, height: 160, rx: 10, ry: 10 });
  canvas.add(rect);

  const aim = (deg: number): void => {
    const a = (deg * Math.PI) / 180;
    const { width, height } = rect;
    // half the diagonal along the angle, centred on the object
    const r = Math.hypot(width, height) / 2;
    const [cx, cy] = [width / 2, height / 2];
    const coords = { x1: cx - Math.cos(a) * r, y1: cy - Math.sin(a) * r, x2: cx + Math.cos(a) * r, y2: cy + Math.sin(a) * r };
    rect.set(
      'fill',
      new Gradient({
        type: 'linear',
        gradientUnits: 'pixels',
        coords,
        colorStops: [
          { offset: 0, color: '#3b7dd8' },
          { offset: 1, color: '#e94b3c' },
        ],
      }),
    );
    say(`x1 ${coords.x1.toFixed(0)}  y1 ${coords.y1.toFixed(0)}  x2 ${coords.x2.toFixed(0)}  y2 ${coords.y2.toFixed(0)}`);
    canvas.requestRenderAll();
  };

  aim(0);
  if (stage.preview) stage.loop((_dt, t) => aim((t * 60) % 360));
  else slider(stage.bar!, 'angle', 0, 360, 1, 0, aim, (v) => `${v}°`);

  return stage.dispose;
};

export default mount;
