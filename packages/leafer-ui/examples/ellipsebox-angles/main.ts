// EllipseBox: a ring segment from startAngle to endAngle
import { Leafer, Ellipse } from 'leafer-ui';
import { EllipseBox } from '@leafer-in/box';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'endAngle sweeps the segment; the circle child does not move.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const box = new EllipseBox({ ...mid(stage, S * 1.3), width: S, height: S, innerRadius: 0.4, startAngle: 0, fill: '#FF4B4B' });
  const circle = new Ellipse({ x: 60 * k, y: 60 * k, width: 50 * k, height: 50 * k, fill: '#FEB027' });
  leafer.add(box);
  box.add(circle);

  drive(stage, 'endAngle', [30, 360, 5], 270, (v) => (box.endAngle = v), 5);

  return stage.dispose;
};

export default mount;
