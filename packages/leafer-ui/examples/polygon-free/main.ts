// Polygon: a free polygon from points
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide to move the notch vertex.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const base = [10, 90, 10, 10, 50, 70, 90, 10, 90, 90].map((v) => v * k);
  const polygon = new Polygon({ ...mid(stage, S), points: base, fill: '#32cd79', draggable: true });
  leafer.add(polygon);
  drive(stage, 'notch', [-20, 20, 1], 0, (v) => {
    const p = [...base];
    p[5] = base[5]! + v * k;
    polygon.points = p;
  }, 3);

  return stage.dispose;
};

export default mount;
