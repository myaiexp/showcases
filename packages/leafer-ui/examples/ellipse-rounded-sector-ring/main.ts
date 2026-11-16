// Ellipse: corner plugin rounds a sector ring
import { Ellipse, Leafer } from 'leafer-ui';
import '@leafer-in/corner'; // the corner plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide cornerRadius: the four corners of the ring round off.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const ring = new Ellipse({
    ...mid(stage, S), width: S, height: S, startAngle: -60, endAngle: 180, innerRadius: 0.5,
    cornerRadius: 10, fill: '#32cd79',
  });
  leafer.add(ring);
  drive(stage, 'cornerRadius', [0, 30, 1], 10, (v) => (ring.cornerRadius = v), 4);

  return stage.dispose;
};

export default mount;
