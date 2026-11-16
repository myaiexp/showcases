// Gradients: animate a gradient by changing its coords or stops every frame
import { Canvas, Gradient, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Top: util.animate sweeps x1 and x2 of the gradient. Bottom: animateColor moves the colours of two stops. After editing a gradient in place, mark the object dirty.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const sweepGradient = new Gradient({
    type: 'linear',
    gradientUnits: 'pixels',
    coords: { x1: -300, y1: 0, x2: 0, y2: 0 },
    colorStops: [
      { offset: 0, color: '#26262600' },
      { offset: 0.5, color: '#fcd34d' },
      { offset: 1, color: '#26262600' },
    ],
  });
  const sweep = new Rect({ left: 180, top: 70, width: 300, height: 80, fill: '#262626' });
  // the gradient on top of a dark rectangle: a second rect carries the moving highlight
  const glint = new Rect({ left: 180, top: 70, width: 300, height: 80, fill: sweepGradient, selectable: false });
  const colors = new Rect({ left: 180, top: 170, width: 300, height: 80, fill: '#000' });
  canvas.add(sweep, glint, colors);

  const run = (): void => {
    util.animate({
      startValue: -150,
      endValue: 300,
      duration: 1600,
      easing: (t, b, c, d) => b + (c * t) / d,
      target: glint,
      onChange: (x) => {
        sweepGradient.coords = { ...sweepGradient.coords, x1: x - 150, x2: x + 150 } as typeof sweepGradient.coords;
        glint.dirty = true;
        canvas.requestRenderAll();
      },
      onComplete: run,
    });
  };
  run();

  const hues = [
    ['#e94b3c', '#3b7dd8'],
    ['#2e9e5b', '#fcd34d'],
    ['#8e6bd8', '#e94b3c'],
  ] as const;
  let k = 0;
  const recolor = (): void => {
    const [a, b] = hues[k++ % hues.length]!;
    const stops = (colors.fill as Gradient<'linear'>).colorStops;
    const from = [stops[0]!.color, stops[1]!.color];
    util.animateColor({ startValue: from[0]!, endValue: a, duration: 1000, target: colors, onChange: (c) => { stops[0]!.color = c; colors.dirty = true; canvas.requestRenderAll(); } });
    util.animateColor({ startValue: from[1]!, endValue: b, duration: 1000, target: colors, onChange: (c) => { stops[1]!.color = c; say(`stops: ${stops[0]!.color} / ${c}`); } });
  };
  colors.set(
    'fill',
    new Gradient({
      type: 'linear',
      gradientUnits: 'percentage',
      coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
      colorStops: [
        { offset: 0, color: '#e94b3c' },
        { offset: 1, color: '#3b7dd8' },
      ],
    }),
  );
  stage.every(1800, recolor);

  return stage.dispose;
};

export default mount;
