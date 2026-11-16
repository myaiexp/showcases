// Ellipse: closed false draws an arc
import { Ellipse, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide endAngle and toggle closed to see the sector close.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const arc = new Ellipse({
    ...mid(stage, S), width: S, height: S, startAngle: -60, endAngle: 180, closed: false,
    stroke: '#32cd79', strokeWidth: 10, strokeAlign: 'center', strokeCap: 'round',
  });
  leafer.add(arc);
  drive(stage, 'endAngle', [-59, 180, 1], 180, (v) => (arc.endAngle = v), 4);
  if (stage.bar) toggle(stage, 'closed', false, (v) => (arc.closed = v));

  return stage.dispose;
};

export default mount;
