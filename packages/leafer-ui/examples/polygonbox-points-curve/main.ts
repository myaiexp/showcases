// PolygonBox: custom points, and curve to smooth them
import { Leafer, Ellipse } from 'leafer-ui';
import { PolygonBox } from '@leafer-in/box';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle curve to smooth the corners of the same points.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const box = new PolygonBox({
    ...mid(stage, S * 1.3),
    points: [0, 20 * k, 60 * k, 0, 110 * k, 40 * k, 90 * k, 100 * k, 30 * k, 90 * k], // x, y pairs
    fill: '#FF4B4B',
  });
  const circle = new Ellipse({ x: 60 * k, y: 60 * k, width: 50 * k, height: 50 * k, fill: '#FEB027' });
  leafer.add(box);
  box.add(circle);

  toggle(stage, 'curve', false, (v) => (box.curve = v), 1800);

  return stage.dispose;
};

export default mount;
