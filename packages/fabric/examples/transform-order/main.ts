// Transformations: translate, rotate, scale, skewX, skewY multiplied one more at a time
import { Canvas, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { matrixText, same } from '../../shared/matrix-view.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const STEPS = ['1 translate', '2 + rotate', '3 + scale', '4 + skewX', '5 + skewY'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'Fabric applies translation, rotation, scale, skewX and skewY in that order (the last is applied to the points first). Step through them.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const ghostBox = new Rect({ left: 170, top: 120, width: 100, height: 60, fill: '', stroke: '#999', strokeDashArray: [4, 4], selectable: false, evented: false });
  const rect = new Rect({ left: 170, top: 120, width: 100, height: 60, fill: '#3b7dd8cc', selectable: false, evented: false });
  canvas.add(ghostBox, rect);

  const v = { angle: 30, scale: 1.4, skewX: 25, skewY: 12 };
  let step = 4;
  const redraw = (): void => {
    const parts = [
      util.createTranslateMatrix(170, 120),
      util.createRotateMatrix({ angle: v.angle }),
      util.createScaleMatrix(v.scale, v.scale * 0.7),
      util.createSkewXMatrix(v.skewX),
      util.createSkewYMatrix(v.skewY),
    ];
    // multiplyTransformMatrixArray([A, B, C]) is A(B(C(point))): each matrix is the plane of the ones after it
    const m = util.multiplyTransformMatrixArray(parts.slice(0, step + 1));
    util.applyTransformToObject(rect, m);
    const whole = util.composeMatrix({ translateX: 170, translateY: 120, angle: v.angle, scaleX: v.scale, scaleY: v.scale * 0.7, skewX: v.skewX, skewY: v.skewY });
    const lines = [STEPS[step]!, matrixText(m)];
    if (step === 4 && !stage.preview) lines.push(`same as util.composeMatrix(): ${same(m, whole)}`);
    say(lines.join('\n'));
    canvas.requestRenderAll();
  };
  redraw();

  if (stage.bar) {
    select(stage.bar, 'apply up to', STEPS, (s) => { step = STEPS.indexOf(s); redraw(); }, STEPS[4]);
    slider(stage.bar, 'angle', -90, 90, 1, v.angle, (x) => { v.angle = x; redraw(); }, (x) => `${x}°`);
    slider(stage.bar, 'scale', 0.4, 2, 0.05, v.scale, (x) => { v.scale = x; redraw(); });
    slider(stage.bar, 'skewX', -45, 45, 1, v.skewX, (x) => { v.skewX = x; redraw(); }, (x) => `${x}°`);
    slider(stage.bar, 'skewY', -45, 45, 1, v.skewY, (x) => { v.skewY = x; redraw(); }, (x) => `${x}°`);
  } else {
    stage.every(1100, () => { step = (step + 1) % STEPS.length; redraw(); });
  }
  return stage.dispose;
};

export default mount;
