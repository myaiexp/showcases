// Line: points given as {x, y} objects
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both point formats draw the same line; here the objects form is used.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const pts = [[10, 90], [10, 10], [50, 70], [90, 10], [90, 90]];
  const line = new Line({ ...mid(stage, S), points: pts.map(([x, y]) => ({ x: x! * k, y: y! * k })), strokeWidth: 5, stroke: '#32cd79' });
  leafer.add(line);
  stage.loop((_dt, t) => {
    const lift = Math.sin(t * 2) * 12 * k;
    line.points = pts.map(([x, y], i) => ({ x: x! * k, y: y! * k + (i % 2 ? lift : -lift) }));
  });

  return stage.dispose;
};

export default mount;
