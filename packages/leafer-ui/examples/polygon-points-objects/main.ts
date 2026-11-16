// Polygon: points given as {x, y} objects
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the spike length.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const make = (spike: number): { x: number; y: number }[] =>
    Array.from({ length: 10 }, (_v, i) => {
      const r = (S / 2) * (i % 2 ? spike : 1);
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      return { x: S / 2 + Math.cos(a) * r, y: S / 2 + Math.sin(a) * r };
    });
  const polygon = new Polygon({ ...mid(stage, S), points: make(0.4), fill: '#32cd79' });
  leafer.add(polygon);
  drive(stage, 'inner', [0.2, 1, 0.02], 0.4, (v) => (polygon.points = make(v)), 4);

  return stage.dispose;
};

export default mount;
