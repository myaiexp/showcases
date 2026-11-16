// sizeAfterTransform gives the box a transformed rectangle fills
import { Canvas, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'The dashed box is sized with sizeAfterTransform from the matrix alone; it matches the bounding box fabric computes for the rectangle.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 170, top: 120, width: 100, height: 60, fill: '#d99a1ccc', selectable: false, evented: false });
  const box = new Rect({ left: 170, top: 120, fill: '', stroke: '#e94b3c', strokeDashArray: [5, 4], selectable: false, evented: false });
  canvas.add(rect, box);

  const v = { angle: 25, scale: 1.2, skewX: 20 };
  const redraw = (): void => {
    rect.set({ angle: v.angle, scaleX: v.scale, scaleY: v.scale, skewX: v.skewX });
    const size = util.sizeAfterTransform(rect.width, rect.height, rect.calcOwnMatrix());
    box.set({ width: size.x, height: size.y });
    const bounds = rect.getBoundingRect();
    say(`sizeAfterTransform ${size.x.toFixed(1)} x ${size.y.toFixed(1)}${stage.preview ? '' : `\ngetBoundingRect    ${bounds.width.toFixed(1)} x ${bounds.height.toFixed(1)}`}`);
    canvas.requestRenderAll();
  };
  redraw();

  if (stage.bar) {
    slider(stage.bar, 'angle', -90, 90, 1, v.angle, (x) => { v.angle = x; redraw(); }, (x) => `${x}°`);
    slider(stage.bar, 'scale', 0.5, 2, 0.05, v.scale, (x) => { v.scale = x; redraw(); });
    slider(stage.bar, 'skewX', -50, 50, 1, v.skewX, (x) => { v.skewX = x; redraw(); }, (x) => `${x}°`);
  } else {
    stage.loop((_dt, t) => {
      v.angle = Math.sin(t) * 60;
      v.skewX = Math.cos(t * 0.8) * 30;
      redraw();
    });
  }
  return stage.dispose;
};

export default mount;
