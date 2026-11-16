// Ellipse: innerRadius makes a ring
import { Ellipse, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide innerRadius from 0 (disc) to 1 (no ring left).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const ring = new Ellipse({ ...mid(stage, S), width: S, height: S, innerRadius: 0.5, fill: '#32cd79' });
  leafer.add(ring);
  drive(stage, 'innerRadius', [0, 0.95, 0.01], 0.5, (v) => (ring.innerRadius = v), 4);

  return stage.dispose;
};

export default mount;
