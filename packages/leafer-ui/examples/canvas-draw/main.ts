// Canvas: draw() renders other elements
import { Canvas, Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide rotation.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const canvas = new Canvas({ ...mid(stage, S), width: 120, height: 120, scale: S / 120 });
  leafer.add(canvas);
  const pen = new Pen();
  pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] } });
  pen.roundRect(0, 0, 100, 100, 30);
  pen.setStyle({ y: -5, fill: 'white' });
  pen.moveTo(40, 30).bezierCurveTo(70, 30, 90, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30);
  drive(stage, 'rotation', [-20, 20, 1], 0, (v) => {
    canvas.canvas?.clear();
    canvas.draw(pen, { x: 10, y: 10 }, 1, v); // offset, scale, rotation in degrees
  }, 4);

  return stage.dispose;
};

export default mount;
