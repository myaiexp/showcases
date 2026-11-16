// Transformations: util.composeMatrix(values) against the matrix a Rect computes from the same values
import { Canvas, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { matrixText, same } from '../../shared/matrix-view.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'The rectangle takes the values as plain options; composeMatrix builds the matrix from the same numbers without any object.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 170, top: 120, width: 100, height: 60, fill: '#d99a1c', selectable: false, evented: false });
  canvas.add(rect);

  const v = { angle: 20, scaleX: 1.3, scaleY: 0.9, skewX: 15, skewY: 0, flipX: false, flipY: false };
  const redraw = (): void => {
    rect.set(v);
    const composed = util.composeMatrix({ ...v, translateX: 170, translateY: 120 });
    const own = rect.calcOwnMatrix();
    say(`util.composeMatrix(values)\n${matrixText(composed)}${stage.preview ? '' : `\nrect.calcOwnMatrix()\n${matrixText(own)}\nequal: ${same(composed, own)}`}`);
    canvas.requestRenderAll();
  };
  redraw();

  if (stage.bar) {
    const sl = (k: 'angle' | 'scaleX' | 'scaleY' | 'skewX' | 'skewY', min: number, max: number, step: number): void => {
      slider(stage.bar!, k, min, max, step, v[k], (x) => { v[k] = x; redraw(); });
    };
    sl('angle', -180, 180, 1);
    sl('scaleX', 0.3, 2.5, 0.05);
    sl('scaleY', 0.3, 2.5, 0.05);
    sl('skewX', -60, 60, 1);
    sl('skewY', -60, 60, 1);
    checkbox(stage.bar, 'flipX', false, (x) => { v.flipX = x; redraw(); });
    checkbox(stage.bar, 'flipY', false, (x) => { v.flipY = x; redraw(); });
  } else {
    stage.loop((_dt, t) => {
      v.angle = Math.sin(t) * 40;
      v.scaleX = 1.3 + Math.sin(t * 1.4) * 0.4;
      v.skewX = Math.cos(t * 0.9) * 30;
      redraw();
    });
  }
  return stage.dispose;
};

export default mount;
