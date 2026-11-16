// Gradients: a radial Gradient with an inner circle (r1) and an outer circle (r2)
import { Canvas, Circle, Gradient } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Offset 0 sits on the inner circle (x1, y1, r1), offset 1 on the outer one (x2, y2, r2). Move the inner circle off centre for a highlight.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const ball = new Circle({ left: 180, top: 120, radius: 100 });
  canvas.add(ball);

  const shade = (dx: number, r1: number): void => {
    const coords = { x1: 100 + dx, y1: 100 + dx * 0.6, r1, x2: 100, y2: 100, r2: 100 };
    ball.set(
      'fill',
      new Gradient({
        type: 'radial',
        coords,
        colorStops: [
          { offset: 0, color: '#fffbe6' },
          { offset: 0.35, color: '#f4a261' },
          { offset: 1, color: '#9d2f1f' },
        ],
      }),
    );
    say(`inner circle at (${coords.x1.toFixed(0)}, ${coords.y1.toFixed(0)}) r ${r1.toFixed(0)}   outer r 100`);
    canvas.requestRenderAll();
  };

  shade(-35, 5);
  if (stage.preview) stage.loop((_dt, t) => shade(-45 * Math.cos(t), 5 + 20 * (0.5 + 0.5 * Math.sin(t * 2))));
  else {
    let dx = -35, r1 = 5;
    slider(stage.bar!, 'inner x offset', -60, 60, 1, dx, (v) => shade((dx = v), r1));
    slider(stage.bar!, 'inner r1', 0, 90, 1, r1, (v) => shade(dx, (r1 = v)));
  }

  return stage.dispose;
};

export default mount;
