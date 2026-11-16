// Pen: different colours from setStyle
import { Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the dot size: the Pen redraws with clear().' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S), scale: S / 100 });
  leafer.add(pen);
  const draw = (r: number): void => {
    pen.clear();
    pen.setStyle({ fill: '#FF4B4B', windingRule: 'evenodd' });
    pen.roundRect(0, 0, 100, 100, 30).arc(50, 50, 25);
    pen.setStyle({ x: 50, y: 50, fill: '#FEB027' });
    pen.arc(0, 0, r);
  };
  drive(stage, 'dot', [5, 24, 0.5], 20, draw, 3);

  return stage.dispose;
};

export default mount;
