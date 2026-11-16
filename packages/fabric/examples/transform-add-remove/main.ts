// addTransformToObject, removeTransformFromObject, applyTransformToObject
import { Canvas, Circle, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { matrixText } from '../../shared/matrix-view.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'M is a 12 degree turn about the black pin. Adding it orbits the rectangle around the pin; removing it undoes one step; applyTransformToObject replaces the whole matrix instead.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  // a turn about (170, 120): move the pin to the origin, rotate, move back
  const M = util.multiplyTransformMatrixArray([util.createTranslateMatrix(170, 120), util.createRotateMatrix({ angle: 12 }), util.createTranslateMatrix(-170, -120)]);
  const start = (): void => {
    rect.set({ left: 120, top: 70, width: 60, height: 36, angle: 0, scaleX: 1, scaleY: 1, skewX: 0, skewY: 0 });
    rect.setCoords();
  };
  const rect = new Rect({ fill: '#3b7dd8', selectable: false, evented: false });
  const home = new Rect({ left: 120, top: 70, width: 60, height: 36, fill: '', stroke: '#999', strokeDashArray: [4, 4], selectable: false, evented: false });
  const pin = new Circle({ left: 170, top: 120, radius: 6, fill: '#2b2a33', selectable: false, evented: false });
  start();
  canvas.add(home, rect, pin);

  const show = (what: string): void => {
    say(stage.preview ? what : `${what}\nM\n${matrixText(M)}\nrect.calcOwnMatrix() translation (${rect.calcOwnMatrix()[4].toFixed(0)}, ${rect.calcOwnMatrix()[5].toFixed(0)})`);
    rect.setCoords();
    canvas.requestRenderAll();
  };
  const add = (): void => { util.addTransformToObject(rect, M); show('addTransformToObject(rect, M)'); };
  const remove = (): void => { util.removeTransformFromObject(rect, M); show('removeTransformFromObject(rect, M)'); };
  const apply = (): void => { util.applyTransformToObject(rect, util.composeMatrix({ translateX: 170, translateY: 70, angle: 30 })); show('applyTransformToObject(rect, matrix)'); };
  show('start');

  if (stage.bar) {
    button(stage.bar, 'add M', add);
    button(stage.bar, 'remove M', remove);
    button(stage.bar, 'apply (replace)', apply);
    button(stage.bar, 'reset', () => { start(); show('start'); });
  } else {
    let n = 0;
    stage.every(650, () => {
      const k = n++ % 12;
      if (k < 5) add();
      else if (k === 5) apply();
      else if (k === 6) { start(); show('start'); }
      else if (k < 10) add();
      else remove();
    });
  }
  return stage.dispose;
};

export default mount;
