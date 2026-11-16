// multiplyTransformMatrices(A, B) and (B, A) give different matrices
import { Canvas, Circle, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { matrixText } from '../../shared/matrix-view.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'A rotates, B moves right. Blue is A x B (rotate the moved point: it orbits), green is B x A (rotate first, then move).' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const origin = { x: 110, y: 130 };
  const make = (fill: string): Rect => new Rect({ width: 56, height: 34, fill, selectable: false, evented: false });
  const blue = make('#3b7dd8cc');
  const green = make('#2e9e5bcc');
  const pin = new Circle({ left: origin.x, top: origin.y, radius: 4, fill: '#2b2a33', selectable: false, evented: false });
  canvas.add(blue, green, pin);

  let angle = 40;
  let shift = 100;
  const redraw = (): void => {
    const A = util.createRotateMatrix({ angle });
    const B = util.createTranslateMatrix(shift, 0);
    const AB = util.multiplyTransformMatrices(A, B);
    const BA = util.multiplyTransformMatrices(B, A);
    const place = util.createTranslateMatrix(origin.x, origin.y); // the drawing's own origin on the canvas
    util.applyTransformToObject(blue, util.multiplyTransformMatrices(place, AB));
    util.applyTransformToObject(green, util.multiplyTransformMatrices(place, BA));
    const mat = (name: string, m: readonly number[]): string => `${name}\n${matrixText(m)}`;
    say(stage.preview ? mat('A x B (blue)', AB) : `${mat('A = rotate', A)}\n${mat('B = translate', B)}\n${mat('A x B (blue)', AB)}\n${mat('B x A (green)', BA)}`);
    canvas.requestRenderAll();
  };
  redraw();

  if (stage.bar) {
    slider(stage.bar, 'A: angle', -180, 180, 1, angle, (v) => { angle = v; redraw(); }, (v) => `${v}°`);
    slider(stage.bar, 'B: move x', 0, 200, 1, shift, (v) => { shift = v; redraw(); });
  } else {
    stage.loop((_dt, t) => { angle = 40 + Math.sin(t * 1.2) * 60; redraw(); });
  }
  return stage.dispose;
};

export default mount;
