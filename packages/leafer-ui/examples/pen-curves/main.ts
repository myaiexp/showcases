// Pen: Bezier curves and a radial gradient
import { Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the heart width.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S), scale: S / 100 });
  leafer.add(pen);
  const draw = (w: number): void => {
    pen.clear();
    pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] } });
    pen.roundRect(0, 0, 100, 100, 30);
    pen.setStyle({ y: -5, fill: 'white' });
    pen.moveTo(40, 30).bezierCurveTo(40 + w, 30, 60 + w, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30);
  };
  drive(stage, 'width', [10, 50, 1], 30, draw, 3);

  return stage.dispose;
};

export default mount;
