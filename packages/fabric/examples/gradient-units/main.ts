// Gradients: gradientUnits pixels versus percentage when the object resizes
import { Canvas, Gradient, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['pixels: x2 = 140', 'percentage: x2 = 1'],
    scene: [180, 200],
    hint: 'Both fills are red to blue across x1 0 to x2 140 px / 100 %. Change the width: pixels stay put, percentage stretches with the object.',
  });
  const [left, right] = stage.panes;
  const a = stage.own(new Canvas(left!.el), left);
  const b = stage.own(new Canvas(right!.el), right);

  const stops = [
    { offset: 0, color: '#e94b3c' },
    { offset: 1, color: '#3b7dd8' },
  ];
  const px = new Rect({ left: 90, top: 100, width: 140, height: 120, fill: new Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 140, y2: 0 }, colorStops: stops }) });
  const pct = new Rect({ left: 90, top: 100, width: 140, height: 120, fill: new Gradient({ type: 'linear', gradientUnits: 'percentage', coords: { x1: 0, y1: 0, x2: 1, y2: 0 }, colorStops: stops }) });
  a.add(px);
  b.add(pct);

  const resize = (w: number): void => {
    px.set('width', w);
    pct.set('width', w);
    a.requestRenderAll();
    b.requestRenderAll();
  };
  if (stage.preview) stage.loop((_dt, t) => resize(100 + 70 * Math.sin(t * 1.4)));
  else slider(stage.bar!, 'width', 60, 170, 1, 140, resize, (v) => `${v}px`);

  return stage.dispose;
};

export default mount;
