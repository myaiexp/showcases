// Line: closed joins the ends of a polyline
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle closed.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const line = new Line({ ...mid(stage, S), points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90].map((v) => v * k), closed: true, strokeWidth: 5, stroke: '#32cd79' });
  leafer.add(line);
  toggle(stage, 'closed', true, (v) => (line.closed = v), 1400);

  return stage.dispose;
};

export default mount;
