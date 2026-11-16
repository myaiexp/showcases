// Gradients: a Path filled and stroked with different gradients
import { Canvas, Gradient, Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'A star path: a radial gradient fills it and a linear one runs along its outline. Drag it around; the gradients stay with the object.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  const star = new Path('M 100 0 L 123 70 L 197 70 L 137 113 L 160 184 L 100 140 L 40 184 L 63 113 L 3 70 L 77 70 Z', {
    left: 180,
    top: 120,
    strokeWidth: 10,
    strokeLineJoin: 'round',
    fill: new Gradient({
      type: 'radial',
      gradientUnits: 'percentage',
      coords: { x1: 0.5, y1: 0.55, r1: 0, x2: 0.5, y2: 0.55, r2: 0.6 },
      colorStops: [
        { offset: 0, color: '#fff7c2' },
        { offset: 1, color: '#f4a261' },
      ],
    }),
    stroke: new Gradient({
      type: 'linear',
      gradientUnits: 'percentage',
      coords: { x1: 0, y1: 0, x2: 1, y2: 1 },
      colorStops: [
        { offset: 0, color: '#e94b3c' },
        { offset: 1, color: '#8e6bd8' },
      ],
    }),
  });
  canvas.add(star);

  if (stage.preview) stage.loop((_dt, t) => {
    star.set('angle', t * 40);
    canvas.requestRenderAll();
  });

  return stage.dispose;
};

export default mount;
