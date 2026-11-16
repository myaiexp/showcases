// StarBox: corners
import { Leafer, Ellipse } from 'leafer-ui';
import { StarBox } from '@leafer-in/box';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the number of corners.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const box = new StarBox({ ...mid(stage, S * 1.3), width: S, height: S, innerRadius: 0.5, cornerRadius: 5, fill: '#FF4B4B' });
  const circle = new Ellipse({ x: 60 * k, y: 60 * k, width: 50 * k, height: 50 * k, fill: '#FEB027' });
  leafer.add(box);
  box.add(circle);

  drive(stage, 'corners', [3, 12, 1], 8, (v) => (box.corners = v), 5);

  return stage.dispose;
};

export default mount;
