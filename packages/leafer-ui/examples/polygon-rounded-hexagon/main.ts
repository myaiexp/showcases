// Polygon: a rounded hexagon
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide cornerRadius.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const polygon = new Polygon({ ...mid(stage, S), width: S, height: S, sides: 6, cornerRadius: 10, fill: '#32cd79' });
  leafer.add(polygon);
  drive(stage, 'cornerRadius', [0, 60, 1], 10, (v) => (polygon.cornerRadius = v), 4);

  return stage.dispose;
};

export default mount;
