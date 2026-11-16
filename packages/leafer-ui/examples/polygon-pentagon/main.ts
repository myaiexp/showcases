// Polygon: pentagon stretched by width and height
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide width and height to stretch the pentagon.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const polygon = new Polygon({ ...mid(stage, S), width: S, height: S, sides: 5, fill: '#32cd79', draggable: true });
  leafer.add(polygon);
  drive(stage, 'width', [60, 380, 2], S, (v) => (polygon.width = v), 5);
  drive(stage, 'height', [60, 300, 2], S, (v) => (polygon.height = v), 7);

  return stage.dispose;
};

export default mount;
