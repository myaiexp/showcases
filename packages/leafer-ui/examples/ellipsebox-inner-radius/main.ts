// EllipseBox: innerRadius
import { Leafer, Ellipse } from 'leafer-ui';
import { EllipseBox } from '@leafer-in/box';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the slider: 0 is a full ellipse, 1 is a hairline.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const box = new EllipseBox({ ...mid(stage, S * 1.3), width: S, height: S, fill: '#FF4B4B' });
  const circle = new Ellipse({ x: 60 * k, y: 60 * k, width: 50 * k, height: 50 * k, fill: '#FEB027' });
  leafer.add(box);
  box.add(circle);

  drive(stage, 'innerRadius', [0, 0.95, 0.05], 0.5, (v) => (box.innerRadius = v), 5);

  return stage.dispose;
};

export default mount;
