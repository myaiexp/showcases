// Polygon: startAngle offsets the first point
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide startAngle.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const polygon = new Polygon({ ...mid(stage, S), width: S, height: S, sides: 6, startAngle: 0, fill: '#32cd79' });
  leafer.add(polygon);
  drive(stage, 'startAngle', [-180, 180, 1], 0, (v) => (polygon.startAngle = v), 6);

  return stage.dispose;
};

export default mount;
