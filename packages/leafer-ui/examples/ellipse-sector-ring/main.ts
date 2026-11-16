// Ellipse: startAngle, endAngle and innerRadius
import { Ellipse, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide innerRadius and endAngle to reshape the ring.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const ring = new Ellipse({ ...mid(stage, S), width: S, height: S, startAngle: -60, endAngle: 180, innerRadius: 0.5, fill: '#32cd79' });
  leafer.add(ring);
  drive(stage, 'endAngle', [-60, 180, 1], 180, (v) => (ring.endAngle = v), 4);
  drive(stage, 'innerRadius', [0.1, 0.9, 0.01], 0.5, (v) => (ring.innerRadius = v), 6);

  return stage.dispose;
};

export default mount;
