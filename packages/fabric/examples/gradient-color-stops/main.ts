// Gradients: as many colorStops as you like, each with an offset from 0 to 1
import { Canvas, Gradient, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: "The guide's rainbow. Offsets are positions along the gradient line; the slider moves the yellow stop and the others stay where they are.",
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const bar = new Rect({ left: 180, top: 120, width: 300, height: 120 });
  canvas.add(bar);

  const rainbow = (yellow: number): void => {
    const gradient = new Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bar.width, y2: 0 },
      colorStops: [
        { offset: 0, color: 'red' },
        { offset: 0.2, color: 'orange' },
        { offset: yellow, color: 'yellow' },
        { offset: 0.6, color: 'green' },
        { offset: 0.8, color: 'blue' },
        { offset: 1, color: 'purple' },
      ],
    });
    bar.set('fill', gradient);
    say(`stops: ${gradient.colorStops.map((s) => `${s.color} ${s.offset.toFixed(2)}`).join(' · ')}`);
    canvas.requestRenderAll();
  };

  rainbow(0.4);
  if (stage.preview) stage.loop((_dt, t) => rainbow(0.22 + 0.36 * (0.5 + 0.5 * Math.sin(t * 1.5))));
  else slider(stage.bar!, 'yellow offset', 0.2, 0.6, 0.01, 0.4, rainbow, (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;
