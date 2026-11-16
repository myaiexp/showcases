// Transformations: qrDecompose turns any invertible matrix into angle, scales, skewX and a translation
import { Canvas, Rect, util, type TMat2D } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { fix, matrixText, same } from '../../shared/matrix-view.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'Edit the four numbers of the matrix. qrDecompose finds one angle/scale/skew combination for it, always with skewY 0.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 170, top: 95, width: 90, height: 60, fill: '#2e9e5b', selectable: false, evented: false });
  canvas.add(rect);

  const m: TMat2D = [1.2, 0.5, -0.4, 0.9, 170, 95];
  const redraw = (): void => {
    const q = util.qrDecompose(m);
    util.applyTransformToObject(rect, m); // the rectangle is drawn from the decomposed values
    const again = util.composeMatrix(q); // ...and composing them gives the matrix back
    const lines = [matrixText(m), `angle ${fix(q.angle)}° scale ${fix(q.scaleX, 2)} x ${fix(q.scaleY, 2)}`, `skewX ${fix(q.skewX)}° skewY ${fix(q.skewY)}°`];
    if (!stage.preview) lines.push(`util.composeMatrix(qrDecompose(m)) == m: ${same(again, m)}`);
    say(lines.join('\n'));
    canvas.requestRenderAll();
  };
  redraw();

  if (stage.bar) {
    const names = ['a', 'b', 'c', 'd'] as const;
    const idx = [0, 1, 2, 3];
    names.forEach((n, i) => slider(stage.bar!, n, -2, 2, 0.05, m[idx[i]!]!, (v) => {
      m[idx[i]!] = v;
      if (m[0] * m[3] - m[1] * m[2] === 0) m[idx[i]!] = v + 0.01; // keep it invertible
      redraw();
    }, (v) => v.toFixed(2)));
  } else {
    stage.loop((_dt, t) => {
      m[0] = 1.1 + Math.sin(t * 1.1) * 0.4;
      m[1] = Math.sin(t * 0.8) * 0.6;
      m[2] = Math.cos(t * 0.9) * 0.5;
      m[3] = 1 + Math.cos(t * 1.3) * 0.3;
      redraw();
    });
  }
  return stage.dispose;
};

export default mount;
