// Polygon: a regular polygon from sides
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide sides (at least 3).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const polygon = new Polygon({ ...mid(stage, S), width: S, height: S, sides: 3, fill: '#32cd79' });
  leafer.add(polygon);
  drive(stage, 'sides', [3, 12, 1], 3, (v) => (polygon.sides = v), 8);

  return stage.dispose;
};

export default mount;
