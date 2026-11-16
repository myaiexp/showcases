// Line: a polyline from points [x, y, ...]
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider to move the vertex at index 2.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const base = [10, 90, 10, 10, 50, 70, 90, 10, 90, 90].map((v) => v * k);
  const line = new Line({ ...mid(stage, S), points: base, strokeWidth: 5, stroke: '#32cd79', draggable: true });
  leafer.add(line);
  const bend = (v: number): void => {
    const p = [...base];
    p[5] = base[5]! - v * k;
    line.points = p;
  };
  drive(stage, 'vertex y', [-30, 30, 1], 0, bend, 3);

  return stage.dispose;
};

export default mount;
