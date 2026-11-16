// Gradients: v7 has no opacity per stop: fade with rgba colours instead
import { Canvas, Circle, Gradient, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'colorStops are { offset, color } only (v7 removed opacity). A fade to transparent is a stop whose colour has alpha 0: here rgba(59,125,216,0).',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const back = new Circle({ left: 120, top: 120, radius: 70, fill: '#e94b3c', selectable: false });
  const veil = new Rect({ left: 180, top: 120, width: 260, height: 170 });
  canvas.add(back, veil);

  const paint = (end: number): void => {
    const gradient = new Gradient({
      type: 'linear',
      gradientUnits: 'percentage',
      coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
      colorStops: [
        { offset: 0, color: 'rgba(59,125,216,0)' },
        { offset: end, color: 'rgba(59,125,216,0.9)' },
        { offset: 1, color: 'rgba(30,60,130,1)' },
      ],
    });
    veil.set('fill', gradient);
    say(gradient.colorStops.map((s) => `${s.offset.toFixed(2)}: ${s.color}`).join('   '));
    canvas.requestRenderAll();
  };

  paint(0.5);
  if (stage.preview) stage.loop((_dt, t) => paint(0.25 + 0.5 * (0.5 + 0.5 * Math.sin(t * 1.5))));
  else slider(stage.bar!, 'middle stop', 0.1, 0.9, 0.01, 0.5, paint, (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;
