// Gradients: the same Gradient class paints a stroke
import { Canvas, Gradient, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'stroke takes a Gradient like fill does. Here the fill stays plain and the border carries the colours; the stroke width is a slider.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  // percentage units: x2: 1 is the full width, so the gradient follows the object when it changes size
  const border = (colors: [string, string, string]): Gradient<'linear'> =>
    new Gradient({
      type: 'linear',
      gradientUnits: 'percentage',
      coords: { x1: 0, y1: 0, x2: 1, y2: 1 },
      colorStops: [
        { offset: 0, color: colors[0] },
        { offset: 0.5, color: colors[1] },
        { offset: 1, color: colors[2] },
      ],
    });
  const rect = new Rect({ left: 110, top: 120, width: 120, height: 120, fill: '#fff', strokeWidth: 16, stroke: border(['#e94b3c', '#fcd34d', '#2e9e5b']) });
  const tri = new Triangle({ left: 258, top: 120, width: 110, height: 110, fill: '#fff', strokeWidth: 16, strokeLineJoin: 'round', stroke: border(['#3b7dd8', '#8e6bd8', '#e94b3c']) });
  canvas.add(rect, tri);

  const width = (w: number): void => {
    rect.set('strokeWidth', w);
    tri.set('strokeWidth', w);
    canvas.requestRenderAll();
  };
  if (stage.preview) stage.loop((_dt, t) => width(6 + 14 * (0.5 + 0.5 * Math.sin(t * 1.5))));
  else slider(stage.bar!, 'strokeWidth', 1, 40, 1, 16, width);

  return stage.dispose;
};

export default mount;
